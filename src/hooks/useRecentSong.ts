'use client'
import { AppContext } from '@/contexts/app.context'
import { SongItem } from '@/types/playlist.type'
import { useContext } from 'react'

export default function useRecentSong() {
   const { recentSong, setRecentSong } = useContext(AppContext)
   //history
   const handleHistory = (data: SongItem) => {
      // Nếu button đã tồn tại trong history thì xóa đi
      const newHistory = recentSong.filter((item) => item.encodeId !== data.encodeId)

      // Thêm button vừa click vào đầu mảng history
      newHistory.unshift(data)

      // Giới hạn history tối đa 10 phần tử
      if (newHistory.length > 10) {
         newHistory.pop()
      }

      // Cập nhật lại history
      setRecentSong(newHistory)
   }
   return { handleHistory }
}
