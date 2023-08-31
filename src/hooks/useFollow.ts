import { useContext } from 'react'
import useLocalStorage from './useLocalStorage'
import { AppContext } from '@/contexts/app.context'
import { Artist } from '@/types/artist.type'

export default function useFollow() {
   const [follows, setFollows] = useLocalStorage<string[]>('follow', [])
   const { setArtistLibrary } = useContext(AppContext)
   //follow ca sĩ
   const handleClickFollow = (id: string, artist: Artist) => {
      if (follows.includes(id)) {
         setFollows((prev) => prev.filter((followId) => followId !== id))
         setArtistLibrary((prev) => prev.filter((item) => item !== artist))
      } else {
         setFollows((prev) => [...prev, id])
         setArtistLibrary((prev) => [...prev, artist])
      }
   }
   return { handleClickFollow, follows }
}
