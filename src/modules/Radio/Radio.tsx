'use client'
import Loading from '@/components/Loading/Loading'
import { AppContext } from '@/contexts/app.context'
import useGetHome from '@/hooks/useGetHome'
import { RadioType } from '@/types/radio.type'
import Link from 'next/link'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'

export default function Radio() {
   const { currentSongId } = useContext(AppContext)
   const { data } = useGetHome()
   const radioList: RadioType[] = data?.data.data.items[14].items //radio nổi bật
   if (!radioList) return <Loading />
   return (
      <div className={`mt-[70px] px-3 sm:px-8 lg:px-14 ${currentSongId ? 'pb-32 md:pb-28' : 'pb-14 md:pb-10'}`}>
         <h1 className='text-[40px] font-bold py-7'>{data?.data.data.items[14].title}</h1>
         <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-7'>
            {radioList.map((item) => (
               <li key={item.id}>
                  <div className='text-center'>
                     <div onClick={() => toast.warning('Chức năng này chưa hoàn thiện')} className='relative'>
                        <div className='relative cursor-pointer group aspect-square rounded-full overflow-hidden border-[3px] border-pink-500'>
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img
                              src={item.thumbnail}
                              className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
                              alt={item.title}
                           />
                           <div
                              className={`absolute inset-0 items-center justify-center hidden group-hover:flex bg-black bg-opacity-40
               `}
                           >
                              <span className='border border-white rounded-full p-2'>
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
                              </span>
                           </div>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           src={item.host.thumbnail}
                           alt={item.host.name}
                           width={48}
                           height={48}
                           className='w-12 h-12 border-2 border-black rounded-full object-cover absolute bottom-0 right-0 translate-y-[-40%]'
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/live-tag.svg'}
                           width={32}
                           height={16}
                           alt=''
                           className='w-8 h-4 mx-auto -translate-y-1/2'
                        />
                     </div>
                     <h3 className='text-base font-bold'>{item.host.name.replace('Radio', '').trim()}</h3>
                     <span className='text-secondary text-xs'>{item.activeUsers} đang nghe</span>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   )
}
