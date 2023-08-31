import { User } from '@/types/user.type'
import { SuccessResponse } from '@/types/utils.type'
import http2 from '@/utils/http2'

export interface BodyUpdateProfile {
   address?: string
   date_of_birth?: string
   name?: string
   phone?: string
   avatar?: string
   password?: string
   new_password?: string
}

export const getProfile = () => http2.get<SuccessResponse<User>>('/me')

export const updateProfile = (body: BodyUpdateProfile) => http2.put<SuccessResponse<User>>('/user', body)

//response trả về là url hình ảnh(SuccessResponse<string>)
// FormData là kiểu dữ liệu có sẵn
export const uploadAvatar = (body: FormData) =>
   http2.post<SuccessResponse<string>>('/user/upload-avatar', body, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   })
