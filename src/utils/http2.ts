import axios, { AxiosError, AxiosInstance, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import {
   clearLS,
   getAccessTokenFromLS,
   getRefreshTokenFromLS,
   setAccessTokenFromLS,
   setProfileFromLS,
   setRefreshTokenFromLS
} from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { AuthResponse, RefreshTokenResponse } from '@/types/auth.type'
import { ErrorResponse } from '@/types/utils.type'
export class Http2 {
   instance: AxiosInstance
   private accessToken: string
   private refreshToken: string
   private refreshTokenRequest: Promise<string> | null
   constructor() {
      this.accessToken = getAccessTokenFromLS() as string
      this.refreshToken = getRefreshTokenFromLS() as string
      this.refreshTokenRequest = null
      this.instance = axios.create({
         baseURL: 'https://api-ecom.duthanhduoc.com',
         timeout: 10_000,
         headers: {
            'Content-Type': 'application/json',
            'expire-access-token': 86_400, //1 ngày
            'expire-refresh-token': 13_824_000 //160 ngày
         }
      })

      //nếu có accesstoken (đã login hoặc register rồi) thì sẽ gửi request lên server để xác thực
      this.instance.interceptors.request.use(
         (config) => {
            if (this.accessToken) {
               config.headers.Authorization = this.accessToken
               return config
            }
            return config
         },
         (error) => {
            return Promise.reject(error)
         }
      )

      //interceptor giống như là trung gian, trước khi gửi request lên server sẽ đi qua nó hoặc trước khi nhận data thì cũng sẽ đi qua nó. Mục đích là để tiền xử lý các tác vụ.
      this.instance.interceptors.response.use(
         (response) => {
            //khi đăng nhập(hoặc đăng ký) thành công thì sẽ chạy qua interceptor để lấy ra response(dữ liệu trả về)
            const { url } = response.config
            if (url === '/login' || url === '/register') {
               const data = response.data as AuthResponse
               this.accessToken = data.data.access_token
               this.refreshToken = data.data.refresh_token
               setAccessTokenFromLS(this.accessToken)
               setRefreshTokenFromLS(this.refreshToken)
               setProfileFromLS(data.data.user)
            } else if (url === '/logout') {
               this.accessToken = ''
               this.refreshToken = ''
               clearLS()
            }
            return response
         },
         // (xử lý những lỗi khác của axios ngoài lỗi 422(đăng ký thất bại))
         (error: AxiosError) => {
            //chỉ toast lỗi k phải 422 và 401
            if (
               ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
                  error.response?.status as number
               )
            ) {
               const data: any | undefined = error.response?.data
               const message = data?.message || error.message
               toast.error(message)
            }
            //lỗi Unauthorized 401(xảy ra khi token hết hạn) thì sẽ tự động đăng xuất,nó có rất nhiều trường hợp:
            //token k đúng
            //k truyền token
            //token hết hạn
            if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
               const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
               const { url } = config //request

               //trường hợp token hết hạn và request đó k phải là request của refresh token thì chúng ta mới tiến hành gọi refresh token
               if (isAxiosExpiredTokenError(error) && url !== '/refresh-access-token') {
                  //hạn chế gọi refresh token 2 lần liên tục
                  this.refreshTokenRequest = this.refreshTokenRequest
                     ? this.refreshTokenRequest
                     : this.handleRefreshToken().finally(() => {
                          //giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                          setTimeout(() => {
                             this.refreshTokenRequest = null
                          }, 10_000)
                       })
                  return this.refreshTokenRequest.then((access_token) => {
                     //access_token là accessToken trả về của handleRefreshToken
                     //gửi access_token mới được refresh lên server để xác thực lại
                     return this.instance({ ...config, headers: { ...config.headers, Authorization: access_token } }) //tiếp tục gọi lại request cũ vừa bị lỗi
                  })
               }

               //những trường hợp token l đúng, k truyền token, token hết hạn nhưng gọi refresh token bị fail thì tiến hành xoá local storage và toast message
               clearLS()
               this.accessToken = ''
               this.refreshToken = ''
               toast.error(error.response?.data.data?.message || error.response?.data.message)
            }
            return Promise.reject(error)
         }
      )
   }
   //khi access token hết hạn thì gọi phương thức này để set lại cái mới
   private async handleRefreshToken() {
      try {
         const res = await this.instance.post<RefreshTokenResponse>('/refresh-access-token', {
            refresh_token: this.refreshToken
         })
         const { access_token } = res.data.data
         setAccessTokenFromLS(access_token)
         this.accessToken = access_token
         return access_token
      } catch (err) {
         //khi refresh token hết hạn
         clearLS()
         this.accessToken = ''
         this.refreshToken = ''
         throw err
      }
   }
}
const http2 = new Http2().instance
export default http2
