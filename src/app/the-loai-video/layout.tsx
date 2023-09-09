'use client'
import { AppContext } from '@/contexts/app.context'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
const Links: {
   title: string
   url: string
   active: string
}[] = [
   {
      title: 'VIỆT NAM',
      url: '/the-loai-video/Viet-Nam/IWZ9Z08I.html',
      active: 'IWZ9Z08I'
   },
   {
      title: 'US-UK',
      url: `/the-loai-video/Au-My/IWZ9Z08O.html`,
      active: 'IWZ9Z08O'
   },
   {
      title: 'KPOP',
      url: `/the-loai-video/Han-Quoc/IWZ9Z08W.html`,
      active: 'IWZ9Z08W'
   },
   {
      title: 'HOÀ TẤU',
      url: `/the-loai-video/Khong-Loi/IWZ9Z086.html`,
      active: 'IWZ9Z086'
   }
]
export default function MVLayout({ children }: { children: React.ReactNode }) {
   const { currentSongId } = useContext(AppContext)
   const pathname = usePathname()
   const isActive = pathname.split('/')[3].replace('.html', '')

   return (
      <div className={`mt-[70px] px-3 sm:px-8 lg:px-14 ${currentSongId ? 'pb-36 md:pb-28' : 'pb-20 md:pb-16'}`}>
         <div className='flex items-center border-b border-b-gray-700 mb-7'>
            <h1 className='text-2xl font-bold hidden min-[900px]:block pr-5 border-r border-r-gray-700'>MV</h1>
            <div className='flex flex-wrap items-center gap-x-10 ml-5'>
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
         </div>
         {children}
      </div>
   )
}
