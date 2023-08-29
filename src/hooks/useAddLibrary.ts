import React, { useState } from 'react'
import useLocalStorage from './useLocalStorage'

export default function useAddLibrary() {
   const [library, setLibrary] = useLocalStorage<string[]>('library', []) //thêm vào thư viện

   //thêm vào thư viện
   const handleAddLibrary = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
      e.stopPropagation()
      if (library.includes(id)) {
         setLibrary((prev) => prev.filter((item) => item !== id))
      } else {
         setLibrary((prev) => [...prev, id])
      }
   }
   return { library, handleAddLibrary }
}
