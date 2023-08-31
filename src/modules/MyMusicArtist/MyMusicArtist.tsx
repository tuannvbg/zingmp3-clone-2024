'use client'
import ArtistList from '@/components/ArtistList/ArtistList'
import Loading from '@/components/Loading/Loading'
import { AppContext } from '@/contexts/app.context'
import React, { useContext } from 'react'

export default function MyMusicArtist() {
   const { artistLibrary } = useContext(AppContext)
   if (!artistLibrary) return <Loading />
   return (
      <div className='mt-10'>
         <ArtistList artistList={artistLibrary} />
      </div>
   )
}
