import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'

class Http {
   instance: AxiosInstance
   constructor() {
      this.instance = axios.create({
         baseURL: 'https://api-zingmp3-public.vercel.app/api',
         timeout: 10_000,
         headers: {
            'Content-Type': 'application/json'
         }
      })

      //trước khi server nhận được request từ client gửi lên
      this.instance.interceptors.request.use(
         (config) => config,
         (error) => Promise.reject(error)
      )

      //trước khi nhận response từ server trả về client
      this.instance.interceptors.response.use(
         (response) => {
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
            return Promise.reject(error)
         }
      )
   }
}
const http = new Http().instance
export default http
