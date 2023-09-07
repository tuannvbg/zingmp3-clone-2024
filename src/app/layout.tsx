import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactQueryProvider } from './ReactQueryProvider'
import LeftSideBar from '@/layouts/LeftSideBar/LeftSideBar'
import RightSideBar from '@/layouts/RightSideBar.tsx/RightSideBar'
import Header from '@/layouts/Header/Header'
import { AppProvider } from '@/contexts/app.context'
import PlayerControl from '@/layouts/PlayerControl/PlayerControl'
import Lyric from '@/components/Lyric/Lyric'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Zing MP3 - Nghe nhạc mới, HOT nhất và tải nhạc miễn phí',
   description:
      'Tận hưởng âm nhạc chất lượng cao 320kbps miễn phí với hàng triệu bài hát mới, playlist nhạc HOT, bảng xếp hạng #zingchart.',
   openGraph: {
      images: 'https://static-zmp3.zadn.vn/skins/common/logo600.png'
   }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <ReactQueryProvider>
         <AppProvider>
            <html lang='en'>
               <body className={inter.className}>
                  <LeftSideBar />
                  {/* LeftSideBar + RightSideBar = 450px */}
                  <div className='min-[900px]:w-[calc(100vw-72.5px)] xl:w-[calc(100vw-242.5px)] w-full min-[900px]:float-right'>
                     <Header />
                     {children}
                  </div>
                  <RightSideBar />
                  <PlayerControl />
                  <Lyric />
                  <ToastContainer autoClose={2000} position='top-center' />
               </body>
            </html>
         </AppProvider>
      </ReactQueryProvider>
   )
}
