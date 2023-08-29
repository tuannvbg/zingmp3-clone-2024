'use client'
import { AppContext } from '@/contexts/app.context'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useContext } from 'react'

export default function SearchLayout({ children }: { children: React.ReactNode }) {
   const { currentSongId } = useContext(AppContext)
   const pathname = usePathname()
   const isActive = pathname.split('/')[2]
   const searchParams = useSearchParams()
   const keyword = searchParams.get('q')

   const Links: {
      title: string
      url: string
      active: string
   }[] = [
      {
         title: 'TẤT CẢ',
         url: `/tim-kiem/tat-ca?q=${keyword}`,
         active: 'tat-ca'
      },
      {
         title: 'BÀI HÁT',
         url: `/tim-kiem/bai-hat?q=${keyword}`,
         active: 'bai-hat'
      },
      {
         title: 'PLAYLIST/ALBUM',
         url: `/tim-kiem/playlist?q=${keyword}`,
         active: 'playlist'
      },
      {
         title: 'NGHỆ SĨ/OA',
         url: `/tim-kiem/artist?q=${keyword}`,
         active: 'artist'
      },
      {
         title: 'MV',
         url: `/tim-kiem/video?q=${keyword}`,
         active: 'video'
      }
   ]

   return (
      <div className={`mt-[70px] px-14 ${currentSongId ? 'pb-28' : 'pb-10'}`}>
         <div className='flex items-center border-b border-b-gray-800 mb-7'>
            <h1 className='text-2xl font-bold pr-5 border-r border-r-gray-800'>Kết Quả Tìm Kiếm</h1>
            <div className='flex items-center gap-x-10 ml-5'>
               {Links.map((item) => (
                  <Link
                     className={`text-grayDa hover:text-white ${
                        isActive === item.active ? 'border-b-2 py-3 border-b-tprimary' : 'py-3.5'
                     }`}
                     key={item.title}
                     href={item.url}
                  >
                     {item.title}
                  </Link>
               ))}
            </div>
         </div>
         {children}
      </div>
   )
}
