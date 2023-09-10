'use client'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/perspective-extreme.css'
import { AppContext } from '@/contexts/app.context'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Tooltip from '../Tooltip/Tooltip'
import { useQuery } from '@tanstack/react-query'
import { getInfoSong, getLyric } from '@/apis/home.api'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import Loading from '../Loading/Loading'
import ItemLyric from '../ItemLyric/ItemLyric'
import Link from 'next/link'
import useInfoSong from '@/hooks/useInfoSong'
export default function Lyric() {
   const { isShowLyric, setIsShowLyric, currentSongId } = useContext(AppContext)
   const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
   const [openSetting, setOpenSetting] = useState<boolean>(false)
   const [isChecked, setIsChecked] = useState<boolean>(false)
   const [textSize, setTextSize] = useState<number>(1)
   const { infoSong } = useInfoSong()

   const thumbnailM = infoSong?.thumbnailM
   const name = infoSong?.title
   const artists = infoSong?.artists
   // Toggle full screen
   const toggleShowScreen = () => {
      if (!document.fullscreenElement) {
         document.documentElement.requestFullscreen()
         setIsFullScreen(true)
      } else if (document.exitFullscreen) {
         document.exitFullscreen()
         setIsFullScreen(false)
      }
   }

   //lấy data lyric
   const { data, isLoading } = useQuery({
      queryKey: ['lyric', currentSongId],
      queryFn: () => getLyric({ id: currentSongId }),
      enabled: Boolean(currentSongId)
   })
   const lyrics = data?.data.data?.sentences
   const imgBgViewFull = data?.data.data?.defaultIBGUrls

   useEffect(() => {
      if (isShowLyric) {
         document.body.classList.add('hide-scrollbar')
      } else {
         document.body.classList.remove('hide-scrollbar')
      }
   }, [isShowLyric])
   return (
      <div
         className={`fixed inset-0 bg-modal z-[1000] transition-all duration-500 ${
            isShowLyric ? 'translate-y-0' : 'translate-y-full'
         }`}
      >
         {isChecked && (
            <ul className='w-full h-full z-0 opacity-80 absolute inset-0 overflow-hidden'>
               <Swiper
                  effect={'fade'}
                  modules={[EffectFade, Navigation, Pagination, Autoplay]}
                  autoplay={{
                     delay: 8800,
                     disableOnInteraction: false
                  }}
                  className='h-full w-full'
                  loop={true}
                  speed={1200}
               >
                  {imgBgViewFull?.map((img, index) => (
                     <SwiperSlide key={index}>
                        <li className='relative h-full w-full'>
                           <Image src={img} className='w-full h-full object-cover' fill alt='' />
                        </li>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </ul>
         )}
         <header className='flex items-center justify-between min-[900px]:justify-end h-[76px] px-5'>
            <div className='flex relative z-20 items-center min-[900px]:hidden gap-x-3'>
               <Image
                  alt={name as string}
                  src={thumbnailM as string}
                  width={50}
                  height={50}
                  className='w-[50px] h-[50px] rounded-full object-cover'
               />
               <div className='flex flex-col'>
                  <span>{name}</span>
                  <div className='text-secondary text-xs my-1'>
                     {artists?.map((artist, index) => {
                        return index === artists.length - 1 ? (
                           <Link
                              href={artist.link}
                              key={artist.id}
                              className='text-secondary isHover cursor-pointer hover:underline'
                           >
                              {artist.name}
                           </Link>
                        ) : (
                           <Link
                              href={artist.link}
                              key={artist.id}
                              className='text-secondary isHover cursor-pointer hover:underline'
                           >
                              {`${artist.name}, `}
                           </Link>
                        )
                     })}
                  </div>
               </div>
            </div>
            <h1 className='text-2xl font-bold mr-[30%] relative hidden min-[900px]:block'>Lời bài hát</h1>
            <div className='flex items-center gap-x-3'>
               <Tooltip bottomCenter content={isFullScreen ? 'Thoát' : 'Toàn màn hình'}>
                  <button
                     onClick={toggleShowScreen}
                     className='hidden min-[900px]:flex items-center justify-center bg-white bg-opacity-10 w-10 h-10 rounded-full hover:bg-opacity-20'
                  >
                     {isFullScreen ? (
                        <svg
                           stroke='currentColor'
                           fill='currentColor'
                           strokeWidth={0}
                           viewBox='0 0 24 24'
                           height='18px'
                           width='18px'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path fill='none' d='M0 0h24v24H0z' />
                           <path d='M22 3.41L16.71 8.7 20 12h-8V4l3.29 3.29L20.59 2 22 3.41zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59 3.41 22z' />
                        </svg>
                     ) : (
                        <svg
                           stroke='currentColor'
                           fill='currentColor'
                           strokeWidth={0}
                           viewBox='0 0 24 24'
                           height='18px'
                           width='18px'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <path fill='none' d='M0 0h24v24H0z' />
                           <path d='M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10z' />
                        </svg>
                     )}
                  </button>
               </Tooltip>
               <Tippy
                  animation={'perspective-extreme'}
                  onClickOutside={() => setOpenSetting(false)}
                  visible={openSetting}
                  interactive={true}
                  arrow={false}
                  content={
                     <PortalSetting
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        textSize={textSize}
                        setTextSize={setTextSize}
                     />
                  }
                  placement={'bottom-end'}
                  offset={[0, 12]}
               >
                  <div>
                     <Tooltip bottomCenter content='Cài đặt'>
                        <button
                           onClick={() => setOpenSetting((value) => !value)}
                           className='flex items-center justify-center bg-white bg-opacity-10 w-10 h-10 rounded-full hover:bg-opacity-20'
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
                                 d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z'
                              />
                              <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                           </svg>
                        </button>
                     </Tooltip>
                  </div>
               </Tippy>

               <Tooltip bottomCenter content='Đóng'>
                  <button
                     onClick={() => setIsShowLyric(false)}
                     className='flex items-center justify-center bg-white bg-opacity-10 w-10 h-10 rounded-full hover:bg-opacity-20'
                  >
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[18px] h-[18px]'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                     </svg>
                  </button>
               </Tooltip>
            </div>
         </header>

         <div className='flex z-10 absolute left-0 right-0 bottom-[90px] top-[76px] items-center p-10 gap-x-24'>
            {isLoading ? (
               <Loading />
            ) : (
               <>
                  <div className='hidden min-[900px]:block w-[30%] aspect-square relative overflow-hidden rounded-lg'>
                     <Image
                        alt={name as string}
                        src={thumbnailM as string}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <ul
                     className={`w-full min-[900px]:w-[70%] h-[calc(100vh-166px)] overflow-auto transition-all duration-500 ${
                        textSize === 1 ? 'text-3xl' : textSize === 2 ? 'text-[35px]' : 'text-[40px]'
                     } leading-loose font-semibold`}
                  >
                     {lyrics
                        ? lyrics.map((lyric, index) => <ItemLyric key={index} lyric={lyric} />)
                        : 'KHÔNG CÓ LỜI BÀI HÁT'}
                  </ul>
               </>
            )}
         </div>
      </div>
   )
}

interface Props {
   isChecked: boolean
   setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
   textSize: number
   setTextSize: React.Dispatch<React.SetStateAction<number>>
}

function PortalSetting({ isChecked, setIsChecked, textSize, setTextSize }: Props) {
   return (
      <div className='bg-[#333] text-white rounded-lg p-3'>
         <div className='flex items-center justify-between gap-x-4'>
            <span className='font-semibold'>Hình nền</span>
            <label className='cursor-pointer'>
               <input
                  type='checkbox'
                  defaultChecked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className='hidden'
               />
               <span
                  className={`rounded-full relative w-8 inline-block h-4 ${isChecked ? 'bg-blue-500' : 'bg-gray-500'}`}
               >
                  <span
                     className={`inline-block w-3.5 transition-all duration-300 absolute translate-y-[1px] h-3.5 bg-white rounded-full ${
                        isChecked ? 'left-full -translate-x-full' : 'left-[1px]'
                     }`}
                  />
               </span>
            </label>
         </div>
         <div className='flex items-center justify-between mt-3 gap-x-4'>
            <span className='font-semibold'>Cỡ chữ lời nhạc</span>
            <div className='flex items-center gap-x-2'>
               <button
                  onClick={() => setTextSize(1)}
                  className={`w-6 text-[10px] h-6 flex items-center justify-center rounded-full ${
                     textSize === 1 ? 'bg-tprimary' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  }`}
               >
                  A
               </button>
               <button
                  onClick={() => setTextSize(2)}
                  className={`w-6 h-6 text-xs font-medium flex items-center justify-center rounded-full ${
                     textSize === 2 ? 'bg-tprimary' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  }`}
               >
                  A
               </button>
               <button
                  onClick={() => setTextSize(3)}
                  className={`w-6 h-6 font-semibold flex items-center justify-center rounded-full ${
                     textSize === 3 ? 'bg-tprimary' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  }`}
               >
                  A
               </button>
            </div>
         </div>
      </div>
   )
}
