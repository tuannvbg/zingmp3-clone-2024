'use client'
import { getInfoSong, getSong } from '@/apis/home.api'
import Tooltip from '@/components/Tooltip/Tooltip'
import { AppContext } from '@/contexts/app.context'
import useAddLibrary from '@/hooks/useAddLibrary'
import { timeFormatter } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useContext, useEffect } from 'react'
import { Range, getTrackBackground } from 'react-range'
export default function PlayerControl() {
   const [currentTime, setCurrentTime] = useState<number>(0)
   const [currentVolume, setCurrentVolume] = useState<number>(100)
   const [isMuted, setIsMuted] = useState<boolean>(false)
   const [previousVolume, setPreviousVolume] = useState<number>(100)
   const [isRandomSong, setIsRandomSong] = useState<boolean>(false)
   const [isRepeat, setIsRepeat] = useState<boolean>(false)
   const { handleAddLibrary, library } = useAddLibrary()
   const {
      openSideBarRight,
      setOpenSideBarRight,
      isPlaying,
      setIsPlaying,
      currentSongId,
      setIsLoadingSong,
      audio,
      setAudio,
      atAlbum,
      playList,
      setCurrentSongId,
      setIsShowLyric,
      isShowLyric,
      setCurrentTimeAudio
   } = useContext(AppContext)

   //lấy info song
   const infoSongData = useQuery({
      queryKey: ['infoSong', currentSongId],
      queryFn: () => getInfoSong({ id: currentSongId }),
      enabled: Boolean(currentSongId)
   })

   const infoSong = infoSongData.data?.data.data

   //lấy link bài hát
   const songData = useQuery({
      queryKey: ['song', currentSongId],
      queryFn: () => getSong({ id: currentSongId }),
      enabled: Boolean(currentSongId)
   })

   const song = songData.data?.[128] //link bài hát

   useEffect(() => {
      if (song) {
         setAudio(null)
         setAudio(new Audio(song))
      }
   }, [song, setAudio])

   useEffect(() => {
      if (audio) {
         if (isPlaying) {
            audio.play()
         } else {
            audio.pause()
         }
         audio.addEventListener('timeupdate', handleTimeUpdate) // Lắng nghe sự kiện cập nhật thời gian
      }
      return () => {
         if (audio) {
            audio.removeEventListener('timeupdate', handleTimeUpdate) // Loại bỏ lắng nghe sự kiện khi component unmount
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isPlaying, audio])

   //tua bài hát
   const handleRangeChange = ([newTime]: number[]) => {
      if (audio) {
         setCurrentTime(newTime)
         audio.currentTime = newTime
      }
   }

   //sự kiện cập nhật thời gian(để thời gian chạy theo tiến trình bài hát)
   const handleTimeUpdate = () => {
      if (audio) {
         setCurrentTime(audio.currentTime)
         setCurrentTimeAudio(audio.currentTime)
      }
   }

   //tăng giảm âm lượng
   useEffect(() => {
      if (audio) {
         if (isMuted) {
            if (currentVolume > 0) {
               setPreviousVolume(currentVolume)
            }
            setCurrentVolume(0)
            audio.volume = 0
         } else {
            setCurrentVolume(previousVolume)
            audio.volume = previousVolume / 100
         }
      }
   }, [isMuted, currentVolume, previousVolume, audio])

   //next song
   const handleNextSong = () => {
      if (atAlbum && playList) {
         if (isRandomSong) {
            handleRandomSong()
         } else {
            let currentSongIndex: number = 0
            //lấy ra vị trí của bài nhạc đang phát
            const playListNoVip = playList.filter((item) => item.isWorldWide)
            playListNoVip.forEach((item, index) => {
               if (item.encodeId === currentSongId) {
                  currentSongIndex = index
               }
            })
            if (audio) {
               audio.pause() // Dừng bài hát cũ
               audio.currentTime = 0 // Đặt thời gian về đầu bài hát
            }
            setAudio(null)
            if (currentSongIndex === playListNoVip.length - 1) {
               setCurrentSongId(playListNoVip[0].encodeId)
            } else {
               setCurrentSongId(playListNoVip[currentSongIndex + 1].encodeId)
            }
            setIsPlaying(true)
            setIsLoadingSong(true)
         }
      }
   }

   //prev song
   const handlePrevSong = () => {
      if (atAlbum && playList) {
         if (isRandomSong) {
            handleRandomSong()
         } else {
            let currentSongIndex: number = 0
            //lấy ra vị trí của bài nhạc đang phát
            const playListNoVip = playList.filter((item) => item.isWorldWide)

            playListNoVip.forEach((item, index) => {
               if (item.encodeId === currentSongId) {
                  currentSongIndex = index
               }
            })
            if (audio) {
               audio.pause() // Dừng bài hát cũ
               audio.currentTime = 0 // Đặt thời gian về đầu bài hát
            }
            setAudio(null)
            if (currentSongIndex === 0) {
               setCurrentSongId(playListNoVip[playListNoVip.length - 1].encodeId)
            } else {
               setCurrentSongId(playListNoVip[currentSongIndex - 1].encodeId)
            }
            setIsPlaying(true)
            setIsLoadingSong(true)
         }
      }
   }

   //random nhạc
   const handleRandomSong = () => {
      if (isRandomSong && playList) {
         let currentSongIndex: number = 0
         let newIndex: number
         const playListNoVip = playList.filter((item) => item.isWorldWide)
         //lấy ra vị trí của bài nhạc đang phát
         playListNoVip.forEach((item, index) => {
            if (item.encodeId === currentSongId) {
               currentSongIndex = index
            }
         })

         do {
            newIndex = Math.floor(Math.random() * playListNoVip.length)
         } while (newIndex === currentSongIndex)

         currentSongIndex = newIndex

         if (audio) {
            audio.pause() // Dừng bài hát cũ
            audio.currentTime = 0 // Đặt thời gian về đầu bài hát
         }
         setAudio(null)
         setCurrentSongId(playListNoVip[currentSongIndex].encodeId)
         setIsPlaying(true)
         setIsLoadingSong(true)
      }
   }

   //phát lại nhạc
   if (audio) {
      audio.onended = () => {
         if (isRepeat) {
            audio.play()
         } else if (isRandomSong) {
            handleRandomSong()
         } else {
            handleNextSong()
         }
      }
   }

   //ẩn scrollbar của body khi mở rightsidebar
   useEffect(() => {
      if (openSideBarRight) {
         document.body.classList.add('hide-scrollbar')
      } else {
         document.body.classList.remove('hide-scrollbar')
      }
   }, [openSideBarRight])

   if (!infoSong) {
      if (currentSongId) {
         setIsLoadingSong(infoSongData.isLoading)
      }
      return null
   } else {
      setIsLoadingSong(infoSongData.isLoading)
      return (
         <div
            style={{
               backgroundPosition: '50%',
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover'
            }}
            className={`md:h-[90px] h-[61px] playerControl ${
               isShowLyric ? 'bg-transparent' : 'bg-secondary border-t border-t-gray-700'
            } p-3 md:px-5 flex items-center fixed z-[2000] left-0 right-0 bottom-[55px] md:bottom-0 md:gap-0 gap-x-2`}
         >
            {/* Detail song */}
            <div className={`md:w-[30%] w-[70%] items-center gap-x-3 ${isShowLyric ? 'hidden' : 'flex'}`}>
               <Image
                  alt={infoSong.title}
                  width={64}
                  height={64}
                  className='md:w-16 md:h-16 w-11 h-11 object-cover rounded-md'
                  src={infoSong.thumbnail}
               />
               <div className='flex flex-col'>
                  <strong className='font-medium capitalize max-w-[150px] max-[380px]:max-w-[100px] min-[500px]:max-w-[250px] truncate'>
                     {infoSong?.title}
                  </strong>
                  <span className='text-xs text-secondary truncate max-w-[150px] max-[380px]:max-w-[100px] min-[500px]:max-w-[250px]'>
                     {infoSong.artists?.map((artist, index) => {
                        return index === infoSong.artists.length - 1 ? (
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
                  </span>
               </div>
               <Tooltip content={library.includes(infoSong.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}>
                  <button
                     onClick={(e) => handleAddLibrary(e, infoSong.encodeId)}
                     className={`hover:bg-white md:block hidden hover:bg-opacity-10 rounded-full p-1.5 ${
                        library.includes(infoSong.encodeId) && 'text-tprimary'
                     }`}
                  >
                     {library.includes(infoSong.encodeId) ? (
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

            {/* main control */}
            <div className='md:w-[40%] w-[30%] mx-auto'>
               <div className='flex items-center justify-center md:gap-x-3 md:mb-2'>
                  <Tooltip content={isRandomSong ? 'Tắt phát ngẫu nhiên' : 'Bật phát ngẫu nhiên'}>
                     <button
                        disabled={!atAlbum}
                        onClick={() => setIsRandomSong((prev) => !prev)}
                        className={`p-2.5 hover:bg-white md:block hidden hover:bg-opacity-10 rounded-full disabled:text-secondary disabled:cursor-not-allowed ${
                           isRandomSong && 'text-tprimary'
                        }`}
                     >
                        <svg
                           stroke='currentColor'
                           fill='currentColor'
                           strokeWidth={0}
                           viewBox='0 0 512 512'
                           height='20'
                           width='20'
                           xmlns='http://www.w3.org/2000/svg'
                           className='w-4 h-4'
                        >
                           <path d='M504.971 359.029c9.373 9.373 9.373 24.569 0 33.941l-80 79.984c-15.01 15.01-40.971 4.49-40.971-16.971V416h-58.785a12.004 12.004 0 0 1-8.773-3.812l-70.556-75.596 53.333-57.143L352 336h32v-39.981c0-21.438 25.943-31.998 40.971-16.971l80 79.981zM12 176h84l52.781 56.551 53.333-57.143-70.556-75.596A11.999 11.999 0 0 0 122.785 96H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12zm372 0v39.984c0 21.46 25.961 31.98 40.971 16.971l80-79.984c9.373-9.373 9.373-24.569 0-33.941l-80-79.981C409.943 24.021 384 34.582 384 56.019V96h-58.785a12.004 12.004 0 0 0-8.773 3.812L96 336H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h110.785c3.326 0 6.503-1.381 8.773-3.812L352 176h32z' />
                        </svg>
                     </button>
                  </Tooltip>
                  <button
                     onClick={handlePrevSong}
                     disabled={!atAlbum}
                     className={`p-1 hover:bg-white hover:bg-opacity-10 rounded-full ${
                        !atAlbum && 'text-secondary cursor-not-allowed'
                     }`}
                  >
                     <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth={0}
                        viewBox='0 0 24 24'
                        height='1em'
                        className='w-7 h-7'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path fill='none' d='M0 0h24v24H0z' />
                        <path d='M6 6h2v12H6zm3.5 6l8.5 6V6z' />
                     </svg>
                  </button>
                  <button
                     onClick={() => setIsPlaying((prev) => !prev)}
                     className='p-1.5 mx-1.5 isHover cursor-pointer hover:border-tprimary rounded-full border-[2px] flex items-center justify-center border-tprimary'
                  >
                     {isPlaying ? (
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           fill='none'
                           viewBox='0 0 24 24'
                           strokeWidth={3}
                           stroke='currentColor'
                           className='w-5 h-5'
                        >
                           <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 5.25v13.5m-7.5-13.5v13.5' />
                        </svg>
                     ) : (
                        <svg
                           xmlns='http://www.w3.org/2000/svg'
                           viewBox='0 0 24 24'
                           fill='currentColor'
                           className='w-5 h-5 translate-x-[1px]'
                        >
                           <path
                              fillRule='evenodd'
                              d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                              clipRule='evenodd'
                           />
                        </svg>
                     )}
                  </button>
                  <button
                     onClick={handleNextSong}
                     disabled={!atAlbum}
                     className={`p-1 hover:bg-white hover:bg-opacity-10 rounded-full ${
                        !atAlbum && 'text-secondary cursor-not-allowed'
                     }`}
                  >
                     <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth={0}
                        className='w-7 h-7'
                        viewBox='0 0 24 24'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path fill='none' d='M0 0h24v24H0z' />
                        <path d='M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z' />
                     </svg>
                  </button>
                  <Tooltip content={isRepeat ? 'Tắt phát lại bài hát' : 'Bật phát lại bài hát'}>
                     <button
                        onClick={() => setIsRepeat((prev) => !prev)}
                        className={`p-2 md:block hidden hover:bg-white hover:bg-opacity-10 rounded-full ${
                           isRepeat && 'text-tprimary'
                        }`}
                     >
                        <svg
                           stroke='currentColor'
                           fill='currentColor'
                           className='w-5 h-5'
                           strokeWidth='1.5'
                           viewBox='0 0 24 24'
                           height='1em'
                           width='1em'
                           xmlns='http://www.w3.org/2000/svg'
                        >
                           <g id='Repeat'>
                              <g>
                                 <path d='M2.208,17.79a.5.5,0,0,1,0-.71l2-2a.511.511,0,0,1,.7,0,.5.5,0,0,1,0,.71l-1.15,1.15h15.19a2.272,2.272,0,0,0,1.26-.22c.89-.55.73-1.63.73-2.52V12a.5.5,0,0,1,1,0v2.76c0,1.17-.18,2.341-1.36,2.9a8.929,8.929,0,0,1-3.26.28H3.768l1.14,1.14a.5.5,0,0,1,0,.71.492.492,0,0,1-.7,0Z' />
                                 <path d='M21.792,6.21a.5.5,0,0,1,0,.71l-2,2a.511.511,0,0,1-.7,0,.5.5,0,0,1,0-.71l1.15-1.15H5.052a2.272,2.272,0,0,0-1.26.22c-.89.55-.73,1.63-.73,2.52V12a.5.5,0,0,1-1,0V9.24c0-1.17.18-2.341,1.36-2.9a8.929,8.929,0,0,1,3.26-.28h13.55l-1.14-1.14a.5.5,0,0,1,0-.71.492.492,0,0,1,.7,0Z' />
                              </g>
                           </g>
                        </svg>
                     </button>
                  </Tooltip>
               </div>
               <div className='hidden md:flex items-center text-xs gap-x-2.5'>
                  <span>{timeFormatter(currentTime)}</span>
                  <Range
                     values={[currentTime]}
                     step={1}
                     min={0}
                     max={audio ? audio.duration : 1000}
                     onChange={handleRangeChange}
                     renderTrack={({ props, children }) => (
                        <div
                           onMouseDown={props.onMouseDown}
                           onTouchStart={props.onTouchStart}
                           style={{
                              ...props.style,
                              display: 'flex',
                              width: '100%',
                              cursor: 'pointer'
                           }}
                        >
                           <div
                              ref={props.ref}
                              style={{
                                 height: '3px',
                                 width: '100%',
                                 borderRadius: '4px',
                                 background: getTrackBackground({
                                    values: [currentTime],
                                    colors: ['#ed2b91', '#aaa'],
                                    min: 0,
                                    max: audio ? audio.duration : 1000
                                 }),
                                 alignSelf: 'center'
                              }}
                              className='hover:!h-[5px] group'
                           >
                              {children}
                           </div>
                        </div>
                     )}
                     renderThumb={({ props }) => (
                        <div
                           {...props}
                           style={{
                              ...props.style,
                              height: '12px',
                              width: '12px',
                              borderRadius: '50%',
                              backgroundColor: '#ed2b91',
                              outline: 'none'
                           }}
                           className='hidden group-hover:block'
                        />
                     )}
                  />
                  <span>{timeFormatter(infoSong.duration)}</span>
               </div>
            </div>

            {/* volume */}
            <div
               className={`w-[30%] justify-end items-center md:flex hidden gap-x-1 ${
                  isShowLyric ? '!hidden' : '!flex'
               }`}
            >
               {infoSong.mvlink && (
                  <Tooltip content={'MV'}>
                     <button className={`p-2 hover:bg-white hover:bg-opacity-10 rounded-full`}>
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
                              d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5'
                           />
                        </svg>
                     </button>
                  </Tooltip>
               )}

               <Tooltip content={'Xem lời bài hát'}>
                  <button
                     onClick={() => setIsShowLyric(true)}
                     className='p-2 hover:bg-white hover:bg-opacity-10 rounded-full'
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
                           d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
                        />
                     </svg>
                  </button>
               </Tooltip>

               <Tooltip content={'Chế độ cửa sổ'}>
                  <button className='p-2 hover:bg-white hover:bg-opacity-10 rounded-full'>
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
                           d='M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6'
                        />
                     </svg>
                  </button>
               </Tooltip>
               <div className='flex items-center gap-x-1'>
                  <button
                     onClick={() => setIsMuted((prev) => !prev)}
                     className='p-2 hover:bg-white hover:bg-opacity-10 rounded-full'
                  >
                     {isMuted || currentVolume === 0 ? (
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
                              d='M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z'
                           />
                        </svg>
                     ) : (
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
                              d='M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z'
                           />
                        </svg>
                     )}
                  </button>
                  <div className='w-[70px]'>
                     <Range
                        values={[currentVolume]}
                        step={1}
                        min={0}
                        max={100}
                        onChange={(values) => {
                           setCurrentVolume(values[0])
                           setPreviousVolume(values[0])
                           setIsMuted(false)
                           if (audio) {
                              audio.volume = values[0] / 100
                           }
                        }}
                        renderTrack={({ props, children }) => (
                           <div
                              onMouseDown={props.onMouseDown}
                              onTouchStart={props.onTouchStart}
                              style={{
                                 ...props.style,
                                 display: 'flex',
                                 width: '100%',
                                 cursor: 'pointer'
                              }}
                           >
                              <div
                                 ref={props.ref}
                                 style={{
                                    height: '3px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    background: getTrackBackground({
                                       values: [currentVolume],
                                       colors: ['#ed2b91', '#aaa'],
                                       min: 0,
                                       max: 100
                                    }),
                                    alignSelf: 'center'
                                 }}
                                 className='hover:!h-[5px] group'
                              >
                                 {children}
                              </div>
                           </div>
                        )}
                        renderThumb={({ props }) => (
                           <div
                              {...props}
                              style={{
                                 ...props.style,
                                 height: '12px',
                                 width: '12px',
                                 borderRadius: '50%',
                                 backgroundColor: '#ed2b91',
                                 outline: 'none'
                              }}
                              className='hidden group-hover:block'
                           />
                        )}
                     />
                  </div>
               </div>
               <div className='h-[33px] border-l border-l-gray-700 mx-5' />
               <Tooltip left content={'Danh sách phát'}>
                  <button
                     onClick={() => setOpenSideBarRight((prev) => !prev)}
                     className={`rounded p-2 ${
                        openSideBarRight
                           ? 'bg-tprimary hover:bg-opacity-90'
                           : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                     }`}
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
                           d='M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z'
                        />
                     </svg>
                  </button>
               </Tooltip>
            </div>

            {/* mobile */}
            <button
               onClick={() => setOpenSideBarRight((prev) => !prev)}
               className={`rounded p-2 ${
                  openSideBarRight
                     ? 'bg-tprimary hover:bg-opacity-90'
                     : 'bg-white bg-opacity-10 hover:bg-opacity-20 md:hidden'
               }`}
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
                     d='M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z'
                  />
               </svg>
            </button>
         </div>
      )
   }
}
