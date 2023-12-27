'use client'
import React, { useContext, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import { AppContext } from '@/contexts/app.context'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading/Loading'
import { BannerListType } from '@/types/banner.type'
import { ReleaseType } from '@/types/release.type'
import { HomeListType } from '@/types/homelist.type'
import Link from 'next/link'
import HomeList from '@/components/HomeList/HomeList'
import { RankingType } from '@/types/ranking.type'
import { RadioType } from '@/types/radio.type'
import { toast } from 'react-toastify'
import useGetHome from '@/hooks/useGetHome'
import usePlayMusic from '@/hooks/usePlayMusic'
import { WeekChartType } from '@/types/weekChart.type'
import ChartSection from '@/components/ChartSection/ChartSection'
import ReleaseItem from '@/components/ReleaseItem/ReleaseItem'

export default function Home() {
   const [tabRelease, setTabRelease] = useState<'all' | 'vPop' | 'others'>('all')

   const router = useRouter()

   const { setCurrentSongId, setIsPlaying, setAudio, currentSongId, isLoadingSong, isPlaying, setAtAlbum } =
      useContext(AppContext)

   const { data } = useGetHome()
   const { handleClickSong, stopCurrentSong } = usePlayMusic()

   const handleClickBanner = (banner: BannerListType) => {
      // type 1 là bài hát, type 4 là playlist
      if (banner.type === 1) {
         stopCurrentSong()
         setAudio(null)
         setCurrentSongId(banner.encodeId)
         setIsPlaying(true)
         setAtAlbum(false)
      } else {
         router.push(banner?.link)
      }
   }

   const bannerList: BannerListType[] = data?.data.data.items[0]?.items //banner
   const releaseList: ReleaseType = data?.data.data.items[2]?.items //mới phát hành
   const chillList: HomeListType[] = data?.data.data.items[3]?.items //chill
   const loveLifeList: HomeListType[] = data?.data.data.items[4]?.items //1 chút yêu đời
   const remixList: HomeListType[] = data?.data.data.items[5]?.items //Remix là Dance luôn
   const moodList: HomeListType[] = data?.data.data.items[6]?.items //Tâm trạng tan chậm
   const artistList: HomeListType[] = data?.data.data.items[7]?.items //Nghệ sĩ thịnh hành
   const rankingList: RankingType[] = data?.data.data.items[8]?.items //BXH Nhạc Mới
   const weekChartList: WeekChartType[] = data?.data.data.items[10]?.items //weekChartList
   const top100List: HomeListType[] = data?.data.data.items[11]?.items //top 100
   const albumHotList: HomeListType[] = data?.data.data.items[13]?.items //album hot
   const radioList: RadioType[] = data?.data.data.items[9]?.items //radio nổi bật

   if (!bannerList) return <Loading />
   return (
      <div className={`mt-[70px] px-3 sm:px-8 lg:px-14 ${currentSongId ? 'pb-36 md:pb-28' : 'pb-20 md:pb-16'}`}>
         {/* banner */}
         <div className='pt-[30px]'>
            <Swiper
               modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
               spaceBetween={30}
               slidesPerView={3}
               loop
               navigation //Kích hoạt điều hướng (nút prev và next) cho slider.
               autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }} //Kích hoạt chế độ tự động chuyển slide. Trong trường hợp này, mỗi slide sẽ tự động chuyển sau 1 giây và sẽ không tắt khi người dùng tương tác với slider.
               breakpoints={{
                  0: {
                     slidesPerView: 1,
                     spaceBetween: 0
                  },
                  640: {
                     slidesPerView: 2,
                     spaceBetween: 20
                  },
                  768: {
                     slidesPerView: 2,
                     spaceBetween: 20
                  },
                  1024: {
                     slidesPerView: 3,
                     spaceBetween: 30
                  },
                  1280: {
                     slidesPerView: 3,
                     spaceBetween: 30
                  },
                  1536: {
                     slidesPerView: 4,
                     spaceBetween: 40
                  }
               }}
            >
               {bannerList.map((banner) => (
                  <SwiperSlide key={banner.encodeId}>
                     <div
                        onClick={() => handleClickBanner(banner)}
                        className='relative pt-[57.3%] cursor-pointer rounded-lg overflow-hidden slider-item '
                     >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           src={banner.banner}
                           alt={''}
                           className='w-full absolute top-0 left-0 right-0 h-full object-cover'
                        />
                     </div>
                  </SwiperSlide>
               ))}
               {bannerList.map((banner) => (
                  <SwiperSlide key={banner.encodeId}>
                     <div
                        onClick={() => handleClickBanner(banner)}
                        className='relative pt-[57.3%] cursor-pointer rounded-lg overflow-hidden slider-item '
                     >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           src={banner.banner}
                           sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                           alt={''}
                           className='w-full absolute top-0 left-0 right-0 h-full object-cover'
                        />
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>

         {/* mobile */}
         <div className='flex min-[900px]:hidden text-xs items-center justify-around mt-10'>
            <Link className='flex flex-col gap-y-1 items-center' href={'/moi-phat-hanh'}>
               <div className='w-11 h-11 bg-[#40aaff] rounded-2xl flex items-center justify-center'>
                  <svg width={28} height={28} viewBox='0 0 24 24' fill='currentColor'>
                     <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M20.25 2C20.25 1.58579 19.9142 1.25 19.5 1.25C19.0858 1.25 18.75 1.58579 18.75 2C18.75 2.95195 18.4626 3.63685 18.0656 4.07478C17.6709 4.51015 17.1258 4.75 16.5 4.75C16.0858 4.75 15.75 5.08579 15.75 5.5C15.75 5.91421 16.0858 6.25 16.5 6.25C17.126 6.25 17.671 6.48996 18.0657 6.9254C18.4628 7.36341 18.75 8.04835 18.75 9C18.75 9.41421 19.0858 9.75 19.5 9.75C19.9142 9.75 20.25 9.41421 20.25 9C20.25 8.04805 20.5374 7.36315 20.9344 6.92522C21.3291 6.48985 21.8742 6.25 22.5 6.25C22.9142 6.25 23.25 5.91421 23.25 5.5C23.25 5.08579 22.9142 4.75 22.5 4.75C21.874 4.75 21.329 4.51004 20.9343 4.0746C20.5372 3.63659 20.25 2.95165 20.25 2ZM19.1769 5.08231C19.2934 4.95373 19.4013 4.81641 19.5 4.6709C19.5987 4.81629 19.7064 4.95351 19.8229 5.082C19.9625 5.23602 20.1129 5.37549 20.2725 5.49999C20.113 5.62441 19.9627 5.76378 19.8231 5.91769C19.7066 6.04627 19.5987 6.18359 19.5 6.3291C19.4013 6.18371 19.2936 6.04649 19.1771 5.918C19.0375 5.76398 18.8871 5.62451 18.7275 5.50001C18.887 5.37559 19.0373 5.23622 19.1769 5.08231ZM13.5095 5.31294C13.5652 5.72339 13.2776 6.10128 12.8672 6.15698L12.3492 6.22728L11.3238 6.36644C10.186 6.55633 9.25 7.65728 9.25 8.74999V18.5C9.25 20.5711 7.57107 22.25 5.5 22.25C3.42893 22.25 1.75 20.5711 1.75 18.5C1.75 16.4289 3.42893 14.75 5.5 14.75C6.3442 14.75 7.12325 15.0289 7.75 15.4997V8.74999C7.75 6.89294 9.25015 5.18376 11.0921 4.88439L11.1116 4.88149L12.1475 4.7409L12.6655 4.67061C13.0759 4.61491 13.4538 4.90249 13.5095 5.31294ZM5.5 16.25C6.74264 16.25 7.75 17.2573 7.75 18.5C7.75 19.7426 6.74264 20.75 5.5 20.75C4.25736 20.75 3.25 19.7426 3.25 18.5C3.25 17.2573 4.25736 16.25 5.5 16.25ZM19.5 11.75C19.9142 11.75 20.25 12.0858 20.25 12.5V17.5C20.25 19.5711 18.5711 21.25 16.5 21.25C14.4289 21.25 12.75 19.5711 12.75 17.5C12.75 15.4289 14.4289 13.75 16.5 13.75C17.3442 13.75 18.1233 14.0289 18.75 14.4997V12.5C18.75 12.0858 19.0858 11.75 19.5 11.75ZM16.5 15.25C17.7426 15.25 18.75 16.2573 18.75 17.5C18.75 18.7426 17.7426 19.75 16.5 19.75C15.2574 19.75 14.25 18.7426 14.25 17.5C14.25 16.2573 15.2574 15.25 16.5 15.25Z'
                        fillOpacity='0.8'
                     />
                  </svg>
               </div>
               <span className='font-medium block'>Nhạc Mới</span>
            </Link>
            <Link className='flex flex-col gap-y-1 items-center' href={'/top100'}>
               <div className='w-11 h-11 bg-[#9c14fe] rounded-2xl flex items-center justify-center'>
                  <svg width={30} height={30} viewBox='0 0 24 24' fill='none'>
                     <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M12 17L7.01888 19.6187C6.65207 19.8116 6.22335 19.5001 6.29341 19.0916L7.24472 13.5451L3.21491 9.61699C2.91815 9.32773 3.08191 8.82374 3.49202 8.76415L9.06107 7.95491L11.5516 2.90849C11.735 2.53687 12.265 2.53687 12.4484 2.90849L14.9389 7.95491L20.508 8.76415C20.9181 8.82374 21.0818 9.32773 20.7851 9.61699L16.7553 13.5451L17.7066 19.0916C17.7766 19.5001 17.3479 19.8116 16.9811 19.6187L12 17Z'
                        stroke='currentColor'
                        strokeOpacity='0.8'
                        strokeWidth='1.5'
                     />
                  </svg>
               </div>
               <span className='font-medium block'>Top 100</span>
            </Link>
            <Link className='flex flex-col gap-y-1 items-center' href={'/the-loai-video/Viet-Nam/IWZ9Z08I.html'}>
               <div className='w-11 h-11 bg-[#09c595] rounded-2xl flex items-center justify-center'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={1.5}
                     stroke='currentColor'
                     className='w-7 h-7'
                  >
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5'
                     />
                  </svg>
               </div>
               <span className='font-medium block'>MV</span>
            </Link>
            <Link className='flex flex-col gap-y-1 items-center' href={'/the-loai-video/Viet-Nam/IWZ9Z08I.html'}>
               <div className='w-11 h-11 rounded-2xl block overflow-hidden'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                     src={'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg'}
                     alt={'Gần đây'}
                     width={44}
                     height={44}
                     className='w-full h-full object-cover'
                  />
               </div>
               <span className='font-medium block'>Gần Đây</span>
            </Link>
         </div>

         {/* mới phát hành */}
         <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[2].title}</h2>
         <div className='flex items-center flex-wrap gap-y-4 justify-between mb-5'>
            <div className='flex items-center flex-wrap gap-4'>
               <button
                  onClick={() => setTabRelease('all')}
                  className={`uppercase text-xs rounded-full px-6 py-1 ${
                     tabRelease === 'all' ? 'bg-tprimary text-white' : 'bg-transparent border border-gray-700'
                  }`}
               >
                  tất cả
               </button>
               <button
                  onClick={() => setTabRelease('vPop')}
                  className={`uppercase text-xs rounded-full px-6 py-1 ${
                     tabRelease === 'vPop' ? 'bg-tprimary text-white' : 'bg-transparent border border-gray-700'
                  }`}
               >
                  việt nam
               </button>
               <button
                  onClick={() => setTabRelease('others')}
                  className={`uppercase text-xs rounded-full px-6 py-1 ${
                     tabRelease === 'others' ? 'bg-tprimary text-white' : 'bg-transparent border border-gray-700'
                  }`}
               >
                  quốc tế
               </button>
            </div>

            <div className='flex justify-end w-full sm:w-auto'>
               <Link
                  href={(data?.data.data.items[2]?.link as string) || '/'}
                  className='uppercase text-secondary text-xs flex items-center gap-x-1 isHover'
               >
                  tất cả
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={1.5}
                     stroke='currentColor'
                     className='w-[18px] h-[18px]'
                  >
                     <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
               </Link>
            </div>
         </div>
         <div className='hidden xl:grid grid-cols-3 gap-x-5 select-none'>
            {releaseList[tabRelease].slice(0, 12).map((item) => (
               <ReleaseItem key={item.encodeId} item={item} />
            ))}
         </div>
         <div className='grid-cols-2 hidden sm:grid xl:hidden gap-x-5 select-none'>
            {releaseList[tabRelease].slice(0, 8).map((item) => (
               <ReleaseItem key={item.encodeId} item={item} />
            ))}
         </div>
         <div className='grid-cols-1 grid sm:hidden gap-y-5 select-none'>
            {releaseList[tabRelease].slice(0, 4).map((item) => (
               <ReleaseItem key={item.encodeId} item={item} />
            ))}
         </div>

         {/* CHILL */}
         {chillList && (
            <>
               <div className='flex items-center justify-between mt-12 mb-5'>
                  <h2 className='text-xl font-bold'>{data?.data.data.items[3]?.title}</h2>
                  <Link
                     href={(data?.data.data.items[3]?.link as string) || '/'}
                     className='uppercase text-xs text-secondary flex items-center gap-x-1 isHover'
                  >
                     tất cả
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[18px] h-[18px]'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                  </Link>
               </div>
               <HomeList list={chillList} />
            </>
         )}

         {/* Một chút yêu đời */}
         {loveLifeList && (
            <>
               <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[4].title}</h2>
               <HomeList list={loveLifeList} />
            </>
         )}

         {/* Remix là Dance luôn */}
         {remixList && (
            <>
               <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[5].title}</h2>
               <HomeList list={remixList} />
            </>
         )}
         {/* Tâm trạng tan chậm */}
         {moodList && (
            <>
               <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[6].title}</h2>
               <HomeList list={moodList} />
            </>
         )}

         {/* Nghệ sĩ thịnh hành */}
         {artistList && (
            <>
               <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[7].title}</h2>
               <HomeList list={artistList} />
            </>
         )}

         {/* BXH Nhạc Mới */}
         {rankingList && (
            <>
               <div className='flex items-center justify-between mt-12 mb-5'>
                  <h2 className='text-xl font-bold'>{data?.data.data.items[8].title}</h2>
                  <Link
                     href={(data?.data.data.items[8]?.link as string) || '/'}
                     className='uppercase isHover text-xs text-secondary flex items-center gap-x-1'
                  >
                     tất cả
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[18px] h-[18px]'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                  </Link>
               </div>
               <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={3}
                  loop
                  style={{
                     marginTop: '30px'
                  }}
                  navigation //Kích hoạt điều hướng (nút prev và next) cho slider.
                  autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }} //Kích hoạt chế độ tự động chuyển slide. Trong trường hợp này, mỗi slide sẽ tự động chuyển sau 1 giây và sẽ không tắt khi người dùng tương tác với slider.
                  breakpoints={{
                     0: {
                        slidesPerView: 1,
                        spaceBetween: 0
                     },
                     640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                     },
                     768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                     },
                     1024: {
                        slidesPerView: 2,
                        spaceBetween: 30
                     },
                     1280: {
                        slidesPerView: 3,
                        spaceBetween: 30
                     },
                     1536: {
                        slidesPerView: 4,
                        spaceBetween: 40
                     }
                  }}
               >
                  {rankingList?.slice(0, 8).map((item, index) => (
                     <SwiperSlide key={item.encodeId}>
                        <div className='p-3.5 rounded bg-white bg-opacity-10 flex items-center gap-x-2 select-none'>
                           <div
                              onClick={() => handleClickSong(item.encodeId)}
                              className='relative cursor-pointer overflow-hidden group flex-shrink-0 h-[120px] w-[120px] rounded'
                           >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                 src={item.thumbnailM}
                                 width={120}
                                 height={120}
                                 alt={item.title}
                                 sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                 className='w-full h-full object-cover rounded group-hover:scale-110 transition-all duration-500'
                              />
                              {!isLoadingSong && isPlaying && currentSongId === item.encodeId ? (
                                 <div className='absolute inset-0 flex items-center justify-center z-20'>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                       sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                       src={
                                          'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'
                                       }
                                       width={32}
                                       height={32}
                                       className='w-8 h-8 object-cover'
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
                                       className='w-8 h-8 text-white'
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
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                       src={'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'}
                                       width={20}
                                       height={20}
                                       className='w-8 h-8 object-cover'
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

                           <div className='flex flex-col justify-between h-[120px]'>
                              <div className='flex flex-col'>
                                 <span
                                    title={item.title}
                                    className='font-medium max-w-[140px] whitespace-nowrap truncate'
                                 >
                                    {item.title}
                                 </span>
                                 <div className='text-xs'>
                                    {item.artists?.map((artist, index) => {
                                       return index === item.artists.length - 1 ? (
                                          <Link
                                             href={artist?.link || '/'}
                                             key={artist.id}
                                             className='text-secondary isHover cursor-pointer hover:underline'
                                          >
                                             {artist.name}
                                          </Link>
                                       ) : (
                                          <Link
                                             href={artist?.link || '/'}
                                             key={artist.id}
                                             className='text-secondary isHover cursor-pointer hover:underline'
                                          >
                                             {`${artist.name}, `}
                                          </Link>
                                       )
                                    })}
                                 </div>
                              </div>
                              <div className='flex items-end gap-x-1'>
                                 <span className='text-[40px] translate-y-2.5 text-transparent text-stroke font-black'>
                                    #{index + 1}
                                 </span>
                                 <span className='text-secondary'>{item.album?.releaseDate}</span>
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </>
         )}

         <ChartSection />

         {/* weekChartList */}
         {weekChartList && (
            <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-x-7'>
               {weekChartList?.map((item) => (
                  <Link
                     key={item?.link}
                     href={item?.link || '/'}
                     className='relative pt-[29%] rounded-md overflow-hidden'
                  >
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img
                        src={item.cover}
                        alt=''
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='absolute top-0 left-0 right-0 object-cover hover:scale-110 transition-all duration-500'
                     />
                  </Link>
               ))}
            </div>
         )}
         {/* top 100 */}
         {top100List && (
            <>
               <div className='flex items-center justify-between mt-12 mb-5'>
                  <h2 className='text-xl font-bold'>{data?.data.data.items[11]?.title}</h2>
                  <Link
                     href={(data?.data.data.items[11]?.link as string) || '/'}
                     className='uppercase text-xs text-secondary flex items-center gap-x-1 isHover'
                  >
                     tất cả
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[18px] h-[18px]'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                  </Link>
               </div>
               <HomeList list={top100List} title />
            </>
         )}

         {/* album hot */}
         {albumHotList && (
            <>
               <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[13]?.title}</h2>
               <HomeList list={albumHotList} title />
            </>
         )}

         {/* Radio Nổi Bật */}
         {radioList && (
            <>
               <div className='flex items-center justify-between mt-12 mb-5'>
                  <h2 className='text-xl font-bold'>{data?.data.data.items[14]?.title}</h2>
                  <Link href={'/radio'} className='uppercase text-xs text-secondary flex items-center gap-x-1 isHover'>
                     tất cả
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-[18px] h-[18px]'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                  </Link>
               </div>
               <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  spaceBetween={25}
                  slidesPerView={6}
                  style={{
                     marginTop: '30px'
                  }}
                  navigation //Kích hoạt điều hướng (nút prev và next) cho slider.
                  autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }} //Kích hoạt chế độ tự động chuyển slide. Trong trường hợp này, mỗi slide sẽ tự động chuyển sau 1 giây và sẽ không tắt khi người dùng tương tác với slider.
                  breakpoints={{
                     0: {
                        slidesPerView: 2,
                        spaceBetween: 20
                     },
                     640: {
                        slidesPerView: 3,
                        spaceBetween: 20
                     },
                     768: {
                        slidesPerView: 4,
                        spaceBetween: 20
                     },
                     1024: {
                        slidesPerView: 5,
                        spaceBetween: 25
                     },
                     1280: {
                        slidesPerView: 6,
                        spaceBetween: 25
                     },
                     1536: {
                        slidesPerView: 7,
                        spaceBetween: 40
                     }
                  }}
               >
                  {radioList?.map((item) => (
                     <SwiperSlide key={item.id}>
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
                           <h3 className='text-base font-bold'>{item.host.name?.replace('Radio', '').trim()}</h3>
                           <span className='text-secondary text-xs'>{item.activeUsers} đang nghe</span>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </>
         )}
      </div>
   )
}
