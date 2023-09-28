'use client'
import ArtistList from '@/components/ArtistList/ArtistList'
import Loading from '@/components/Loading/Loading'
import { AppContext } from '@/contexts/app.context'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function MyMusicArtist() {
   const { artistLibrary } = useContext(AppContext)
   useProtectedRoute()
   if (!artistLibrary) return <Loading />
   return (
      <div className='mt-12'>
         {artistLibrary.length > 0 ? (
            <ArtistList artistList={artistLibrary} />
         ) : (
            <div className='text-center'>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                  src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-mv-dark.png'}
                  alt=''
                  width={120}
                  height={120}
                  className='w-[120px] h-[120px] object-cover mx-auto'
               />
               <p className='text-secondary mt-3 mb-5 font-semibold text-base'>
                  Chưa có nghệ sĩ nào trong thư viện cá nhân
               </p>
               <Link href={'/top100'} className='uppercase px-5 py-2 rounded-full bg-tprimary hover:bg-opacity-90'>
                  Khám phá ngay
               </Link>
            </div>
         )}
      </div>
   )
}
