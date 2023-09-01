'use client'
import Modal from '@/components/Modal/Modal'
import Tooltip from '@/components/Tooltip/Tooltip'
import { AppContext } from '@/contexts/app.context'
import useAddLibrary from '@/hooks/useAddLibrary'
import usePlayMusic from '@/hooks/usePlayMusic'
import useProtectedRoute from '@/hooks/useProtectedRoute'
import { timeFormatter } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

export default function MyMusicSong({ profile = false }: { profile?: boolean }) {
   const { currentSongId, songsLibrary, setAtAlbum, setRecentSong, isLoadingSong, isPlaying } = useContext(AppContext)
   const { handleAddLibrary, library } = useAddLibrary()
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal
   const { handleClickSong } = usePlayMusic()
   useProtectedRoute()
   return (
      <div className={profile ? 'mt-12' : `mt-[70px] px-14 ${currentSongId ? 'pb-28' : 'pb-10'}`}>
         {!profile && <h1 className='font-bold py-5 text-2xl'>Bài hát yêu thích</h1>}
         {songsLibrary.length > 0 ? (
            <>
               <div className='flex items-center text-secondary text-xs mt-3 p-2.5 border-b border-b-gray-800'>
                  <div className='w-[53%] flex items-center gap-x-3'>BÀI HÁT</div>
                  <div className='flex-1'>ALBUM</div>
                  <div>THỜI GIAN</div>
               </div>
               <ul>
                  {songsLibrary.map((item) => (
                     <li
                        key={item.encodeId}
                        className={`flex group hover:bg-white hover:bg-opacity-10  select-none ${
                           currentSongId === item.encodeId && 'bg-white bg-opacity-10'
                        } rounded-md items-center text-secondary text-xs p-2.5 border-b border-b-gray-800`}
                     >
                        <div className='w-[53%] flex items-center gap-x-2'>
                           <div
                              onClick={() => {
                                 if (item.isWorldWide) {
                                    setAtAlbum(true)
                                    handleClickSong(item.encodeId)
                                    setRecentSong((prev) => {
                                       if (prev.length >= 20) {
                                          return prev.includes(item)
                                             ? [item, ...prev.filter((i) => i !== item)]
                                             : [item, ...prev.filter((_, index) => index !== prev.length - 1)]
                                       } else {
                                          return prev.includes(item)
                                             ? [item, ...prev.filter((i) => i !== item)]
                                             : [item, ...prev]
                                       }
                                    })
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
                                 <h3
                                    title={item.title}
                                    className='text-white max-w-[180px] truncate capitalize text-sm font-medium'
                                 >
                                    {item.title}
                                 </h3>
                                 {!item.isWorldWide && (
                                    <div className='bg-yellow-500 font-medium text-[9px] rounded-sm px-1 h-3.5 flex items-center justify-center text-white tracking-widest'>
                                       VIP
                                    </div>
                                 )}
                              </div>
                              <div className='text-xs max-w-[200px] truncate'>
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
                                       <>
                                          <Link
                                             href={artist.link}
                                             key={artist.id}
                                             className='text-secondary isHover cursor-pointer hover:underline'
                                          >
                                             {artist.name}
                                          </Link>
                                          ,{' '}
                                       </>
                                    )
                                 })}
                              </div>
                           </div>
                        </div>
                        <div className='flex-1 w-0 self-center basis-auto mr-2'>
                           {item.album && (
                              <Link
                                 href={item.album.link}
                                 className='isHover cursor-pointer block max-w-[200px] truncate hover:underline capitalize'
                              >
                                 {item.album.title}
                              </Link>
                           )}
                        </div>
                        <div>
                           <div className='hidden group-hover:flex items-center gap-x-3'>
                              {item.mvlink && (
                                 <Tooltip content={'Xem MV'}>
                                    <button
                                       className={`p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full
                            `}
                                    >
                                       <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth={1.5}
                                          stroke='currentColor'
                                          className='w-[18px] h-[18px]'
                                       >
                                          <path
                                             strokeLinecap='round'
                                             strokeLinejoin='round'
                                             d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5'
                                          />
                                       </svg>
                                    </button>
                                 </Tooltip>
                              )}
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
                              <Tooltip
                                 content={library.includes(item.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}
                              >
                                 <button
                                    onClick={(e) => handleAddLibrary(e, item.encodeId, null, item)}
                                    className={`hover:bg-white hover:bg-opacity-10 rounded-full p-1.5 text-white ${
                                       library.includes(item.encodeId) && 'text-tprimary'
                                    }`}
                                 >
                                    {library.includes(item.encodeId) ? (
                                       <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          viewBox='0 0 24 24'
                                          fill='currentColor'
                                          className='w-5 h-5'
                                       >
                                          <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
                                       </svg>
                                    ) : (
                                       <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth={2}
                                          stroke='currentColor'
                                          className='w-5 h-5'
                                       >
                                          <path
                                             strokeLinecap='round'
                                             strokeLinejoin='round'
                                             d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                                          />
                                       </svg>
                                    )}
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
                           <span className='group-hover:hidden'>{timeFormatter(item.duration)}</span>
                        </div>
                     </li>
                  ))}
               </ul>
            </>
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
