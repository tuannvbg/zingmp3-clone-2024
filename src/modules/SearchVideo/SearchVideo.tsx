'use client'
import MvArtistItem from '@/components/MvArtistItem/MvArtistItem'
import { AppContext } from '@/contexts/app.context'
import { Item } from '@/types/artist.type'
import React, { useContext } from 'react'

export default function SearchVideo() {
   const { searchData } = useContext(AppContext)
   const videos = searchData.videos
   return (
      <>
         <h2 className='text-xl font-bold mb-5'>MV</h2>
         {videos && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
               {videos.map((item: Item) => (
                  <MvArtistItem item={item} key={item.encodeId} />
               ))}
            </div>
         )}
      </>
   )
}
