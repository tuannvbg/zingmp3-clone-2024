'use client'
import HomeList from '@/components/HomeList/HomeList'
import Loading from '@/components/Loading/Loading'
import Modal from '@/components/Modal/Modal'
import Tooltip from '@/components/Tooltip/Tooltip'
import { AppContext } from '@/contexts/app.context'
import useAddLibrary from '@/hooks/useAddLibrary'
import useFollow from '@/hooks/useFollow'
import usePlayMusic from '@/hooks/usePlayMusic'
import { SongItem } from '@/types/playlist.type'
import { formatNumberWithK, timeFormatter } from '@/utils/utils'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { UrlObject } from 'url'

export default function SearchAll() {
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal
   const { searchData, currentSongId, isLoadingSong, setRecentSong, isPlaying, setAtAlbum, playList, setPlayList } =
      useContext(AppContext)
   const searchParams = useSearchParams()
   const keyword = searchParams.get('q')
   const { follows, handleClickFollow } = useFollow()
   const { handleClickSong } = usePlayMusic()
   const { handleAddLibrary, library } = useAddLibrary()
   const artists = searchData.artists
   const songs = searchData.songs
   useEffect(() => {
      if (songs) {
         setPlayList(songs)
      }
   }, [setPlayList, songs])
   const top = searchData.top
   const playlists = searchData.playlists
   const videos = searchData.videos

   if (!top) return <Loading />
   return (
      <>
         {/* NỔI BẬT */}
         <h2 className='mb-5 text-xl font-bold'>Nổi Bật</h2>
         <div className='grid grid-cols-3 gap-x-7'>
            {top.objectType === 'artist' && (
               <div className='p-2.5 rounded-md bg-white bg-opacity-5 flex items-center gap-x-4 hover:bg-opacity-10'>
                  <Link href={artists[0].link} className='relative group overflow-hidden rounded-full cursor-pointer'>
                     <Image
                        src={artists[0].thumbnail}
                        alt={artists[0].name}
                        width={84}
                        height={84}
                        className='w-[84px] h-[84px] object-cover rounded-full'
                     />
                     <div className='absolute hidden group-hover:block inset-0 bg-black bg-opacity-40 z-10' />
                     <div className='absolute inset-0 hidden group-hover:flex items-center z-20 justify-center'>
                        <svg
                           stroke='currentColor'
                           fill='currentColor'
                           strokeWidth={0}
                           viewBox='0 0 512 512'
                           height='20'
                           width='20'
                           xmlns='http://www.w3.org/2000/svg'
                           className='w-5 h-5'
                        >
                           <path d='M504.971 359.029c9.373 9.373 9.373 24.569 0 33.941l-80 79.984c-15.01 15.01-40.971 4.49-40.971-16.971V416h-58.785a12.004 12.004 0 0 1-8.773-3.812l-70.556-75.596 53.333-57.143L352 336h32v-39.981c0-21.438 25.943-31.998 40.971-16.971l80 79.981zM12 176h84l52.781 56.551 53.333-57.143-70.556-75.596A11.999 11.999 0 0 0 122.785 96H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12zm372 0v39.984c0 21.46 25.961 31.98 40.971 16.971l80-79.984c9.373-9.373 9.373-24.569 0-33.941l-80-79.981C409.943 24.021 384 34.582 384 56.019V96h-58.785a12.004 12.004 0 0 0-8.773 3.812L96 336H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h110.785c3.326 0 6.503-1.381 8.773-3.812L352 176h32z' />
                        </svg>
                     </div>
                  </Link>
                  <div className='flex flex-col gap-y-1.5'>
                     <span className='text-secondary text-xs'>Nghệ sĩ</span>

                     <Link href={artists[0].link} className='font-bold isHover cursor-pointer hover:underline'>
                        {artists[0].name}
                     </Link>

                     <span className='text-secondary text-xs'>
                        {formatNumberWithK(artists[0].totalFollow)} quan tâm
                     </span>
                  </div>
               </div>
            )}
            {top.objectType === 'playlist' && (
               <div className='p-2.5 rounded-md group bg-white bg-opacity-5 flex items-center gap-x-4 hover:bg-opacity-10'>
                  <Link
                     href={top.link}
                     className='relative group w-[84px] h-[84px] overflow-hidden flex-shrink-0 rounded cursor-pointer'
                  >
                     <Image
                        src={top.thumbnail}
                        alt={top.name}
                        width={84}
                        height={84}
                        className='w-full h-full object-cover rounded '
                     />
                     <div className='absolute hidden group-hover:block inset-0 bg-black bg-opacity-40 z-10' />
                     <div className='absolute inset-0 hidden group-hover:flex items-center z-20 justify-center'>
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
                  </Link>
                  <div className='flex flex-col gap-y-1.5'>
                     <span className='text-secondary text-xs'>Playlist</span>

                     <span className='font-bold isHover cursor-pointer hover:underline'>{top.title}</span>

                     <div className='text-xs max-w-[150px] truncate'>
                        {top.artists?.map(
                           (
                              artist: {
                                 link: string | UrlObject
                                 id: React.Key | null | undefined
                                 name:
                                    | string
                                    | number
                                    | boolean
                                    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                    | Iterable<React.ReactNode>
                                    | React.ReactPortal
                                    | React.PromiseLikeOfReactNode
                                    | null
                                    | undefined
                              },
                              index: number
                           ) => {
                              return index === top.artists.length - 1 ? (
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
                           }
                        )}
                     </div>
                  </div>
                  <div className='hidden -translate-x-1/2 group-hover:flex items-center'>
                     <Tooltip left content={library.includes(top.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}>
                        <button
                           onClick={(e) => handleAddLibrary(e, top.encodeId)}
                           className={`hover:bg-white hover:bg-opacity-10 rounded-full p-1.5 ${
                              library.includes(top.encodeId) && 'text-tprimary'
                           }`}
                        >
                           {library.includes(top.encodeId) ? (
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
                  </div>
               </div>
            )}
            {songs &&
               songs
                  .slice(0, top.objectType === 'artist' || top.objectType === 'playlist' ? 2 : 3)
                  .map((item: SongItem) => (
                     <li
                        key={item.encodeId}
                        className={`flex group bg-white bg-opacity-5 hover:bg-white hover:bg-opacity-10  select-none ${
                           currentSongId === item.encodeId && 'bg-white bg-opacity-10'
                        } rounded-md items-center text-secondary text-xs p-2.5`}
                     >
                        <div className='w-full flex items-center gap-x-4'>
                           <div
                              onClick={() => {
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
                              }}
                              className='relative cursor-pointer overflow-hidden w-[84px] flex-shrink-0 h-[84px] rounded'
                           >
                              <Image
                                 src={item.thumbnail}
                                 alt={item.title}
                                 width={84}
                                 height={84}
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
                           <div className='flex flex-col gap-y-1.5'>
                              <span className='text-secondary text-xs'>Bài hát</span>
                              <h3
                                 title={item.title}
                                 className='text-white max-w-[150px] truncate capitalize text-sm font-bold'
                              >
                                 {item.title}
                              </h3>
                              <div className='text-xs max-w-[150px] truncate'>
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
                        <div className='hidden group-hover:flex items-center'>
                           <Tooltip
                              left
                              content={library.includes(item.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}
                           >
                              <button
                                 onClick={(e) => handleAddLibrary(e, item.encodeId, null, item)}
                                 className={`hover:bg-white text-white hover:bg-opacity-10 rounded-full p-1.5 ${
                                    library.includes(item.encodeId) && '!text-tprimary'
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
                        </div>
                     </li>
                  ))}
         </div>

         {/* BÀI HÁT */}
         <div className='flex items-center justify-between mt-10 mb-5'>
            <h2 className='text-xl font-bold'>Bài Hát</h2>
            <Link
               href={`/tim-kiem/bai-hat?q=${keyword}`}
               className='uppercase isHover cursor-pointer text-xs text-secondary flex items-center gap-x-1'
            >
               tất cả
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-[18px] h-[18px]'
               >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
               </svg>
            </Link>
         </div>
         <ul className='grid grid-cols-2 gap-x-7'>
            {playList &&
               playList.slice(0, 6).map((item: SongItem) => (
                  <li
                     key={item.encodeId}
                     className={`flex group hover:bg-white hover:bg-opacity-10  select-none ${
                        currentSongId === item.encodeId && 'bg-white bg-opacity-10'
                     } rounded-md items-center text-secondary text-xs p-2.5 border-b border-b-gray-800`}
                  >
                     <div className='w-full flex items-center gap-x-2'>
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
                                 className='text-white max-w-[250px] truncate capitalize text-sm font-medium'
                              >
                                 {item.title}
                              </h3>
                              {!item.isWorldWide && (
                                 <div className='bg-yellow-500 font-medium text-[9px] rounded-sm px-1 h-3.5 flex items-center justify-center text-white tracking-widest'>
                                    VIP
                                 </div>
                              )}
                           </div>
                           <div className='text-xs max-w-[250px] truncate'>
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
                     <div className='hidden group-hover:flex items-center'>
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
                           left
                           content={library.includes(item.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}
                        >
                           <button
                              onClick={(e) => handleAddLibrary(e, item.encodeId, null, item)}
                              className={`hover:bg-white text-white hover:bg-opacity-10 rounded-full p-1.5 ${
                                 library.includes(item.encodeId) && '!text-tprimary'
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
                     </div>
                     <span className='group-hover:hidden'>{timeFormatter(item.duration)}</span>
                  </li>
               ))}
         </ul>

         {/* PLAYLIST/ALBUM */}
         {playlists && (
            <>
               <div className='flex items-center justify-between mt-10 mb-5'>
                  <h2 className='text-xl font-bold'>Playlist/Album</h2>
                  <Link
                     href={`/tim-kiem/playlist?q=${keyword}`}
                     className='uppercase isHover cursor-pointer text-xs text-secondary flex items-center gap-x-1'
                  >
                     tất cả
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[18px] h-[18px]'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                  </Link>
               </div>
               <HomeList title list={playlists} />
            </>
         )}

         {/* MV */}
         {videos && (
            <>
               <div className='flex items-center justify-between mt-10 mb-5'>
                  <h2 className='text-xl font-bold'>MV</h2>
                  <Link
                     href={`/tim-kiem/video?q=${keyword}`}
                     className='uppercase isHover cursor-pointer text-xs text-secondary flex items-center gap-x-1'
                  >
                     tất cả
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[18px] h-[18px]'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                  </Link>
               </div>
               <HomeList title list={videos} />
            </>
         )}

         {/* NGHỆ SĨ/OA */}
         {artists && (
            <>
               <div className='flex items-center justify-between mt-10 mb-5'>
                  <h2 className='text-xl font-bold'>Nghệ Sĩ/OA</h2>
                  <Link
                     href={`/tim-kiem/artist?q=${keyword}`}
                     className='uppercase isHover cursor-pointer text-xs text-secondary flex items-center gap-x-1'
                  >
                     tất cả
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[18px] h-[18px]'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                  </Link>
               </div>
               <div className='grid grid-cols-4 gap-x-7'>
                  {artists
                     .slice(0, 4)
                     .map(
                        (artist: {
                           id: React.Key | null | undefined
                           link: string | UrlObject
                           thumbnail: string | StaticImport
                           name:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                              | Iterable<React.ReactNode>
                              | React.PromiseLikeOfReactNode
                              | null
                              | undefined
                           totalFollow: number
                        }) => (
                           <div key={artist.id} className='flex flex-col text-center'>
                              <Link
                                 href={artist.link}
                                 className='relative group aspect-square overflow-hidden rounded-full cursor-pointer'
                              >
                                 <Image
                                    src={artist.thumbnail}
                                    alt={artist.name as string}
                                    fill
                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    className='w-full h-full object-cover transition-all duration-500 group-hover:scale-110'
                                 />
                                 <div className='absolute hidden group-hover:block inset-0 bg-black bg-opacity-40 z-10' />
                                 <div className='absolute inset-0 hidden group-hover:flex items-center z-20 justify-center'>
                                    <span className='border border-white p-4 rounded-full'>
                                       <svg
                                          stroke='currentColor'
                                          fill='currentColor'
                                          strokeWidth={0}
                                          viewBox='0 0 512 512'
                                          height='20'
                                          width='20'
                                          xmlns='http://www.w3.org/2000/svg'
                                          className='w-5 h-5'
                                       >
                                          <path d='M504.971 359.029c9.373 9.373 9.373 24.569 0 33.941l-80 79.984c-15.01 15.01-40.971 4.49-40.971-16.971V416h-58.785a12.004 12.004 0 0 1-8.773-3.812l-70.556-75.596 53.333-57.143L352 336h32v-39.981c0-21.438 25.943-31.998 40.971-16.971l80 79.981zM12 176h84l52.781 56.551 53.333-57.143-70.556-75.596A11.999 11.999 0 0 0 122.785 96H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12zm372 0v39.984c0 21.46 25.961 31.98 40.971 16.971l80-79.984c9.373-9.373 9.373-24.569 0-33.941l-80-79.981C409.943 24.021 384 34.582 384 56.019V96h-58.785a12.004 12.004 0 0 0-8.773 3.812L96 336H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h110.785c3.326 0 6.503-1.381 8.773-3.812L352 176h32z' />
                                       </svg>
                                    </span>
                                 </div>
                              </Link>
                              <Link
                                 href={artist.link}
                                 className='isHover cursor-pointer hover:underline font-medium mt-3 mb-1'
                              >
                                 {artist.name}
                              </Link>
                              <span className='text-secondary text-xs'>
                                 {formatNumberWithK(artist.totalFollow)} quan tâm
                              </span>
                              <button
                                 onClick={() => handleClickFollow(artist.id as string)}
                                 className={`flex items-center gap-x-1 text-xs w-max mx-auto mt-3 rounded-full px-3.5 ${
                                    follows.includes(artist.id as string)
                                       ? 'bg-white bg-opacity-10 hover:bg-opacity-20 py-1.5'
                                       : 'bg-tprimary hover:bg-opacity-90 py-1'
                                 }`}
                              >
                                 {follows.includes(artist.id as string) ? (
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       fill='none'
                                       viewBox='0 0 24 24'
                                       strokeWidth={1.5}
                                       stroke='currentColor'
                                       className='w-4 h-4'
                                    >
                                       <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                                    </svg>
                                 ) : (
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
                                          d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
                                       />
                                    </svg>
                                 )}
                                 {follows.includes(artist.id as string) ? 'ĐÃ QUAN TÂM' : 'QUAN TÂM'}
                              </button>
                           </div>
                        )
                     )}
               </div>
            </>
         )}

         <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </>
   )
}
