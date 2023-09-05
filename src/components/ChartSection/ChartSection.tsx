import React, { useContext, useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import useGetHome from '@/hooks/useGetHome'
import Link from 'next/link'
import Image from 'next/image'
import { AppContext } from '@/contexts/app.context'
import usePlayMusic from '@/hooks/usePlayMusic'
import { SongItem } from '@/types/playlist.type'
import Modal from '../Modal/Modal'
import _ from 'lodash'
export default function ChartSection({ zingchartPage }: { zingchartPage?: boolean }) {
   const [data, setData] = useState<any>()
   const { data: dataChart } = useGetHome()
   const chart = dataChart?.data.data.items[9].chart
   const rank: SongItem[] = dataChart?.data.data.items[9].items
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal
   const chartRef = useRef()
   const [tooltipState, setTooltipState] = useState({
      opacity: 0,
      top: 0,
      left: 0
   })
   const [selected, setSelected] = useState<string>()

   const { currentSongId, isLoadingSong, isPlaying } = useContext(AppContext)

   const { handleClickSong } = usePlayMusic()
   const options = {
      responsive: true,
      pointRadius: 0,
      maintainAspectRatio: false,
      scales: {
         y: {
            ticks: { display: false },
            grid: { color: '#aaa', drawTicks: false },
            min: chart?.minScore,
            max: chart?.maxScore,
            border: { dash: [3, 4] }
         },
         x: {
            ticks: { color: '#aaa' },
            grid: { color: 'transparent' }
         }
      },
      plugins: {
         legend: false,
         tooltip: {
            enabled: false,
            external: ({ tooltip }: { tooltip: any }) => {
               if (!chartRef || !chartRef.current) return
               if (tooltip.opacity === 0) {
                  if (tooltipState.opacity !== 0) setTooltipState((prev) => ({ ...prev, opacity: 0 }))
                  return
               }
               const counters = []
               if (chart) {
                  for (let i = 0; i < 3; i++) {
                     counters.push({
                        data: chart.items[Object.keys(chart.items)[i]]
                           .filter((item) => Number(item.hour) % 2 === 0)
                           .map((item) => item.counter),
                        encodeId: Object.keys(chart.items)[i]
                     })
                  }
               }
               const result = counters.find((item) =>
                  item.data.some((number) => number === Number(tooltip.body[0]?.lines[0]?.replace('.', '')))
               )

               if (result) {
                  setSelected(result.encodeId)
               }
               const newTooltipData = {
                  opacity: 1,
                  left: tooltip.caretX,
                  top: tooltip.caretY
               }
               if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
            }
         }
      },
      hover: {
         mode: 'dataset',
         intersect: false
      }
   }

   useEffect(() => {
      const labels = chart?.times.filter((item) => Number(item.hour) % 2 === 0).map((item) => `${item.hour}:00`) //lấy ra số giờ chẵn
      const datasets = []
      if (chart?.items) {
         for (let i = 0; i < 3; i++) {
            datasets.push({
               data: chart.items[Object.keys(chart.items)[i]]
                  .filter((item) => Number(item.hour) % 2 === 0)
                  .map((item) => item.counter),
               borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
               tension: 0.3,
               borderWidth: 2,
               pointHoverRadius: 5,
               pointBackgroundColor: 'white',
               pointHitRadius: 5,
               pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
               animation: false,
               pointHoverBorderWidth: 5
            })
         }
         setData({ labels, datasets })
      }
   }, [chart])

   if (!data) return null
   return (
      <div className={`${zingchartPage ? 'bg-transparent my-10' : 'bg-[#431B62] mt-12 p-5 min-h-[414px]'} rounded-lg`}>
         {!zingchartPage && (
            <div className='flex items-center gap-x-3 mb-3'>
               <Link href={'/zing-chart'} className='text-[28px] font-bold text-gradient'>
                  #zingchart
               </Link>
               <div className='w-6 h-6 rounded-full bg-white flex items-center justify-center'>
                  <div
                     style={{
                        clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                     }}
                     className='bg-black w-2 translate-x-[1px] h-3'
                  />
               </div>
            </div>
         )}
         <div className='flex items-center flex-wrap-reverse xl:flex-nowrap gap-4 h-full'>
            {!zingchartPage && (
               <div className='w-full xl:w-[40%] '>
                  <ul className='flex flex-col gap-y-2.5'>
                     {rank.slice(0, 3).map((item, index) => (
                        <li
                           key={item.encodeId}
                           className={`flex group bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20 select-none ${
                              currentSongId === item.encodeId && 'bg-white bg-opacity-20'
                           } rounded-md items-center text-secondary text-xs p-2.5 border-b border-b-gray-800`}
                        >
                           <div className='flex items-center gap-x-2 w-full'>
                              <span
                                 className={`text-[32px] text-center text-transparent font-black mr-0.5 ${
                                    index === 0
                                       ? 'text-stroke1'
                                       : index === 1
                                       ? 'text-stroke2'
                                       : index === 2
                                       ? 'text-stroke3'
                                       : 'text-stroke'
                                 }`}
                              >
                                 {index + 1}
                              </span>
                              <div
                                 onClick={() => {
                                    if (item.isWorldWide) {
                                       handleClickSong(item.encodeId)
                                    } else {
                                       setIsOpenModal(true)
                                    }
                                 }}
                                 className='relative cursor-pointer overflow-hidden w-[60px] flex-shrink-0 h-[60px] rounded'
                              >
                                 <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    width={60}
                                    height={60}
                                    className='object-cover w-full h-full'
                                 />
                                 {!isLoadingSong && isPlaying && currentSongId === item.encodeId ? (
                                    <div className='absolute inset-0 flex items-center justify-center z-20'>
                                       <Image
                                          src={
                                             'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                                          }
                                          width={20}
                                          height={20}
                                          className='w-5 h-5 object-cover'
                                          alt=''
                                       />
                                    </div>
                                 ) : (
                                    <div
                                       className={`absolute ${
                                          !isPlaying && currentSongId === item.encodeId
                                             ? 'flex'
                                             : isLoadingSong
                                             ? 'hidden'
                                             : 'hidden group-hover:flex'
                                       } inset-0 items-center justify-center z-20`}
                                    >
                                       <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          viewBox='0 0 24 24'
                                          fill='currentColor'
                                          className='w-6 h-6 text-white'
                                       >
                                          <path
                                             fillRule='evenodd'
                                             d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                                             clipRule='evenodd'
                                          />
                                       </svg>
                                    </div>
                                 )}
                                 {isLoadingSong && currentSongId === item.encodeId && (
                                    <div className='absolute inset-0 flex items-center justify-center z-20'>
                                       <Image
                                          src={'https://i.gifer.com/ZKZg.gif'}
                                          width={20}
                                          height={20}
                                          className='w-5 h-5 object-cover'
                                          alt=''
                                       />
                                    </div>
                                 )}
                                 {
                                    <div
                                       className={`absolute inset-0 ${
                                          currentSongId === item.encodeId ? '' : 'hidden group-hover:block'
                                       } bg-black bg-opacity-40 z-10`}
                                    />
                                 }
                              </div>
                              <div className='flex flex-col gap-y-1'>
                                 <div className='flex items-center gap-x-2'>
                                    <h3 title={item.title} className='text-white capitalize text-sm font-medium'>
                                       {item.title}
                                    </h3>
                                    {!item.isWorldWide && (
                                       <div className='bg-yellow-500 font-medium text-[9px] rounded-sm px-1 h-3.5 flex items-center justify-center text-white tracking-widest'>
                                          VIP
                                       </div>
                                    )}
                                 </div>
                                 <div className='text-xs text-[#ffffff80]'>
                                    {item.artists?.map((artist, index) => {
                                       return index === item.artists.length - 1 ? (
                                          <Link
                                             href={artist.link}
                                             key={artist.id}
                                             className='isHover cursor-pointer hover:underline'
                                          >
                                             {artist.name}
                                          </Link>
                                       ) : (
                                          <>
                                             <Link
                                                href={artist.link}
                                                key={artist.id}
                                                className='isHover cursor-pointer hover:underline'
                                             >
                                                {artist.name}
                                             </Link>
                                             ,{' '}
                                          </>
                                       )
                                    })}
                                 </div>
                              </div>
                              {chart && (
                                 <div className='ml-auto text-base font-semibold text-white'>
                                    {Math.round((item.score * 100) / chart.totalScore)}%
                                 </div>
                              )}
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className='text-center mt-4'>
                     <Link
                        href={'/zing-chart'}
                        className='border border-white text-white rounded-full px-7 py-1.5 bg-transparent hover:bg-white hover:bg-opacity-10'
                     >
                        Xem thêm
                     </Link>
                  </div>
               </div>
            )}
            <div className={`${zingchartPage ? 'w-full' : 'w-full xl:w-[60%]'} relative`}>
               <Line ref={chartRef} style={{ height: '300px' }} data={data} options={options as any} />
               <div
                  className='absolute z-50'
                  style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity }}
               >
                  {rank && selected && (
                     <li className={`flex select-none rounded-md items-center text-white p-2.5 bg-red-500`}>
                        <div className='flex items-center gap-x-2 w-full'>
                           <div className='relative cursor-pointer overflow-hidden w-[40px] flex-shrink-0 h-[40px] rounded'>
                              <Image
                                 src={rank.find((item) => item.encodeId === selected)?.thumbnail as string}
                                 alt={rank.find((item) => item.encodeId === selected)?.title as string}
                                 width={40}
                                 height={40}
                                 className='object-cover w-full h-full'
                              />
                           </div>
                           <div className='flex flex-col gap-y-1'>
                              <div className='flex items-center gap-x-2'>
                                 <h3
                                    title={rank.find((item) => item.encodeId === selected)?.title}
                                    className='truncate max-w-[150px] capitalize text-sm font-medium'
                                 >
                                    {rank.find((item) => item.encodeId === selected)?.title}
                                 </h3>
                                 {!rank.find((item) => item.encodeId === selected)?.isWorldWide && (
                                    <div className='bg-yellow-500 font-medium text-[9px] rounded-sm px-1 h-3.5 flex items-center justify-center text-white tracking-widest'>
                                       VIP
                                    </div>
                                 )}
                              </div>
                              <div className='text-xs'>
                                 {rank.find((item) => item.encodeId === selected)?.artistsNames}
                              </div>
                           </div>
                           {chart && (
                              <div className='ml-auto font-semibold text-white'>
                                 {Math.round(
                                    ((rank.find((item) => item.encodeId === selected)?.score as number) * 100) /
                                       chart.totalScore
                                 )}
                                 %
                              </div>
                           )}
                        </div>
                     </li>
                  )}
               </div>
            </div>
         </div>
         <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </div>
   )
}
