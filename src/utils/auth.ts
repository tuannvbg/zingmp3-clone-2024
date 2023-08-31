import { User } from '@/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

//nếu có access token trong local storage thì login rồi(set isAuthenticated là true)
export const setAccessTokenFromLS = (access_token: string) => {
   localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenFromLS = (refresh_token: string) => {
   localStorage.setItem('refresh_token', refresh_token)
}

//khi log out thì bỏ đi
export const clearLS = () => {
   localStorage.removeItem('access_token')
   localStorage.removeItem('refresh_token')
   localStorage.removeItem('profile')

   //khi xoá localstorage thì sẽ tự động reload dữ liệu mà k cần f5
   const clearLSEvent = new Event('clearLS')
   LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}
// get phải return còn set,remove thì k
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

//khi lưu obj user vào thì json.stringify còn lấy ra thì json.parse
export const setProfileFromLS = (profile: User) => {
   localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
   const result = localStorage.getItem('profile')
   return result ? JSON.parse(result) : null
}
