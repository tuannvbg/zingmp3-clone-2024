import { getPlayList } from '@/apis/home.api'
import { useQuery } from '@tanstack/react-query'

export default function useGetPlaylist(params: { id: string }) {
   //gọi api playlist
   const { data } = useQuery({
      queryKey: ['playlist', params.id],
      queryFn: () => getPlayList({ id: params.id.split('.')[0] }) //vì id có dạng id.html(60B8U0OB.html)
   })
   return { data }
}
