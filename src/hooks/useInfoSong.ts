'use client'
import { getInfoSong } from '@/apis/home.api'
import { AppContext } from '@/contexts/app.context'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

export default function useInfoSong() {
   const { currentSongId } = useContext(AppContext)
   //lấy info song
   const infoSongData = useQuery({
      queryKey: ['infoSong', currentSongId],
      queryFn: () => getInfoSong({ id: currentSongId }),
      enabled: Boolean(currentSongId)
   })

   const infoSong = infoSongData.data?.data.data
   return { infoSong, infoSongData }
}
