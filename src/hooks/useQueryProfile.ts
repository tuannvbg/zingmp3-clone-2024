import { getProfile } from '@/apis/user.api'
import { useQuery } from '@tanstack/react-query'

export default function useQueryProfile() {
   const { data, refetch } = useQuery({
      queryKey: ['profile'],
      queryFn: getProfile
   })
   const profileData = data?.data.data
   return { profileData, refetch }
}
