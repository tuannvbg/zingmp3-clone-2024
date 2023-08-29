'use client'
import HomeList from '@/components/HomeList/HomeList'
import { AppContext } from '@/contexts/app.context'
import React, { useContext } from 'react'

export default function SearchPlaylist() {
   const { searchData } = useContext(AppContext)
   const playlists = searchData.playlists
   return (
      <>
         <h2 className='text-xl font-bold mb-5'>Playlist/Album</h2>
         {playlists && <HomeList all title list={playlists} />}
      </>
   )
}
