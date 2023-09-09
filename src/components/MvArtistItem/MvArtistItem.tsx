import { AppContext } from '@/contexts/app.context'
import { Item } from '@/types/artist.type'
import { timeFormatter } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import Modal from '../Modal/Modal'

export default function MvArtistItem({ item }: { item: Item }) {
   const { currentIdVideo } = useContext(AppContext)
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal
   const router = useRouter()
   return (
      <>
         <li>
            <button
               onClick={() => {
                  if (item.streamingStatus === 2) {
                     setIsOpenModal(true)
                  } else {
                     router.push(item.link)
                  }
               }}
               className='aspect-video w-full relative group overflow-hidden rounded-lg'
            >
               <Image
                  src={item.thumbnailM}
                  alt={item.title as string}
                  fill
                  className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
               />
               {currentIdVideo === item.encodeId ? (
                  <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center font-semibold text-base'>
                     Đang phát
                  </div>
               ) : (
                  <div className='absolute inset-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-11 h-11 border-2 border-white p-2 rounded-full'
                     >
                        <path
                           fillRule='evenodd'
                           d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                           clipRule='evenodd'
                        />
                     </svg>
                  </div>
               )}
               {item.streamingStatus === 2 && (
                  <div className='absolute top-1 left-1 bg-yellow-500 py-0.5 px-1 rounded text-white font-semibold text-xs'>
                     VIP
                  </div>
               )}
               <div className='absolute z-20 right-1 text-xs p-1 rounded font-medium bottom-1 bg-black bg-opacity-80 text-white'>
                  {timeFormatter(item.duration as number)}
               </div>
            </button>
            {item.artists && (
               <div className='mt-4 flex items-center gap-x-3'>
                  <Image
                     src={item.artists[0].thumbnail}
                     alt={item.artists[0].name}
                     width={40}
                     height={40}
                     className='w-10 h-10 object-cover rounded-full'
                  />
                  <div className='flex flex-col'>
                     <Link href={item.link} className='font-medium isHover'>
                        {item.title}
                     </Link>
                     <div className='text-secondary text-xs my-1'>
                        {item.artists.map((artist, index) => {
                           return index === (item.artists || []).length - 1 ? (
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
            )}
         </li>
         <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </>
   )
}
