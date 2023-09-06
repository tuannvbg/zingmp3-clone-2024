'use client'
import SearchSongItem from '@/components/SearchSongItem/SearchSongItem'
import { AppContext } from '@/contexts/app.context'

import React, { useContext } from 'react'

export default function SearchSong() {
   const { searchData } = useContext(AppContext)
   const songs = searchData.songs
   return (
      <>
         <h2 className='text-xl font-bold mb-5'>Bài Hát</h2>
         <SearchSongItem songs={songs} />
      </>
   )
}
