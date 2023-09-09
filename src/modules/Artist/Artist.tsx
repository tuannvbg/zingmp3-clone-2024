'use client'
import DOMPurify from 'dompurify'
import HomeList from '@/components/HomeList/HomeList'
import Loading from '@/components/Loading/Loading'
import Modal from '@/components/Modal/Modal'
import Popover from '@/components/Popover/Popover'
import Tooltip from '@/components/Tooltip/Tooltip'
import { AppContext } from '@/contexts/app.context'
import useAddLibrary from '@/hooks/useAddLibrary'
import useFollow from '@/hooks/useFollow'
import usePlayMusic from '@/hooks/usePlayMusic'
import { Artist, Item } from '@/types/artist.type'
import { HomeListType } from '@/types/homelist.type'
import { formatNumberWithDot, formatNumberWithK, timeFormatter } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import ModalArtist from '@/components/Modal/ModalArtist'
import { SongItem } from '@/types/playlist.type'
import { getArtist } from '@/apis/home.api'
import MvArtistItem from '@/components/MvArtistItem/MvArtistItem'

export default function Artist() {
   const { currentSongId, setAtAlbum, isLoadingSong, setRecentSong, isPlaying, playList, setPlayList } =
      useContext(AppContext)
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal
   const [isOpenModalArtist, setIsOpenModalArtist] = useState<boolean>(false) //tắt mở modal artist
   const { handleAddLibrary, library } = useAddLibrary()
   const pathname = usePathname()
   const { data } = useQuery({
      queryKey: ['artist', pathname],
      queryFn: () => getArtist({ name: pathname.split('/')[pathname.split('/').length - 1] })
   })
   const artistData = data?.data.data
   const sections = artistData?.sections
   useEffect(() => {
      if (sections?.[0]) {
         setPlayList(sections[0].items as SongItem[])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [sections])
   const { handleClickSong } = usePlayMusic()
   const { follows, handleClickFollow } = useFollow()

   if (!artistData || !sections) return <Loading />
   return (
      <div className={`${currentSongId ? 'pb-40 md:pb-32' : 'pb-24 md:pb-20'}`}>
         <div className='relative h-[410px]'>
            <Image src={artistData.cover} alt={artistData.name} fill priority className='w-full h-full object-cover' />
            <div
               style={{
                  backgroundImage: 'linear-gradient(180deg,#00000080 0%, #ffffff00 35%, #ffffff00 65%, #00000080 100%)'
               }}
               className='absolute inset-0 z-10'
            />
            <div className='absolute bottom-6 left-5 right-5 md:left-14 md:right-14 z-20'>
               <div className='flex items-center gap-x-5 mb-5'>
                  <h1
                     style={{
                        textShadow: '0 1px 4px rgba(0,0,0,.16)'
                     }}
                     className='font-bold text-3xl md:text-6xl'
                  >
                     {artistData.name}
                  </h1>
                  <div className='md:w-[52px] md:h-[52px] w-8 h-8 rounded-full bg-white flex items-center justify-center'>
                     <div
                        style={{
                           clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                        }}
                        className='bg-tprimary w-3 h-4 md:w-4 translate-x-[1px] md:h-5'
                     />
                  </div>
               </div>
               <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-x-5'>
                     <span>{formatNumberWithDot(artistData.totalFollow)} người quan tâm</span>
                     <button
                        onClick={() => handleClickFollow(artistData.id, artistData as unknown as Artist)}
                        className={`flex items-center gap-x-1 font-semibold text-xs w-max rounded-full px-5 border border-[rgba(254,255,255,.2)] bg-[rgba(254,255,255,.1)] py-1.5`}
                     >
                        {follows.includes(artistData.id) ? (
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
                        {follows.includes(artistData.id) ? 'ĐÃ QUAN TÂM' : 'QUAN TÂM'}
                     </button>
                  </div>
                  {artistData.awards && (
                     <Popover
                        renderPopover={
                           <div className='bg-[#333] text-xs rounded px-2 py-1'>
                              {artistData.awards.map((item) => (
                                 <p key={item}>{item}</p>
                              ))}
                           </div>
                        }
                     >
                        <button className='w-[41px] md:block hidden h-11'>
                           <svg width='100%' height='100%' viewBox='0 0 38 40'>
                              <g fill='none' fillRule='evenodd'>
                                 <path
                                    fill='currentColor'
                                    d='M37.838 0v40H0V0h37.838zM6.645 30.47L5 33.778l3.307-.008-1.662-3.298zm11.905 0l-2.307 1.66 2.315 1.647-.008-3.306zm-2.317 0l-.32.001.01 3.306h.32l-.01-3.306zm-6.344 0h-.26l.942 3.307h.297l.913-2.98.91 2.98h.296l.941-3.306h-.26l-.834 2.97-.909-2.97h-.292l-.904 2.97-.84-2.97zm12.254 0h-1.27v3.307h.244v-1.355h1.017l.773 1.355h.28l-.8-1.388c.207-.057.373-.17.506-.345.133-.175.203-.374.203-.596 0-.269-.092-.496-.281-.69-.189-.193-.41-.287-.672-.287zm4.349 0h-1.32v3.307h1.32c.477 0 .873-.16 1.184-.477.316-.32.472-.713.472-1.176 0-.463-.156-.855-.472-1.172-.311-.32-.707-.481-1.184-.481zm4.457 0c-.29 0-.528.078-.724.239-.19.155-.286.361-.286.623 0 .16.053.293.11.389.057.092.205.192.295.247.043.028.114.06.205.096l.21.078.238.074c.295.091.514.183.652.279.138.096.21.229.21.408 0 .38-.3.64-.838.64-.534 0-.881-.247-1-.645l-.22.124c.153.462.605.755 1.22.755.328 0 .595-.077.795-.238.2-.16.3-.375.3-.641 0-.261-.1-.458-.343-.6-.119-.073-.229-.128-.333-.17-.1-.04-.243-.091-.429-.15-.29-.092-.495-.18-.624-.266-.128-.087-.19-.216-.19-.39 0-.361.295-.618.752-.618.414 0 .7.183.857.554l.215-.114c-.172-.399-.553-.673-1.072-.673zm-4.457.237c.406 0 .742.137 1.003.41.261.27.392.606.392 1.007 0 .402-.13.737-.392 1.011-.26.27-.597.406-1.003.406h-1.054v-2.834zm-4.349 0c.198 0 .364.07.502.217s.207.321.207.524c0 .204-.07.378-.207.525-.138.142-.304.212-.502.212h-1.026v-1.478zm3.029-7.511h-1.323v6.283h1.323v-6.283zm-18.87 0H5v6.283h1.266v-4.066l1.807 2.908h.147l1.807-2.917v4.075h1.256v-6.283H9.981l-1.835 2.97-1.844-2.97zm22.939 0c-.888 0-1.623.302-2.206.906-.584.595-.871 1.346-.871 2.235 0 .89.287 1.631.87 2.235.584.605 1.32.907 2.207.907 1.082 0 2.037-.553 2.544-1.424l-1.006-.596c-.279.527-.862.854-1.538.854-.575 0-1.04-.18-1.395-.552-.347-.37-.524-.846-.524-1.424 0-.587.177-1.062.524-1.433.355-.37.82-.552 1.395-.552.676 0 1.242.32 1.538.863l1.006-.595c-.507-.872-1.47-1.424-2.544-1.424zm-9.078 0c-.551 0-1.032.164-1.426.492-.394.319-.587.759-.587 1.303 0 .552.202.966.578 1.243.385.267.718.396 1.269.56.499.139.84.268 1.033.389.192.112.289.276.289.492 0 .371-.307.638-.98.638-.701 0-1.173-.31-1.41-.923l-1.032.596c.341.923 1.19 1.493 2.406 1.493.657 0 1.19-.164 1.602-.492.411-.328.621-.768.621-1.33 0-.345-.096-.647-.227-.854-.114-.207-.394-.423-.578-.535-.087-.06-.219-.12-.385-.181-.166-.07-.298-.121-.394-.147l-.42-.138c-.455-.138-.761-.268-.927-.38-.158-.12-.237-.276-.237-.466 0-.354.306-.604.805-.604.534 0 .928.259 1.173.777l1.015-.579c-.42-.854-1.199-1.354-2.188-1.354zm-6.372 0h-1.185v4.144c0 .651.216 1.17.649 1.558.432.387.986.58 1.661.58.684 0 1.238-.193 1.67-.58.433-.388.65-.907.65-1.558v-4.144H16.04v4.047c0 .643-.355 1.048-1.125 1.048s-1.125-.405-1.125-1.048v-4.047zM11.614 6.33H5.218v2.095h3.973L5 19.908v1.965h6.614v-2.096H7.336L11.614 8.1V6.33zm3.307 0h-2.315v15.542h2.315V6.33zm2.863 0h-2.202v15.542h2.274V12.53l3.505 9.343h2.157V6.33h-2.274v9.364l-3.46-9.364zM28.314 6c-1.01 0-1.877.314-2.603.943-.8.716-1.2 1.673-1.2 2.872v8.243c0 1.199.4 2.149 1.2 2.85.726.644 1.594.965 2.602.965 1.008 0 1.876-.321 2.602-.965.8-.701 1.201-1.651 1.201-2.85v-4.91h-4.07v1.972h1.802v2.938c0 .512-.145.903-.434 1.173-.289.27-.656.406-1.1.406-.446 0-.801-.132-1.068-.395-.312-.277-.467-.672-.467-1.184V9.815c0-.512.155-.906.467-1.184.267-.263.622-.395 1.067-.395.445 0 .812.135 1.101.406.29.27.434.661.434 1.173v.789h2.268v-.79c0-1.198-.4-2.155-1.2-2.871C30.188 6.314 29.32 6 28.312 6z'
                                 />
                              </g>
                           </svg>
                        </button>
                     </Popover>
                  )}
               </div>
            </div>
         </div>
         <div className='px-3 sm:px-8 lg:px-14'>
            {/* Bài hát nổi bật */}
            <div className='flex items-center justify-between mt-12 mb-5'>
               <h2 className='text-xl font-bold'>{sections[0].title}</h2>
               <Link
                  href={`${artistData.link}/bai-hat`}
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
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-7'>
               {playList &&
                  playList.slice(0, 6).map((item) => (
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
                                    handleClickSong(item.encodeId as string)
                                    setRecentSong((prev: any) => {
                                       if (prev.length >= 20) {
                                          return prev.includes(item as any)
                                             ? [item, ...prev.filter((i: Item) => i !== item)]
                                             : [
                                                  item,
                                                  ...prev.filter((_: any, index: number) => index !== prev.length - 1)
                                               ]
                                       } else {
                                          return prev.includes(item as any)
                                             ? [item, ...prev.filter((i: Item) => i !== item)]
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
                                 alt={item.title as string}
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
                                    className='text-white max-w-[150px] sm:max-w-[180px] truncate capitalize text-sm font-medium'
                                 >
                                    {item.title}
                                 </h3>
                                 {!item.isWorldWide && (
                                    <div className='bg-yellow-500 font-medium text-[9px] rounded-sm px-1 h-3.5 flex items-center justify-center text-white tracking-widest'>
                                       VIP
                                    </div>
                                 )}
                              </div>
                              <div className='text-xs max-w-[150px] sm:max-w-[180px] truncate'>
                                 {item.artists?.map((artist, index) => {
                                    return index === (item.artists as Artist[]).length - 1 ? (
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
                              content={
                                 library.includes(item.encodeId as string) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'
                              }
                           >
                              <button
                                 onClick={(e) => handleAddLibrary(e, item.encodeId as string, null, item)}
                                 className={`hover:bg-white text-white hover:bg-opacity-10 rounded-full p-1.5 ${
                                    library.includes(item.encodeId as string) && '!text-tprimary'
                                 }`}
                              >
                                 {library.includes(item.encodeId as string) ? (
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
                        <span className='group-hover:hidden'>{timeFormatter(item.duration as number)}</span>
                     </li>
                  ))}
            </ul>
            {/* Single & EP */}
            <h2 className='text-xl mt-12 mb-5 font-bold'>{sections[1].title}</h2>
            <HomeList title list={sections[1].items as HomeListType[]} />
            {sections.slice(2).map((section) => {
               return ['Album', 'MV', 'Xuất hiện trong', 'Tuyển tập'].includes(section.title) ? (
                  <>
                     {section.title === 'MV' ? (
                        <>
                           <h2 className='text-xl mt-12 mb-5 font-bold'>{section?.title}</h2>
                           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
                              {section?.items.slice(0, 4).map((item: Item) => (
                                 <MvArtistItem item={item} key={item.encodeId} />
                              ))}
                           </div>
                        </>
                     ) : (
                        <>
                           <h2 className='text-xl mt-12 mb-5 font-bold'>{section?.title}</h2>
                           <HomeList title list={section?.items as HomeListType[]} />
                        </>
                     )}
                  </>
               ) : (
                  <>
                     <h2 className='text-xl mt-12 mb-5 font-bold'>{section?.title}</h2>
                     <div className='grid sm:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7'>
                        {section?.items.slice(0, 4).map((artist) => (
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
                                 {formatNumberWithK(artist.totalFollow as number)} quan tâm
                              </span>
                              <button
                                 onClick={() => handleClickFollow(artist.id as string, artist as Artist)}
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
                        ))}
                     </div>
                  </>
               )
            })}
            {/* Về tác giả */}
            {artistData.biography && (
               <>
                  <h2 className='text-xl mt-12 mb-5 font-bold'>Về {artistData.name}</h2>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-7'>
                     <div className='h-[297px] relative'>
                        <Image
                           src={artistData.thumbnailM}
                           fill
                           alt={artistData.name}
                           style={{
                              objectPosition: '50% 20%'
                           }}
                           className='w-full h-full object-cover rounded-lg'
                        />
                     </div>
                     <div>
                        <p className='mb-12'>
                           <span
                              className='text-secondary'
                              dangerouslySetInnerHTML={{
                                 __html: DOMPurify.sanitize(
                                    artistData.biography.length > 355
                                       ? `${artistData.biography.slice(0, 355)}... `
                                       : artistData.biography
                                 )
                              }}
                           />
                           {artistData.biography.length > 355 && (
                              <button
                                 onClick={() => setIsOpenModalArtist(true)}
                                 className='text-xs font-bold hover:underline'
                              >
                                 XEM THÊM
                              </button>
                           )}
                        </p>
                        <div className='flex items-center gap-x-12'>
                           <div className='flex flex-col'>
                              <span className='text-xl font-bold'>{formatNumberWithDot(artistData.totalFollow)}</span>
                              <span className='text-secondary'>Người quan tâm</span>
                           </div>
                           {artistData.awards && (
                              <Popover
                                 renderPopover={
                                    <div className='bg-[#333] text-xs rounded px-2 py-1'>
                                       {artistData.awards.map((item) => (
                                          <p key={item}>{item}</p>
                                       ))}
                                    </div>
                                 }
                              >
                                 <button className='w-[41px] h-11'>
                                    <svg width='100%' height='100%' viewBox='0 0 38 40'>
                                       <g fill='none' fillRule='evenodd'>
                                          <path
                                             fill='currentColor'
                                             d='M37.838 0v40H0V0h37.838zM6.645 30.47L5 33.778l3.307-.008-1.662-3.298zm11.905 0l-2.307 1.66 2.315 1.647-.008-3.306zm-2.317 0l-.32.001.01 3.306h.32l-.01-3.306zm-6.344 0h-.26l.942 3.307h.297l.913-2.98.91 2.98h.296l.941-3.306h-.26l-.834 2.97-.909-2.97h-.292l-.904 2.97-.84-2.97zm12.254 0h-1.27v3.307h.244v-1.355h1.017l.773 1.355h.28l-.8-1.388c.207-.057.373-.17.506-.345.133-.175.203-.374.203-.596 0-.269-.092-.496-.281-.69-.189-.193-.41-.287-.672-.287zm4.349 0h-1.32v3.307h1.32c.477 0 .873-.16 1.184-.477.316-.32.472-.713.472-1.176 0-.463-.156-.855-.472-1.172-.311-.32-.707-.481-1.184-.481zm4.457 0c-.29 0-.528.078-.724.239-.19.155-.286.361-.286.623 0 .16.053.293.11.389.057.092.205.192.295.247.043.028.114.06.205.096l.21.078.238.074c.295.091.514.183.652.279.138.096.21.229.21.408 0 .38-.3.64-.838.64-.534 0-.881-.247-1-.645l-.22.124c.153.462.605.755 1.22.755.328 0 .595-.077.795-.238.2-.16.3-.375.3-.641 0-.261-.1-.458-.343-.6-.119-.073-.229-.128-.333-.17-.1-.04-.243-.091-.429-.15-.29-.092-.495-.18-.624-.266-.128-.087-.19-.216-.19-.39 0-.361.295-.618.752-.618.414 0 .7.183.857.554l.215-.114c-.172-.399-.553-.673-1.072-.673zm-4.457.237c.406 0 .742.137 1.003.41.261.27.392.606.392 1.007 0 .402-.13.737-.392 1.011-.26.27-.597.406-1.003.406h-1.054v-2.834zm-4.349 0c.198 0 .364.07.502.217s.207.321.207.524c0 .204-.07.378-.207.525-.138.142-.304.212-.502.212h-1.026v-1.478zm3.029-7.511h-1.323v6.283h1.323v-6.283zm-18.87 0H5v6.283h1.266v-4.066l1.807 2.908h.147l1.807-2.917v4.075h1.256v-6.283H9.981l-1.835 2.97-1.844-2.97zm22.939 0c-.888 0-1.623.302-2.206.906-.584.595-.871 1.346-.871 2.235 0 .89.287 1.631.87 2.235.584.605 1.32.907 2.207.907 1.082 0 2.037-.553 2.544-1.424l-1.006-.596c-.279.527-.862.854-1.538.854-.575 0-1.04-.18-1.395-.552-.347-.37-.524-.846-.524-1.424 0-.587.177-1.062.524-1.433.355-.37.82-.552 1.395-.552.676 0 1.242.32 1.538.863l1.006-.595c-.507-.872-1.47-1.424-2.544-1.424zm-9.078 0c-.551 0-1.032.164-1.426.492-.394.319-.587.759-.587 1.303 0 .552.202.966.578 1.243.385.267.718.396 1.269.56.499.139.84.268 1.033.389.192.112.289.276.289.492 0 .371-.307.638-.98.638-.701 0-1.173-.31-1.41-.923l-1.032.596c.341.923 1.19 1.493 2.406 1.493.657 0 1.19-.164 1.602-.492.411-.328.621-.768.621-1.33 0-.345-.096-.647-.227-.854-.114-.207-.394-.423-.578-.535-.087-.06-.219-.12-.385-.181-.166-.07-.298-.121-.394-.147l-.42-.138c-.455-.138-.761-.268-.927-.38-.158-.12-.237-.276-.237-.466 0-.354.306-.604.805-.604.534 0 .928.259 1.173.777l1.015-.579c-.42-.854-1.199-1.354-2.188-1.354zm-6.372 0h-1.185v4.144c0 .651.216 1.17.649 1.558.432.387.986.58 1.661.58.684 0 1.238-.193 1.67-.58.433-.388.65-.907.65-1.558v-4.144H16.04v4.047c0 .643-.355 1.048-1.125 1.048s-1.125-.405-1.125-1.048v-4.047zM11.614 6.33H5.218v2.095h3.973L5 19.908v1.965h6.614v-2.096H7.336L11.614 8.1V6.33zm3.307 0h-2.315v15.542h2.315V6.33zm2.863 0h-2.202v15.542h2.274V12.53l3.505 9.343h2.157V6.33h-2.274v9.364l-3.46-9.364zM28.314 6c-1.01 0-1.877.314-2.603.943-.8.716-1.2 1.673-1.2 2.872v8.243c0 1.199.4 2.149 1.2 2.85.726.644 1.594.965 2.602.965 1.008 0 1.876-.321 2.602-.965.8-.701 1.201-1.651 1.201-2.85v-4.91h-4.07v1.972h1.802v2.938c0 .512-.145.903-.434 1.173-.289.27-.656.406-1.1.406-.446 0-.801-.132-1.068-.395-.312-.277-.467-.672-.467-1.184V9.815c0-.512.155-.906.467-1.184.267-.263.622-.395 1.067-.395.445 0 .812.135 1.101.406.29.27.434.661.434 1.173v.789h2.268v-.79c0-1.198-.4-2.155-1.2-2.871C30.188 6.314 29.32 6 28.312 6z'
                                          />
                                       </g>
                                    </svg>
                                 </button>
                              </Popover>
                           )}
                        </div>
                     </div>
                  </div>
               </>
            )}
         </div>
         <ModalArtist
            thumbnail={artistData.thumbnail}
            name={artistData.name}
            biography={artistData.biography}
            isOpen={isOpenModalArtist}
            setIsOpen={setIsOpenModalArtist}
         />
         <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </div>
   )
}
