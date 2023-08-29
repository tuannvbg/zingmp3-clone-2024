'use client'
import { getNewReleaseChart } from '@/apis/home.api'
import Charts from '@/components/Charts/Charts'
import Loading from '@/components/Loading/Loading'
import { AppContext } from '@/contexts/app.context'
import { Item } from '@/types/newReleaseChart.type'
import { SongItem } from '@/types/playlist.type'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'

export default function Ranking() {
   const { currentSongId, playList, setPlayList } = useContext(AppContext)

   const { data } = useQuery({
      queryKey: ['rankings'],
      queryFn: getNewReleaseChart,
      staleTime: 1000 * 60 * 4
   })

   const rankingList = data?.data.data.items //BXH Nhạc Mới
   useEffect(() => {
      if (rankingList) {
         setPlayList(rankingList as unknown as SongItem[])
      }
   }, [rankingList, setPlayList])
   if (!playList) return <Loading />
   return (
      <div className={`mt-[70px] ${currentSongId ? 'pb-28' : 'pb-10'}`}>
         <div className='relative w-full pt-[20%]'>
            <Image
               fill
               priority
               alt='banner'
               className='w-full h-full top-0 left-0 right-0 object-cover'
               src={data?.data.data.banner as string}
            />
         </div>
         <div className='px-14'>
            <div className='pt-[30px] flex items-center gap-x-3 pb-5'>
               <h1 className='text-[40px] font-bold'>BXH Nhạc Mới</h1>
               <div className='w-9 h-9 rounded-full bg-white flex items-center justify-center'>
                  <div
                     style={{
                        clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                     }}
                     className='bg-primary w-3.5 translate-x-[1px] h-4'
                  />
               </div>
            </div>
            <Charts list={playList as unknown as Item[]} />
         </div>
      </div>
   )
}
