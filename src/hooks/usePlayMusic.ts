'use client'
import { AppContext } from '@/contexts/app.context'
import { useContext } from 'react'

export default function usePlayMusic() {
   const { setCurrentSongId, setIsPlaying, audio, setAudio, currentSongId, setIsLoadingSong } = useContext(AppContext)
   // Dừng bài hát hiện tại
   const stopCurrentSong = () => {
      if (audio) {
         audio.pause() // Dừng bài hát cũ
         audio.currentTime = 0 // Đặt thời gian về đầu bài hát
      }
   }

   //click vào 1 bài hát
   const handleClickSong = (id: string) => {
      //id bài hát
      if (currentSongId !== id) {
         stopCurrentSong()
         setAudio(null)
         setIsPlaying(true)
         setCurrentSongId(id)
         setIsLoadingSong(true)
      } else {
         setIsPlaying((prev) => !prev)
      }
   }

   return { handleClickSong, stopCurrentSong }
}
