'use client'
import { getArtist } from '@/apis/home.api'
import Loading from '@/components/Loading/Loading'
import Modal from '@/components/Modal/Modal'
import SearchSongItem from '@/components/SearchSongItem/SearchSongItem'
import { AppContext } from '@/contexts/app.context'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'

export default function ArtistSong() {
   const { currentSongId } = useContext(AppContext)

   const pathname = usePathname()
   const { data } = useQuery({
      queryKey: ['artist', pathname],
      queryFn: () => getArtist({ name: pathname.split('/')[pathname.split('/').length - 2] })
   })
   const artistData = data?.data.data
   const songs = artistData?.sections[0].items
   if (!artistData || !songs) return <Loading />
   return (
      <div className={`mt-[70px] px-3 sm:px-8 lg:px-14 ${currentSongId ? 'pb-36 md:pb-28' : 'pb-14 md:pb-10'}`}>
         <div className='flex items-center gap-x-3 py-5'>
            <h1
               style={{
                  textShadow: '0 1px 4px rgba(0,0,0,.16)'
               }}
               className='font-bold text-xl'
            >
               {artistData.name} - Tất Cả Bài Hát
            </h1>
            <div className='w-8 h-8 rounded-full bg-white flex items-center justify-center'>
               <div
                  style={{
                     clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                  }}
                  className='bg-tprimary w-2.5 translate-x-[1px] h-3'
               />
            </div>
         </div>
         <SearchSongItem songs={songs} />
      </div>
   )
}
