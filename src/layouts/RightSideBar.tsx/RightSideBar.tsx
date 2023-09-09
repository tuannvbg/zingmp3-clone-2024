'use client'
import Tooltip from '@/components/Tooltip/Tooltip'
import { toast } from 'react-toastify'
import { AppContext } from '@/contexts/app.context'
import useAddLibrary from '@/hooks/useAddLibrary'
import usePlayMusic from '@/hooks/usePlayMusic'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState, Fragment } from 'react'

export default function RightSideBar() {
   const {
      openSideBarRight,
      playList,
      currentSongId,
      isLoadingSong,
      setAtAlbum,
      isPlaying,
      setPlayList,
      setCurrentSongId,
      setOpenSideBarRight,
      recentSong,
      albumInfo,
      setRecentSong,
      audio,
      setAudio
   } = useContext(AppContext)
   const { library, handleAddLibrary } = useAddLibrary()
   const [status, setStatus] = useState<'list' | 'recent'>('list')
   const { handleClickSong } = usePlayMusic()

   //xoá danh sách phát
   const handleDeletePlaylist = () => {
      localStorage.removeItem('currentSongId')
      localStorage.removeItem('playList')
      setOpenSideBarRight(false)
      audio?.pause()
      setAudio(null)
      setCurrentSongId('')
      setPlayList(null)
      toast.success('Xoá danh sách phát thành công')
   }

   return (
      <div
         className={`${
            openSideBarRight ? 'translate-x-0' : 'translate-x-full'
         } w-full max-w-[330px] transition-all overflow-y-auto overflow-x-hidden ease-linear duration-500 fixed right-0 top-0 bottom-[116px] md:bottom-[90px] z-50 bg-rightsidebar shadow-[0_1px_0_rgba(0,0,0,0.3),0_1px_6px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(25,255,255,0.05)]`}
      >
         <header className='px-2 py-[18px] sticky top-0 bg-rightsidebar z-[100] flex items-center gap-x-2'>
            <div className='flex items-center p-[3px] text-xs bg-white bg-opacity-10 rounded-full flex-1'>
               <button
                  onClick={() => setStatus('list')}
                  className={`py-1.5 flex-1 ${
                     status === 'list' ? 'bg-white bg-opacity-25 rounded-full' : 'text-grayDa'
                  }`}
               >
                  Danh sách phát
               </button>
               <button
                  onClick={() => setStatus('recent')}
                  className={`py-1.5 flex-1 ${
                     status === 'recent' ? 'bg-white bg-opacity-25 rounded-full' : 'text-grayDa'
                  }`}
               >
                  Nghe gần đây
               </button>
            </div>
            <Tooltip bottomLeft content='Xoá danh sách phát'>
               <button onClick={handleDeletePlaylist} className='p-2 bg-white bg-opacity-10 rounded-full'>
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
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                     />
                  </svg>
               </button>
            </Tooltip>
         </header>
         {status === 'list' ? (
            playList && playList?.length > 0 ? (
               <ul className='px-2'>
                  {playList.map((item) => {
                     return item.isWorldWide ? (
                        <Fragment key={item.encodeId}>
                           <li
                              className={`flex group hover:bg-white hover:bg-opacity-10  select-none ${
                                 currentSongId === item.encodeId && 'bg-white bg-opacity-10'
                              } rounded-md items-center text-xs p-2.5`}
                           >
                              <div className='w-full flex items-center gap-x-2'>
                                 <div
                                    onClick={() => {
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
                                          className='max-w-[200px] truncate capitalize text-sm font-medium'
                                       >
                                          {item.title}
                                       </h3>
                                    </div>
                                    <div className='text-xs max-w-[200px] truncate text-secondary'>
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
                                             <Link
                                                href={artist.link}
                                                key={artist.id}
                                                className='isHover cursor-pointer hover:underline'
                                             >
                                                {`${artist.name}, `}
                                             </Link>
                                          )
                                       })}
                                    </div>
                                 </div>
                              </div>
                              <div className='hidden group-hover:flex items-center'>
                                 <Tooltip
                                    left
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
                              </div>
                           </li>
                           {currentSongId === item.encodeId && (
                              <div className='px-2 pt-3 pb-1 flex flex-col'>
                                 <span className='font-bold'>Tiếp theo</span>
                                 <span className='text-secondary'>
                                    Từ playlist{' '}
                                    <Link href={albumInfo.link} className='text-tprimary font-semibold'>
                                       {albumInfo.title}
                                    </Link>
                                 </span>
                              </div>
                           )}
                        </Fragment>
                     ) : null
                  })}
               </ul>
            ) : (
               <div className='text-center text-secondary'>
                  <Image
                     src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-mv-dark.png'}
                     alt=''
                     width={120}
                     height={120}
                     className='w-[120px] h-[120px] object-cover mx-auto'
                  />
                  Danh sách phát trống
               </div>
            )
         ) : recentSong && recentSong.length > 0 ? (
            <ul className='px-2'>
               {recentSong?.map((item) => (
                  <li
                     key={item.encodeId}
                     className={`flex group hover:bg-white hover:bg-opacity-10  select-none ${
                        currentSongId === item.encodeId && 'bg-white bg-opacity-10'
                     } rounded-md items-center text-xs p-2.5`}
                  >
                     <div className='w-full flex items-center gap-x-2'>
                        <div
                           onClick={() => {
                              setAtAlbum(true)
                              handleClickSong(item.encodeId)
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
                              <h3 title={item.title} className='max-w-[200px] truncate capitalize text-sm font-medium'>
                                 {item.title}
                              </h3>
                           </div>
                           <div className='text-xs max-w-[200px] truncate text-secondary'>
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
                                    <Link
                                       href={artist.link}
                                       key={artist.id}
                                       className='isHover cursor-pointer hover:underline'
                                    >
                                       {`${artist.name}, `}
                                    </Link>
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
                     </div>
                  </li>
               ))}
            </ul>
         ) : (
            <div className='text-center text-secondary'>
               <Image
                  src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-mv-dark.png'}
                  alt=''
                  width={120}
                  height={120}
                  className='w-[120px] h-[120px] object-cover mx-auto'
               />
               Không có bài hát nào gần đây
            </div>
         )}
      </div>
   )
}
