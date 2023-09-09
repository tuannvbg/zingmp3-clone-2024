'use client'
import MvArtistItem from '@/components/MvArtistItem/MvArtistItem'
import { AppContext } from '@/contexts/app.context'
import { Item } from '@/types/artist.type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function MyMusicVideo() {
   const { videoLibrary } = useContext(AppContext)

   return (
      <div className='mt-12'>
         {videoLibrary.length > 0 ? (
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7'>
               {videoLibrary.map((item) => (
                  <MvArtistItem key={item.encodeId} item={item as unknown as Item} />
               ))}
            </div>
         ) : (
            <div className='text-center mt-10'>
               <Image
                  src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-mv-dark.png'}
                  alt=''
                  width={120}
                  height={120}
                  className='w-[120px] h-[120px] object-cover mx-auto'
               />
               <p className='text-secondary mt-3 mb-5 font-semibold text-base'>Chưa có MV nào trong thư viện cá nhân</p>
               <Link
                  href={'/the-loai-video/Viet-Nam/IWZ9Z08I.html'}
                  className='uppercase px-5 py-2 rounded-full bg-tprimary hover:bg-opacity-90'
               >
                  Khám phá ngay
               </Link>
            </div>
         )}
      </div>
   )
}
