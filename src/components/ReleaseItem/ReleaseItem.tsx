import { AppContext } from '@/contexts/app.context'
import usePlayMusic from '@/hooks/usePlayMusic'
import React, { useContext, useState } from 'react'
import Modal from '../Modal/Modal'
import { formatDateDifference } from '@/utils/utils'
import Link from 'next/link'
import Image from 'next/image'
import { All, Other } from '@/types/release.type'

export default function ReleaseItem({ item }: { item: All | Other }) {
   const { currentSongId, isLoadingSong, isPlaying, setAtAlbum, setRecentSong } = useContext(AppContext)
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal
   const { handleClickSong } = usePlayMusic()
   return (
      <div
         className={`flex hover:bg-white hover:bg-opacity-10 group rounded-md items-center gap-x-2 p-2.5 ${
            currentSongId === item.encodeId && 'bg-white bg-opacity-10'
         }`}
      >
         <div
            onClick={() => {
               if (item.isWorldWide) {
                  setAtAlbum(true)
                  setRecentSong((prev) => {
                     if (prev.length >= 20) {
                        return prev.includes(item as any)
                           ? [item, ...prev.filter((i) => i !== item)]
                           : [item, ...(prev.filter((_, index) => index !== prev.length - 1) as any)]
                     } else {
                        return prev.includes(item as any) ? [item, ...prev.filter((i) => i !== item)] : [item, ...prev]
                     }
                  })
                  handleClickSong(item.encodeId)
               } else {
                  setIsOpenModal(true)
               }
            }}
            className='relative cursor-pointer overflow-hidden w-[60px] h-[60px] flex-shrink-0 rounded'
         >
            <Image
               src={item.thumbnail}
               width={60}
               height={60}
               alt={item.title}
               className='w-full h-full object-cover'
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
               <h3 title={item.title} className='max-w-[180px] truncate capitalize text-sm font-medium'>
                  {item.title}
               </h3>
               {!item.isWorldWide && (
                  <div className='bg-yellow-500 font-medium text-[9px] rounded-sm px-1 h-3.5 flex items-center justify-center text-white tracking-widest'>
                     VIP
                  </div>
               )}
            </div>
            <div className='text-xs text-secondary'>
               {item.artists?.map((artist, index) => {
                  return index === item.artists.length - 1 ? (
                     <Link href={artist.link} key={artist.id} className='isHover cursor-pointer hover:underline'>
                        {artist.name}
                     </Link>
                  ) : (
                     <>
                        <Link href={artist.link} key={artist.id} className='isHover cursor-pointer hover:underline'>
                           {artist.name}
                        </Link>
                        ,{' '}
                     </>
                  )
               })}
            </div>
            <span className='text-xs text-secondary'>{formatDateDifference(item.releaseDate)}</span>
         </div>
         <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </div>
   )
}
