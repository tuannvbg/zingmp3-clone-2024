'use client'
import HomeList from '@/components/HomeList/HomeList'
import Loading from '@/components/Loading/Loading'
import { AppContext } from '@/contexts/app.context'
import useGetHome from '@/hooks/useGetHome'
import { HomeListType } from '@/types/homelist.type'
import Image from 'next/image'
import React, { useContext } from 'react'

export default function Chill() {
   const { currentSongId } = useContext(AppContext)
   const { data } = useGetHome()
   const chillList: HomeListType[] = data?.data.data.items[3].items //chill
   if (!chillList) return <Loading />
   return (
      <div className={`mt-[70px] ${currentSongId ? 'pb-36 md:pb-28' : 'pb-14 md:pb-10'}`}>
         <div className='relative w-full pt-[27%]'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
               alt='banner'
               className='w-full h-full top-0 left-0 right-0 object-cover'
               src={'https://photo-zmp3.zmdcdn.me/cover/c/9/b/3/c9b3c456eeabd9d4e3241666397d71aa.jpg'}
            />
         </div>
         <div className='px-3 sm:px-8 lg:px-14 mt-10'>
            <HomeList all title list={chillList} />
         </div>
      </div>
   )
}
