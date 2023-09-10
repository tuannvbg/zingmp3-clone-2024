import React, { useContext } from 'react'
import useLocalStorage from './useLocalStorage'
import { HomeListType } from '@/types/homelist.type'
import { AppContext } from '@/contexts/app.context'
import { SongItem } from '@/types/playlist.type'
import { Data } from '@/types/video.type'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function useAddLibrary() {
   const [library, setLibrary] = useLocalStorage<string[]>('library', []) //thêm vào thư viện
   const { setPlaylistLibrary, setSongsLibrary, setVideoLibrary, isAuthenticated } = useContext(AppContext)
   const router = useRouter()
   //thêm vào thư viện
   const handleAddLibrary = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      id: string,
      playlist?: HomeListType | null,
      song?: SongItem | null,
      video?: Data
   ) => {
      e.stopPropagation()
      if (isAuthenticated) {
         if (library.includes(id)) {
            setLibrary((prev) => prev.filter((item) => item !== id))
            if (playlist) {
               setPlaylistLibrary((prev) => (prev as HomeListType[]).filter((item) => item.encodeId !== id))
            }
            if (song) {
               setSongsLibrary((prev) => prev.filter((item) => item.encodeId !== id))
            }
            if (video) {
               setVideoLibrary((prev) => prev.filter((item) => item.encodeId !== id))
            }
         } else {
            setLibrary((prev) => [...prev, id])
            if (playlist) {
               setPlaylistLibrary((prev) => [...prev, playlist])
            }
            if (song) {
               setSongsLibrary((prev) => [...prev, song])
            }
            if (video) {
               setVideoLibrary((prev) => [...prev, video])
            }
         }
      } else {
         toast.warning('Vui lòng đăng nhập')
         router.push('/login')
      }
   }
   return { library, handleAddLibrary }
}
