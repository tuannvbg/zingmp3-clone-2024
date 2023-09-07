'use client'
import Loading from '@/components/Loading/Loading'
import Modal from '@/components/Modal/Modal'
import Tooltip from '@/components/Tooltip/Tooltip'
import { AppContext } from '@/contexts/app.context'
import useGetHome from '@/hooks/useGetHome'
import usePlayMusic from '@/hooks/usePlayMusic'
import { ReleaseType } from '@/types/release.type'
import { formatDateDifference, timeFormatter } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

export default function SongRelease() {
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal
   const { currentSongId, isLoadingSong, isPlaying, setAtAlbum } = useContext(AppContext)
   const [tabRelease, setTabRelease] = useState<'all' | 'vPop' | 'others'>('all')
   const { data } = useGetHome()

   const { handleClickSong } = usePlayMusic()

   const releaseList: ReleaseType = data?.data.data.items[2].items //mới phát hành
   if (!releaseList) return <Loading />
   return (
      <div className={`mt-[70px] px-3 sm:px-8 lg:px-14 ${currentSongId ? 'pb-36 md:pb-28' : 'pb-20 md:pb-16'}`}>
         <div className='pt-[30px] flex flex-wrap items-center gap-x-3'>
            <h1 className='text-[40px] font-bold'>Mới Phát Hành</h1>
            <div className='w-9 h-9 rounded-full bg-white flex items-center justify-center'>
               <div
                  style={{
                     clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                  }}
                  className='bg-primary w-3.5 translate-x-[1px] h-4'
               />
            </div>
         </div>

         <div className='flex items-center flex-wrap gap-4 mt-10'>
            <button
               onClick={() => setTabRelease('all')}
               className={`uppercase text-xs text-white rounded-full px-6 py-1 ${
                  tabRelease === 'all' ? 'bg-tprimary' : 'bg-transparent border border-gray-700'
               }`}
            >
               tất cả
            </button>
            <button
               onClick={() => setTabRelease('vPop')}
               className={`uppercase text-xs text-white rounded-full px-6 py-1 ${
                  tabRelease === 'vPop' ? 'bg-tprimary' : 'bg-transparent border border-gray-700'
               }`}
            >
               việt nam
            </button>
            <button
               onClick={() => setTabRelease('others')}
               className={`uppercase text-xs text-white rounded-full px-6 py-1 ${
                  tabRelease === 'others' ? 'bg-tprimary' : 'bg-transparent border border-gray-700'
               }`}
            >
               quốc tế
            </button>
         </div>

         <div className='mt-8'>
            <div className='flex text-secondary text-xs items-center border-b border-b-gray-800 p-2.5'>
               <div className='w-full sm:w-[60%]'>BÀI HÁT</div>
               <div className='flex-1 sm:block hidden'>PHÁT HÀNH</div>
               <div className='whitespace-nowrap'>THỜI GIAN</div>
            </div>
            <ul>
               {releaseList[tabRelease].map((item) => (
                  <li
                     key={item.encodeId}
                     className={`flex group hover:bg-white hover:bg-opacity-10 select-none ${
                        currentSongId === item.encodeId && 'bg-white bg-opacity-10'
                     } rounded-md items-center text-secondary text-xs p-2.5 border-b border-b-gray-800`}
                  >
                     <div className='w-full sm:w-[60%] flex items-center gap-x-2'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           fill='none'
                           viewBox='0 0 24 24'
                           strokeWidth={1.5}
                           stroke='currentColor'
                           className='w-4 h-4 flex-shrink-0'
                        >
                           <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z'
                           />
                        </svg>
                        <div
                           onClick={() => {
                              if (item.isWorldWide) {
                                 setAtAlbum(true)
                                 handleClickSong(item.encodeId)
                              } else {
                                 setIsOpenModal(true)
                              }
                           }}
                           className='relative cursor-pointer overflow-hidden w-10 flex-shrink-0 h-10 rounded'
                        >
                           <Image
                              src={item.thumbnail}
                              alt={item.title}
                              width={40}
                              height={40}
                              className='object-cover w-full h-full'
                           />
                           {!isLoadingSong && isPlaying && currentSongId === item.encodeId ? (
                              <div className='absolute inset-0 flex items-center justify-center z-20'>
                                 <Image
                                    src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'}
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
                                    src={'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'}
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
                              <h3
                                 title={item.title}
                                 className='text-white max-w-[150px] sm:max-w-[250px] truncate capitalize text-sm font-medium'
                              >
                                 {item.title}
                              </h3>
                              {!item.isWorldWide && (
                                 <div className='bg-yellow-500 font-medium text-[9px] rounded-sm px-1 h-3.5 flex items-center justify-center text-white tracking-widest'>
                                    VIP
                                 </div>
                              )}
                           </div>
                           <div className='text-xs max-w-[150px] sm:max-w-[250px] truncate'>
                              {item.artists?.map((artist, index) => {
                                 return index === item.artists.length - 1 ? (
                                    <Link
                                       href={artist.link}
                                       key={artist.id}
                                       className='text-secondary isHover cursor-pointer hover:underline'
                                    >
                                       {artist.name}
                                    </Link>
                                 ) : (
                                    <Link
                                       href={artist.link}
                                       key={artist.id}
                                       className='text-secondary isHover cursor-pointer hover:underline'
                                    >
                                       {`${artist.name}, `}
                                    </Link>
                                 )
                              })}
                           </div>
                        </div>
                     </div>
                     <div className='flex-1 sm:block hidden w-0 self-center basis-auto mr-2'>
                        <span className='text-xs text-secondary'>{formatDateDifference(item.releaseDate)}</span>
                     </div>
                     <div>
                        <div className='hidden sm:block'>
                           <div className='hidden group-hover:flex items-center gap-x-3'>
                              {item.hasLyric && (
                                 <Tooltip content={'Phát cùng lời bài hát'}>
                                    <button className='p-2 hover:bg-white hover:bg-opacity-10 rounded-full'>
                                       <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth={1.5}
                                          stroke='currentColor'
                                          className='w-[18px] text-white h-[18px]'
                                       >
                                          <path
                                             strokeLinecap='round'
                                             strokeLinejoin='round'
                                             d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
                                          />
                                       </svg>
                                    </button>
                                 </Tooltip>
                              )}
                              <Tooltip content={'Thêm vào thư viện'}>
                                 <button className='p-2 hover:bg-white hover:bg-opacity-10 rounded-full'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       fill='none'
                                       viewBox='0 0 24 24'
                                       strokeWidth={1.5}
                                       stroke='currentColor'
                                       className='w-[18px] text-white h-[18px]'
                                    >
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                                       />
                                    </svg>
                                 </button>
                              </Tooltip>
                              <Tooltip content={'Khác'}>
                                 <button className='p-2 hover:bg-white hover:bg-opacity-10 rounded-full'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       fill='none'
                                       viewBox='0 0 24 24'
                                       strokeWidth={1.5}
                                       stroke='currentColor'
                                       className='w-[18px] text-white h-[18px]'
                                    >
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                                       />
                                    </svg>
                                 </button>
                              </Tooltip>
                           </div>
                        </div>
                        <span className='group-hover:hidden'>{timeFormatter(item.duration)}</span>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
         <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </div>
   )
}
