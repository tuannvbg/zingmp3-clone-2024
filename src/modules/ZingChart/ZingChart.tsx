'use client'
import { getCharthome } from '@/apis/home.api'
import ChartSection from '@/components/ChartSection/ChartSection'
import Charts from '@/components/Charts/Charts'
import Loading from '@/components/Loading/Loading'
import ZingChartRanking from '@/components/ZingChartRanking/ZingChartRanking'
import { AppContext } from '@/contexts/app.context'
import { Korea, Us, Vn } from '@/types/charthome.type'
import { Item } from '@/types/newReleaseChart.type'
import { SongItem } from '@/types/playlist.type'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'

export default function ZingChart() {
   const { currentSongId, playList, setPlayList } = useContext(AppContext)
   const [watchTop100, setWatchTop100] = useState<boolean>(false)
   const { data } = useQuery({
      queryKey: ['charthome'],
      queryFn: getCharthome,
      staleTime: 1000 * 60 * 4
   })
   const zingchartData = data?.data.data.RTChart.items
   const weekChart = data?.data.data.weekChart
   useEffect(() => {
      if (zingchartData) {
         setPlayList(zingchartData as SongItem[])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [zingchartData])
   if (!zingchartData) return <Loading />
   return (
      <div className={`mt-[70px]`}>
         <div className='px-3 sm:px-8 lg:px-14'>
            <div className='flex items-center gap-x-3 mb-3 pt-[30px]'>
               <h1 className='text-[40px] font-bold text-gradient'>#zingchart</h1>
               <div className='w-9 h-9 rounded-full bg-white flex items-center justify-center'>
                  <div
                     style={{
                        clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                     }}
                     className='bg-primary w-3.5 translate-x-[1px] h-4'
                  />
               </div>
            </div>
            <ChartSection zingchartPage />
            {watchTop100 ? (
               <Charts list={playList as unknown as Item[]} />
            ) : (
               <Charts list={playList?.slice(0, 10) as unknown as Item[]} />
            )}

            <div className='text-center'>
               <button
                  onClick={() => setWatchTop100((prev) => !prev)}
                  className='border border-white rounded-full px-5 py-2 mt-5 hover:bg-white hover:bg-opacity-10 font-medium'
               >
                  {watchTop100 ? 'Ẩn bớt' : 'Xem top 100'}
               </button>
            </div>
         </div>
         <div
            className={`bg-tertiary mt-10 px-3 sm:px-8 min-[900px]:px-14 py-5 ${
               currentSongId ? 'pb-32 min-w-[900px]:pb-28' : 'pb-14 min-w-[900px]:pb-10'
            }`}
         >
            <h2 className='text-[40px] font-bold mb-5'>Bảng Xếp Hạng Tuần</h2>
            <div className='flex flex-col gap-y-7'>
               <ZingChartRanking title='Việt Nam' weekChartCountry={weekChart?.vn as Vn} />
               <ZingChartRanking title='US-UK' weekChartCountry={weekChart?.us as Us} />
               <ZingChartRanking title='K-Pop' weekChartCountry={weekChart?.korea as Korea} />
            </div>
         </div>
      </div>
   )
}
