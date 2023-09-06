'use client'
import { getCharthome } from '@/apis/home.api'
import Charts from '@/components/Charts/Charts'
import Loading from '@/components/Loading/Loading'
import { AppContext } from '@/contexts/app.context'
import { Korea, Us, Vn } from '@/types/charthome.type'
import { Item } from '@/types/newReleaseChart.type'
import { SongItem } from '@/types/playlist.type'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

export default function ZingChartWeek({ params }: { params: { id: string } }) {
   const { currentSongId, playList, setPlayList } = useContext(AppContext)
   const [week, setWeek] = useState<Vn | Us | Korea>()

   const { data } = useQuery({
      queryKey: ['charthome'],
      queryFn: getCharthome,
      staleTime: 1000 * 60 * 4
   })

   const zingChartWeeks = data?.data.data.weekChart

   useEffect(() => {
      if (
         zingChartWeeks &&
         params.id === zingChartWeeks.vn.link.split('/')[zingChartWeeks.vn.link.split('/').length - 1]
      ) {
         setPlayList(zingChartWeeks?.vn.items as SongItem[])
         setWeek(zingChartWeeks?.vn)
      } else if (
         zingChartWeeks &&
         params.id === zingChartWeeks.us.link.split('/')[zingChartWeeks.us.link.split('/').length - 1]
      ) {
         setPlayList(zingChartWeeks?.us.items as SongItem[])
         setWeek(zingChartWeeks?.us)
      } else {
         setPlayList(zingChartWeeks?.korea.items as SongItem[])
         setWeek(zingChartWeeks?.korea)
      }
   }, [params.id, setPlayList, zingChartWeeks, playList])
   if (!playList || !zingChartWeeks) return <Loading />
   return (
      <div className={`mt-[70px] px-3 sm:px-8 lg:px-14 ${currentSongId ? 'pb-36 md:pb-28' : 'pb-14 md:pb-10'}`}>
         <div className='pt-[30px] flex items-center gap-x-3 pb-5'>
            <h1 className='text-3xl sm:text-[40px] font-bold'>Bảng Xếp Hạng Tuần</h1>
            <div className='w-9 h-9 flex-shrink-0 rounded-full bg-white flex items-center justify-center'>
               <div
                  style={{
                     clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                  }}
                  className='bg-primary w-3.5 translate-x-[1px] h-4'
               />
            </div>
         </div>
         <div className='flex text-xl font-bold sm:text-2xl sm:font-extrabold items-center flex-wrap gap-x-10'>
            <Link
               href={zingChartWeeks.vn.link}
               className={`py-3.5 ${
                  playList === (zingChartWeeks.vn.items as SongItem[]) && 'border-b-[3px] border-b-tprimary'
               }`}
            >
               VIỆT NAM
            </Link>
            <Link
               href={zingChartWeeks.us.link}
               className={`py-3.5 ${
                  playList === (zingChartWeeks.us.items as SongItem[]) && 'border-b-[3px] border-b-tprimary'
               }`}
            >
               US-UK
            </Link>
            <Link
               href={zingChartWeeks.korea.link}
               className={`py-3.5 ${
                  playList === (zingChartWeeks.korea.items as SongItem[]) && 'border-b-[3px] border-b-tprimary'
               }`}
            >
               K-POP
            </Link>
         </div>
         <div className='my-5 py-2 px-4 rounded-full bg-white bg-opacity-10 inline-block'>
            Tuần {week?.week} ( {week?.startDate} - {week?.endDate} )
         </div>
         <Charts list={playList as unknown as Item[]} />
      </div>
   )
}
