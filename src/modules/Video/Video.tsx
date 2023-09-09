'use client'
import { getVideo } from '@/apis/home.api'
import Loading from '@/components/Loading/Loading'
import MvArtistList from '@/components/MvArtistList/MvArtistList'
import Tooltip from '@/components/Tooltip/Tooltip'
import { AppContext } from '@/contexts/app.context'
import useAddLibrary from '@/hooks/useAddLibrary'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'

export default function Video({ params }: { params: { id: string } }) {
   const { setCurrentIdVideo, audio } = useContext(AppContext)
   const { library, handleAddLibrary } = useAddLibrary() //thêm vào thư viện
   const { data } = useQuery({
      queryKey: ['video', params.id],
      queryFn: () => getVideo({ id: params.id.split('.')[0] })
   })
   const videoData = data?.data.data
   useEffect(() => {
      if (videoData?.encodeId) {
         setCurrentIdVideo(videoData.encodeId)
         audio?.pause()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [videoData?.encodeId])
   return (
      <div className='video-animate fixed inset-0 z-[100000000] bg-modal p-6 min-h-screen overflow-y-auto'>
         {videoData ? (
            <>
               <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-x-3'>
                     <Image
                        src={videoData.artists[0].thumbnail}
                        width={50}
                        height={50}
                        alt={videoData.title}
                        className='w-[50px] h-[50px] object-cover rounded-full'
                     />
                     <div className='flex flex-col'>
                        <span className='font-bold text-base'>{videoData?.title}</span>
                        <div className='text-secondary text-xs my-1'>
                           {videoData.artists?.map((artist, index) => {
                              return index === videoData.artists.length - 1 ? (
                                 <Link
                                    href={artist.link}
                                    key={artist.id}
                                    className='isHover cursor-pointer hover:underline'
                                 >
                                    {artist.name}
                                 </Link>
                              ) : (
                                 <Link
                                    href={artist.link}
                                    key={artist.id}
                                    className='isHover cursor-pointer hover:underline'
                                 >
                                    {`${artist.name}, `}
                                 </Link>
                              )
                           })}
                        </div>
                     </div>
                     <Tooltip
                        content={library.includes(videoData.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}
                     >
                        <button
                           onClick={(e) => handleAddLibrary(e, videoData.encodeId, null, null, videoData as any)}
                           className={`hover:bg-white hover:bg-opacity-10 rounded-full p-1.5 ${
                              library.includes(videoData.encodeId) && 'text-tprimary'
                           }`}
                        >
                           {library.includes(videoData.encodeId) ? (
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
                  <Tooltip bottomCenter content='Đóng'>
                     <Link
                        href={'/'}
                        onClick={() => setCurrentIdVideo('')}
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
                     </Link>
                  </Tooltip>
               </div>
               <div className='grid grid-cols-12 gap-7'>
                  <div className='col-span-12 lg:col-span-9 aspect-video'>
                     <video
                        poster={videoData.thumbnailM}
                        className='w-full h-full'
                        autoPlay
                        controls
                        src={
                           Object.values(videoData.streaming.mp4)[3] ||
                           Object.values(videoData.streaming.mp4)[2] ||
                           Object.values(videoData.streaming.mp4)[1] ||
                           Object.values(videoData.streaming.mp4)[0] ||
                           ''
                        }
                     />
                  </div>
                  <div className='col-span-12 lg:col-span-3 bg-white bg-opacity-10 h-[80vh] p-4 rounded-lg'>
                     <span className='text-lg font-bold'>Danh sách phát</span>
                     <ul className='flex flex-col gap-y-3 mt-4 h-[90%] overflow-y-auto'>
                        {videoData.recommends.map((item) => (
                           <li className='flex items-center gap-x-3' key={item.encodeId}>
                              <Link
                                 className='flex-shrink-0 relative w-[120px] h-[70px] group overflow-hidden rounded-md'
                                 href={item.link}
                              >
                                 <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    width={120}
                                    height={70}
                                    className='w-full h-full object-cover group-hover:scale-110 transition-all duration-300'
                                 />
                                 <div className='absolute text-white hidden group-hover:flex inset-0 z-10 items-center justify-center'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       viewBox='0 0 24 24'
                                       fill='currentColor'
                                       className='w-5 h-5'
                                    >
                                       <path
                                          fillRule='evenodd'
                                          d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                                          clipRule='evenodd'
                                       />
                                    </svg>
                                 </div>
                                 <div className='absolute hidden group-hover:block inset-0 bg-black bg-opacity-40' />
                              </Link>
                              <div className='flex flex-col overflow-hidden'>
                                 <span title={item.title} className='font-bold truncate'>
                                    {item.title}
                                 </span>
                                 <div className='text-secondary text-xs my-1'>
                                    {item.artists?.map((artist, index) => {
                                       return index === item.artists.length - 1 ? (
                                          <Link
                                             href={artist.link}
                                             key={artist.id}
                                             className='isHover cursor-pointer hover:underline'
                                          >
                                             {artist.name}
                                          </Link>
                                       ) : (
                                          <Link
                                             href={artist.link}
                                             key={artist.id}
                                             className='isHover cursor-pointer hover:underline'
                                          >
                                             {`${artist.name}, `}
                                          </Link>
                                       )
                                    })}
                                 </div>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
               <div className='mt-10 flex flex-col gap-y-10'>
                  {videoData.artists.map((item) => (
                     <MvArtistList key={item.id} item={item} />
                  ))}
               </div>
            </>
         ) : (
            <Loading />
         )}
      </div>
   )
}
