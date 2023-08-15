import { HomeType } from '@/types/home.type'
import http from '@/utils/http'

export const getHome = () => http.get<HomeType>('/home')
