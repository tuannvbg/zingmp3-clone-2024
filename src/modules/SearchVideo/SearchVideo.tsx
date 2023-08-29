'use client'
import HomeList from '@/components/HomeList/HomeList'
import { AppContext } from '@/contexts/app.context'
import React, { useContext } from 'react'

export default function SearchVideo() {
   const { searchData } = useContext(AppContext)
   const videos = searchData.videos
   return (
      <>
         <h2 className='text-xl font-bold mb-5'>MV</h2>
         {videos && <HomeList all title list={videos} />}
      </>
   )
}
