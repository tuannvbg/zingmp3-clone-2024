import useLocalStorage from './useLocalStorage'

export default function useFollow() {
   const [follows, setFollows] = useLocalStorage<string[]>('follow', [])
   //follow ca sĩ
   const handleClickFollow = (id: string) => {
      if (follows.includes(id)) {
         setFollows((prev) => prev.filter((followId) => followId !== id))
      } else {
         setFollows((prev) => [...prev, id])
      }
   }
   return { handleClickFollow, follows }
}
