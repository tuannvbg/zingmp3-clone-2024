import Link from 'next/link'
import React from 'react'
import Charts from '../Charts/Charts'
import { Item } from '@/types/newReleaseChart.type'
import { Korea, Us, Vn } from '@/types/charthome.type'

interface Props {
   weekChartCountry: Vn | Korea | Us
   title: string
}
export default function ZingChartRanking({ weekChartCountry, title }: Props) {
   return (
      <div className='bg-white bg-opacity-5 rounded-xl py-5 px-2.5'>
         <div className='flex items-center gap-x-1 mb-2.5 pl-10'>
            <Link href={weekChartCountry.link as string} className='text-2xl font-bold hover:text-tprimary'>
               {title}
            </Link>
            <div className='w-7 h-7 rounded-full bg-tprimary flex items-center justify-center'>
               <div
                  style={{
                     clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                  }}
                  className='bg-white w-3 translate-x-[1px] h-3.5'
               />
            </div>
         </div>
         <Charts isRanking list={weekChartCountry?.items.slice(0, 5) as unknown as Item[]} />
         <div className='text-center mt-5'>
            <Link
               href={weekChartCountry.link as string}
               className='border border-white rounded-full px-5 py-2 hover:bg-white hover:bg-opacity-10 font-medium'
            >
               Xem tất cả
            </Link>
         </div>
      </div>
   )
}
