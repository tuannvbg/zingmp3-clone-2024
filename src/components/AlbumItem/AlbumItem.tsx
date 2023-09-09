'use client'
import ArtistList from '@/components/ArtistList/ArtistList'
import Loading from '@/components/Loading/Loading'
import Modal from '@/components/Modal/Modal'
import Tooltip from '@/components/Tooltip/Tooltip'
import { AppContext } from '@/contexts/app.context'
import useAddLibrary from '@/hooks/useAddLibrary'
import useClickOutSide from '@/hooks/useClickOutSide'
import useGetPlaylist from '@/hooks/useGetPlaylist'
import usePlayMusic from '@/hooks/usePlayMusic'
import { formatDateFromTimestamp, formatNumberWithK, secondsToHoursMinutes, timeFormatter } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

export default function AlbumItem({ params }: { params: { id: string } }) {
   const [isChecked, setIsChecked] = useState<string[]>([]) //check vào các bài nhạc
   const [openSortSong, setOpenSortSong] = useState(false) //toggle bảng sắp xếp bài hát
   const { nodeRef } = useClickOutSide(() => setOpenSortSong(false)) //tắt bảng sắp xếp bài hát
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal
   const { library, handleAddLibrary } = useAddLibrary() //thêm vào thư viện

   const {
      setIsPlaying,
      isPlaying,
      currentSongId,
      isLoadingSong,
      setAtAlbum,
      playList: playlistMusic,
      setPlayList,
      atAlbum,
      setAlbumInfo,
      setRecentSong
   } = useContext(AppContext)

   //get api playlist
   const { data } = useGetPlaylist(params)
   const playlist = data?.data.data

   const songs = playlist?.song.items
   useEffect(() => {
      if (songs) {
         setPlayList(songs)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [songs])

   //checked bài hát
   const handleChecked = (id: string) => {
      if (isChecked.includes(id)) {
         setIsChecked((prev) => prev.filter((songId) => songId !== id))
      } else {
         setIsChecked((prev) => [...prev, id])
      }
   }

   const { handleClickSong } = usePlayMusic()

   //click vào banner
   const handleClickSongBanner = () => {
      const itemOne = playlist?.song.items[0]
      if (!currentSongId && itemOne) {
         handleClickSong(itemOne.encodeId)
         setRecentSong((prev) => {
            if (prev.length >= 20) {
               return prev.includes(itemOne)
                  ? [itemOne, ...prev.filter((i) => i !== itemOne)]
                  : [itemOne, ...prev.filter((_, index) => index !== prev.length - 1)]
            } else {
               return prev.includes(itemOne) ? [itemOne, ...prev.filter((i) => i !== itemOne)] : [itemOne, ...prev]
            }
         })
         setAtAlbum(true) //nếu ở album thì cho next prev
      } else if (!atAlbum && itemOne) {
         handleClickSong(itemOne.encodeId)
         setAtAlbum(true) //nếu ở album thì cho next prev
         setRecentSong((prev) => {
            if (prev.length >= 20) {
               return prev.includes(itemOne)
                  ? [itemOne, ...prev.filter((i) => i !== itemOne)]
                  : [itemOne, ...prev.filter((_, index) => index !== prev.length - 1)]
            } else {
               return prev.includes(itemOne) ? [itemOne, ...prev.filter((i) => i !== itemOne)] : [itemOne, ...prev]
            }
         })
      } else {
         setIsPlaying((prev) => !prev)
      }
   }

   useEffect(() => {
      if (playlist) {
         setAlbumInfo({ title: playlist.title, link: playlist.link })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params.id, playlist])

   if (!playlist) return <Loading />

   return (
      <div className={`mt-[70px] px-3 sm:px-8 lg:px-14 ${currentSongId ? 'pb-36 md:pb-28' : 'pb-20 md:pb-16'}`}>
         <div className='pt-[30px] flex flex-col min-[900px]:flex-row items-start gap-7'>
            <div className='min-[900px]:w-[33%] w-[70%] sm:w-[50%] mx-auto min-[900px]:sticky min-[900px]:top-[100px] text-center'>
               <div
                  onClick={handleClickSongBanner}
                  className={`relative shadow-lg aspect-square overflow-hidden group cursor-pointer ${
                     isPlaying && atAlbum ? 'rotate-center-start rounded-full' : 'rotate-center-end rounded-lg'
                  }`}
               >
                  <Image
                     src={playlist.thumbnailM}
                     fill
                     sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                     alt={playlist.title}
                     priority
                     className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
                  />
                  {!isLoadingSong && (
                     <div
                        className={`absolute inset-0 items-center justify-center ${
                           currentSongId && isPlaying && atAlbum
                              ? 'flex'
                              : 'hidden group-hover:flex bg-black bg-opacity-40'
                        }`}
                     >
                        <span className='border border-white rounded-full p-2'>
                           {currentSongId && isPlaying && atAlbum ? (
                              <Image
                                 src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'}
                                 width={32}
                                 height={32}
                                 className='w-8 h-8 p-1 object-cover'
                                 alt=''
                              />
                           ) : (
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 viewBox='0 0 24 24'
                                 fill='currentColor'
                                 className='w-7 h-7 translate-x-[1px]'
                              >
                                 <path
                                    fillRule='evenodd'
                                    d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                                    clipRule='evenodd'
                                 />
                              </svg>
                           )}
                        </span>
                     </div>
                  )}
                  {isLoadingSong && currentSongId && (
                     <div className='absolute inset-0 flex items-center justify-center z-20'>
                        <Image
                           src={'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'}
                           width={32}
                           height={32}
                           className='w-8 h-8 object-cover'
                           alt=''
                        />
                     </div>
                  )}
               </div>
               <h2 className='text-xl font-bold mt-3'>{playlist.title}</h2>
               <p className='text-secondary text-xs my-1'>Cập nhật: {formatDateFromTimestamp(data.data.timestamp)}</p>
               <div className='text-secondary text-xs my-1'>
                  {playlist.artists?.map((artist, index) => {
                     return index === playlist.artists.length - 1 ? (
                        <Link href={artist.link} key={artist.id} className='isHover cursor-pointer hover:underline'>
                           {artist.name}
                        </Link>
                     ) : (
                        <Link href={artist.link} key={artist.id} className='isHover cursor-pointer hover:underline'>
                           {`${artist.name}, `}
                        </Link>
                     )
                  })}
               </div>
               <p className='text-secondary text-xs my-1'>{formatNumberWithK(playlist.like)} người yêu thích</p>
               <button
                  onClick={handleClickSongBanner}
                  className='flex items-center gap-x-1 text-white uppercase bg-tprimary rounded-full px-5 hover:bg-opacity-90 mx-auto mt-4 py-2'
               >
                  {currentSongId && isPlaying && atAlbum ? (
                     <>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           fill='none'
                           viewBox='0 0 24 24'
                           strokeWidth={3}
                           stroke='currentColor'
                           className='w-5 h-5'
                        >
                           <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 5.25v13.5m-7.5-13.5v13.5' />
                        </svg>
                        tạm dừng
                     </>
                  ) : (
                     <>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 24 24'
                           fill='currentColor'
                           className='w-5 h-5'
                        >
                           <path
                              fillRule='evenodd'
                              d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                              clipRule='evenodd'
                           />
                        </svg>
                        tiếp tục phát
                     </>
                  )}
               </button>
               <div className='flex items-center justify-center gap-x-5 mt-4'>
                  <Tooltip content={library.includes(playlist.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}>
                     <button
                        onClick={(e) => handleAddLibrary(e, playlist.encodeId, playlist)}
                        className={`hover:bg-white hover:bg-opacity-10 bg-white bg-opacity-10 rounded-full p-1.5 ${
                           library.includes(playlist.encodeId) && 'text-tprimary'
                        }`}
                     >
                        {library.includes(playlist.encodeId) ? (
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
                     <button className='p-2 bg-white bg-opacity-10 rounded-full'>
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           fill='none'
                           viewBox='0 0 24 24'
                           strokeWidth={2}
                           stroke='currentColor'
                           className='w-[18px] h-[18px]'
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
            <div className='min-[900px]:w-[67%] w-full'>
               <p>
                  <span className='text-secondary'>Lời tựa</span> {playlist.description}
               </p>
               <div className='flex items-center text-xs mt-3 p-2.5 border-b border-b-gray-800'>
                  <div className='sm:w-[53%] w-full flex items-center gap-x-3'>
                     <div className='relative'>
                        <button
                           ref={nodeRef}
                           onClick={() => setOpenSortSong((prev) => !prev)}
                           className='border-[1.5px] border-secondary rounded'
                        >
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-3 h-3'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 d='M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5'
                              />
                           </svg>
                        </button>
                        {openSortSong && (
                           <>
                              <div
                                 className='absolute top-full left-[1px] w-8 h-4 bg-tertiary z-10'
                                 style={{
                                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                                 }}
                              />
                              <div className='absolute left-0 top-[150%] bg-tertiary rounded-lg p-1 z-[100] text-white text-xs'>
                                 <button className='p-2 hover:bg-white hover:bg-opacity-10 whitespace-nowrap w-full text-left rounded-lg'>
                                    Mặc định
                                 </button>
                                 <button className='p-2 hover:bg-white hover:bg-opacity-10 whitespace-nowrap w-full text-left rounded-lg'>
                                    Tên bài hát (A-Z)
                                 </button>
                                 <button className='p-2 hover:bg-white hover:bg-opacity-10 whitespace-nowrap w-full text-left rounded-lg'>
                                    Tên ca sĩ (A-Z)
                                 </button>
                                 <button className='p-2 hover:bg-white hover:bg-opacity-10 whitespace-nowrap w-full text-left rounded-lg'>
                                    Tên Album (A-Z)
                                 </button>
                              </div>
                           </>
                        )}
                     </div>
                     BÀI HÁT
                  </div>
                  <div className='flex-1 sm:block hidden'>ALBUM</div>
                  <div className='whitespace-nowrap'>THỜI GIAN</div>
               </div>
               {/* list nhạc */}
               <ul>
                  {playlistMusic &&
                     playlistMusic.length > 0 &&
                     playlistMusic.map((item) => (
                        <li
                           key={item.encodeId}
                           className={`flex group hover:bg-white hover:bg-opacity-10  select-none ${
                              isChecked.includes(item.encodeId) ||
                              (currentSongId === item.encodeId && 'bg-white bg-opacity-10')
                           } rounded-md items-center text-xs p-2.5 border-b border-b-gray-800`}
                        >
                           <div className='w-full sm:w-[53%] flex items-center gap-x-2'>
                              <label
                                 className={`cursor-pointer hidden group-hover:block translate-y-[3px] ${
                                    isChecked.includes(item.encodeId) && '!block'
                                 }`}
                              >
                                 <input
                                    type='checkbox'
                                    onChange={() => handleChecked(item.encodeId)}
                                    checked={isChecked.includes(item.encodeId)}
                                    className='hidden'
                                 />
                                 <span
                                    className={`inline-flex items-center justify-center w-4 h-4 text-white bg-transparent border rounded ${
                                       isChecked.includes(item.encodeId) ? 'border-white' : 'border-secondary'
                                    }`}
                                 >
                                    {isChecked.includes(item.encodeId) && (
                                       <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth={3}
                                          stroke='currentColor'
                                          className='w-4 h-4'
                                       >
                                          <path
                                             strokeLinecap='round'
                                             strokeLinejoin='round'
                                             d='M4.5 12.75l6 6 9-13.5'
                                          />
                                       </svg>
                                    )}
                                 </span>
                              </label>
                              {!isChecked.includes(item.encodeId) && (
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-4 h-4 group-hover:hidden flex-shrink-0'
                                 >
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       d='M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z'
                                    />
                                 </svg>
                              )}
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
                                       className='max-w-[120px] lg:max-w-[200px] truncate capitalize text-sm font-medium'
                                    >
                                       {item.title}
                                    </h3>
                                    {!item.isWorldWide && (
                                       <div className='bg-yellow-500 font-medium text-[9px] rounded-sm px-1 h-3.5 flex items-center justify-center text-white tracking-widest'>
                                          VIP
                                       </div>
                                    )}
                                 </div>
                                 <div className='text-xs text-secondary max-w-[120px] lg:max-w-[200px] truncate'>
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
                           </div>
                           <div className='flex-1 sm:block hidden w-0 self-center basis-auto mr-2'>
                              {item.album && (
                                 <Link
                                    href={item.album.link}
                                    className='isHover cursor-pointer block max-w-[120px] lg:max-w-[200px] truncate hover:underline capitalize'
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
                                          className={`p-2 hover:bg-white hover:bg-opacity-10 rounded-full
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
                                             className='w-[18px] h-[18px]'
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
                                    content={
                                       library.includes(item.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'
                                    }
                                 >
                                    <button
                                       onClick={(e) => handleAddLibrary(e, item.encodeId, null, item)}
                                       className={`hover:bg-white hover:bg-opacity-10 rounded-full p-1.5 ${
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
                                          className='w-[18px] h-[18px]'
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
               <div className='flex items-center gap-x-2 text-secondary mt-4'>
                  <span>{playlist?.song.total} bài hát</span>
                  <div className='w-1.5 h-1.5 rounded-full bgr-secondary' />
                  <span>{secondsToHoursMinutes(playlist?.song.totalDuration)}</span>
               </div>
            </div>
         </div>
         <h2 className='text-xl font-bold mb-5 capitalize mt-12'>Nghệ Sĩ Tham Gia</h2>
         <ArtistList artistList={playlist.artists} />
         <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </div>
   )
}
