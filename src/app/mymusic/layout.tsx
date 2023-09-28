'use client'
import { AppContext } from '@/contexts/app.context'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

export default function MyMusicLayout({ children }: { children: React.ReactNode }) {
   const { currentSongId, profile } = useContext(AppContext)
   const pathname = usePathname()
   const isActive = pathname.split('/')[2]

   const Links: {
      title: string
      url: string
      active: string
   }[] = [
      {
         title: 'BÀI HÁT',
         url: `/mymusic/song`,
         active: 'song'
      },
      {
         title: 'PLAYLIST/ALBUM',
         url: `/mymusic/playlist`,
         active: 'playlist'
      },
      {
         title: 'NGHỆ SĨ/OA',
         url: `/mymusic/artist`,
         active: 'artist'
      },
      {
         title: 'MV',
         url: `/mymusic/video`,
         active: 'video'
      },
      {
         title: 'THÔNG TIN',
         url: `/mymusic/profile`,
         active: 'profile'
      }
   ]

   return (
      <div className={`mt-[70px] px-3 sm:px-8 lg:px-14 ${currentSongId ? 'pb-36 md:pb-28' : 'pb-20 md:pb-16'}`}>
         <div className='pt-7 flex flex-col gap-y-3 items-center'>
            <div className='w-40 h-40 rounded-full overflow-hidden border-4 border-tprimary'>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                  alt='avatar'
                  width={160}
                  height={160}
                  className='w-full h-full object-cover hover:scale-110 transition-all duration-500'
                  src={
                     profile?.avatar
                        ? `https://api-ecom.duthanhduoc.com/images/${profile?.avatar}`
                        : 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.67/static/media/user-default.3ff115bb.png'
                  }
               />
            </div>
            <span className='text-xl font-semibold'>{profile?.name || profile?.email}</span>
         </div>
         <div className='mt-6 flex justify-center flex-col gap-y-5 md:flex-row md:gap-0 items-center'>
            <ul className='hidden sm:flex items-center text-[13px] bg-white bg-opacity-10 px-1 py-2 rounded-full gap-3'>
               {Links.map((item) => (
                  <li key={item.title}>
                     <Link
                        className={` px-6 py-1.5 ${
                           item.active === isActive
                              ? 'bg-white bg-opacity-30 rounded-full'
                              : 'text-grayDa isHover transition-all'
                        }`}
                        href={item.url}
                     >
                        {item.title}
                     </Link>
                  </li>
               ))}
            </ul>
            <ul className='flex sm:hidden items-center text-[13px] bg-white bg-opacity-10 px-1 py-1 md:py-2 rounded-full gap-3'>
               {Links.slice(0, 2).map((item) => (
                  <li key={item.title}>
                     <Link
                        className={`px-4 py-1 md:px-6 md:py-1.5 ${
                           item.active === isActive
                              ? 'bg-white bg-opacity-30 rounded-full'
                              : 'text-grayDa isHover transition-all'
                        }`}
                        href={item.url}
                     >
                        {item.title}
                     </Link>
                  </li>
               ))}
            </ul>
            <ul className='flex sm:hidden items-center text-[13px] bg-white bg-opacity-10 px-1 py-1 md:py-2 rounded-full gap-3'>
               {Links.slice(2).map((item) => (
                  <li key={item.title}>
                     <Link
                        className={`px-4 py-1 md:px-6 md:py-1.5 ${
                           item.active === isActive
                              ? 'bg-white bg-opacity-30 rounded-full'
                              : 'text-grayDa isHover transition-all'
                        }`}
                        href={item.url}
                     >
                        {item.title}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
         {children}
      </div>
   )
}
