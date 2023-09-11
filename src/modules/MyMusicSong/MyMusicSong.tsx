'use client'
import Modal from '@/components/Modal/Modal'
import SongMusicItem from '@/components/SongMusicItem/SongMusicItem'
import { AppContext } from '@/contexts/app.context'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

export default function MyMusicSong({ profile = false }: { profile?: boolean }) {
   const { currentSongId, songsLibrary } = useContext(AppContext)

   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal

   useProtectedRoute()
   return (
      <div className={profile ? 'mt-12' : `mt-[70px] px-14 ${currentSongId ? 'pb-28' : 'pb-10'}`}>
         {!profile && <h1 className='font-bold py-5 text-2xl'>Bài hát yêu thích</h1>}
         {songsLibrary.length > 0 ? (
            <SongMusicItem playlist={songsLibrary} mymusic />
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
                  Chưa có bài hát nào trong thư viện cá nhân
               </p>
               <Link
                  href={'/moi-phat-hanh'}
                  className='uppercase px-5 py-2 rounded-full bg-tprimary hover:bg-opacity-90'
               >
                  Khám phá ngay
               </Link>
            </div>
         )}
         <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </div>
   )
}
