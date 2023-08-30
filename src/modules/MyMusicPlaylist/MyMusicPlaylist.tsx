'use client'
import HomeList from '@/components/HomeList/HomeList'
import { AppContext } from '@/contexts/app.context'
import { HomeListType } from '@/types/homelist.type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function MyMusicPlaylist() {
   const { currentSongId, playlistLibrary } = useContext(AppContext)
   return (
      <div className={`mt-[70px] px-14 ${currentSongId ? 'pb-28' : 'pb-10'}`}>
         <h1 className='font-bold py-5 text-2xl'>Playlist yêu thích</h1>
         {playlistLibrary.length > 0 ? (
            <HomeList all title list={playlistLibrary as HomeListType[]} />
         ) : (
            <div className='text-center'>
               <Image
                  src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-mv-dark.png'}
                  alt=''
                  width={120}
                  height={120}
                  className='w-[120px] h-[120px] object-cover mx-auto'
               />
               <p className='text-secondary mt-3 mb-5 font-semibold text-base'>
                  Chưa có playlist nào trong thư viện cá nhân
               </p>
               <Link href={'/top100'} className='uppercase px-5 py-2 rounded-full bg-tprimary hover:bg-opacity-90'>
                  Khám phá ngay
               </Link>
            </div>
         )}
      </div>
   )
}
