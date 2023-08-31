'use client'
import { AppContext } from '@/contexts/app.context'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useContext } from 'react'

export default function MyMusicLayout({ children }: { children: React.ReactNode }) {
   const { currentSongId, profile } = useContext(AppContext)
   const pathname = usePathname()
   const isActive = pathname.split('/')[2]
   const searchParams = useSearchParams()

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
      <div className={`mt-[70px] px-14 ${currentSongId ? 'pb-28' : 'pb-10'}`}>
         <div className='pt-7 flex flex-col gap-y-3 items-center'>
            <div className='w-40 h-40 rounded-full overflow-hidden border-4 border-tprimary'>
               <Image
                  alt='avatar'
                  width={160}
                  height={160}
                  className='w-full h-full object-cover hover:scale-110 transition-all duration-500'
                  src='https://photo-zmp3.zmdcdn.me/banner/1/f/8/a/1f8a4b283b1dff9e279b4457fca3b9a2.jpg'
               />
            </div>
            <span className='text-xl font-semibold'>{profile?.name || profile?.email}</span>
         </div>
         <div className='flex mt-5 items-center justify-center gap-x-10'>
            {Links.map((item) => (
               <Link
                  className={`text-grayDa hover:text-white ${
                     isActive === item.active ? 'border-b-2 py-3 border-tprimary' : 'py-3.5'
                  }`}
                  key={item.title}
                  href={item.url}
               >
                  {item.title}
               </Link>
            ))}
         </div>
         {children}
      </div>
   )
}
