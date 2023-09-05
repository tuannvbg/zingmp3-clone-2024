'use client'
import React, { useContext, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import Image from 'next/image'
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
import Modal from '@/components/Modal/Modal'
import { WeekChartType } from '@/types/weekChart.type'
import ChartSection from '@/components/ChartSection/ChartSection'
import ReleaseItem from '@/components/ReleaseItem/ReleaseItem'

export default function Home() {
   const [tabRelease, setTabRelease] = useState<'all' | 'vPop' | 'others'>('all')
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal

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
         router.push(banner.link)
      }
   }

   const bannerList: BannerListType[] = data?.data.data.items[0].items //banner
   const releaseList: ReleaseType = data?.data.data.items[2].items //mới phát hành
   const chillList: HomeListType[] = data?.data.data.items[3].items //chill
   const loveLifeList: HomeListType[] = data?.data.data.items[4].items //1 chút yêu đời
   const remixList: HomeListType[] = data?.data.data.items[5].items //Remix là Dance luôn
   const moodList: HomeListType[] = data?.data.data.items[6].items //Tâm trạng tan chậm
   const artistList: HomeListType[] = data?.data.data.items[7].items //Nghệ sĩ thịnh hành
   const rankingList: RankingType[] = data?.data.data.items[8].items //BXH Nhạc Mới
   const weekChartList: WeekChartType[] = data?.data.data.items[10].items //weekChartList
   const top100List: HomeListType[] = data?.data.data.items[11].items //top 100
   const albumHotList: HomeListType[] = data?.data.data.items[13].items //album hot
   const radioList: RadioType[] = data?.data.data.items[14].items //radio nổi bật

   if (!bannerList) return <Loading />
   return (
      <div className={`mt-[70px] px-3 sm:px-8 lg:px-14 ${currentSongId ? 'pb-32 md:pb-28' : 'pb-14 md:pb-10'}`}>
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
                        <Image
                           priority
                           src={banner.banner}
                           sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                           fill
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
                        <Image
                           priority
                           src={banner.banner}
                           sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                           fill
                           alt={''}
                           className='w-full absolute top-0 left-0 right-0 h-full object-cover'
                        />
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
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
                  href={data?.data.data.items[2].link as string}
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
         <div className='flex items-center justify-between mt-12 mb-5'>
            <h2 className='text-xl font-bold'>{data?.data.data.items[3].title}</h2>
            <Link
               href={data?.data.data.items[3].link as string}
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

         {/* Một chút yêu đời */}
         <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[4].title}</h2>
         <HomeList list={loveLifeList} />

         {/* Remix là Dance luôn */}
         <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[5].title}</h2>
         <HomeList list={remixList} />

         {/* Tâm trạng tan chậm */}
         <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[6].title}</h2>
         <HomeList list={moodList} />

         {/* Nghệ sĩ thịnh hành */}
         <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[7].title}</h2>
         <HomeList list={artistList} />

         {/* BXH Nhạc Mới */}
         <div className='flex items-center justify-between mt-12 mb-5'>
            <h2 className='text-xl font-bold'>{data?.data.data.items[8].title}</h2>
            <Link
               href={data?.data.data.items[8].link as string}
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
            {rankingList.slice(0, 8).map((item, index) => (
               <SwiperSlide key={item.encodeId}>
                  <div className='p-3.5 rounded bg-white bg-opacity-10 flex items-center gap-x-2 select-none'>
                     <div
                        onClick={() => handleClickSong(item.encodeId)}
                        className='relative cursor-pointer overflow-hidden group flex-shrink-0 h-[120px] w-[120px] rounded'
                     >
                        <Image
                           src={item.thumbnailM}
                           width={120}
                           height={120}
                           alt={item.title}
                           sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                           className='w-full h-full object-cover rounded group-hover:scale-110 transition-all duration-500'
                        />
                        {!isLoadingSong && isPlaying && currentSongId === item.encodeId ? (
                           <div className='absolute inset-0 flex items-center justify-center z-20'>
                              <Image
                                 sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                 src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif'}
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
                              <Image
                                 src={'https://i.gifer.com/ZKZg.gif'}
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
                           <span title={item.title} className='font-medium max-w-[140px] whitespace-nowrap truncate'>
                              {item.title}
                           </span>
                           <div className='text-xs'>
                              {item.artists?.map((artist, index) => {
                                 return index === item.artists.length - 1 ? (
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
                        <div className='flex items-end gap-x-1'>
                           <span className='text-[40px] translate-y-2.5 text-transparent text-stroke font-black'>
                              #{index + 1}
                           </span>
                           <span className='text-secondary'>{item.album.releaseDate}</span>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>

         <ChartSection />

         {/* weekChartList */}
         <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-x-7'>
            {weekChartList?.map((item) => (
               <Link key={item.link} href={item.link} className='relative pt-[29%] rounded-md overflow-hidden'>
                  <Image
                     src={item.cover}
                     fill
                     alt=''
                     sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                     className='absolute top-0 left-0 right-0 object-cover hover:scale-110 transition-all duration-500'
                  />
               </Link>
            ))}
         </div>

         {/* top 100 */}
         <div className='flex items-center justify-between mt-12 mb-5'>
            <h2 className='text-xl font-bold'>{data?.data.data.items[11].title}</h2>
            <Link
               href={data?.data.data.items[11].link as string}
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

         {/* album hot */}
         <h2 className='text-xl font-bold mt-12 mb-5'>{data?.data.data.items[13].title}</h2>
         <HomeList list={albumHotList} title />

         {/* Radio Nổi Bật */}
         <div className='flex items-center justify-between mt-12 mb-5'>
            <h2 className='text-xl font-bold'>{data?.data.data.items[14].title}</h2>
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
            {radioList.map((item) => (
               <SwiperSlide key={item.id}>
                  <div className='text-center'>
                     <div onClick={() => toast.warning('Chức năng này chưa hoàn thiện')} className='relative'>
                        <div className='relative cursor-pointer group aspect-square rounded-full overflow-hidden border-[3px] border-pink-500'>
                           <Image
                              fill
                              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
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
                        <Image
                           src={item.host.thumbnail}
                           alt={item.host.name}
                           width={48}
                           height={48}
                           className='w-12 h-12 border-2 border-black rounded-full object-cover absolute bottom-0 right-0 translate-y-[-40%]'
                        />
                        <Image
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
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}
