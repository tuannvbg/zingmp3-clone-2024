import { getHome } from '@/apis/home.api'
import { useQuery } from '@tanstack/react-query'

export default function useGetHome() {
   const { data } = useQuery({
      queryKey: ['home'],
      queryFn: getHome,
      staleTime: 1000 * 60 * 4
   })
   return { data }
}
