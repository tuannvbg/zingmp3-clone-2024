import { HomeListType } from '@/types/homelist.type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Tooltip from '../Tooltip/Tooltip'
import { useRouter } from 'next/navigation'
import useAddLibrary from '@/hooks/useAddLibrary'

export default function HomeList({
   list,
   title = false,
   all = false
}: {
   list: HomeListType[]
   title?: boolean
   all?: boolean
}) {
   const router = useRouter()
   const { library, handleAddLibrary } = useAddLibrary()
   return (
      <>
         {all ? (
            <div className='grid sm:grid-cols-3 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 select-none'>
               {list.map((item) => (
                  <div key={item?.encodeId}>
                     <div onClick={() => router.push(item?.link)} className='relative block group cursor-pointer'>
                        <div className='relative aspect-square overflow-hidden rounded-md'>
                           <Image
                              src={item?.thumbnailM}
                              alt={item?.title}
                              fill
                              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                              className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
                           />
                        </div>
                        <div
                           className={`absolute inset-0 z-10 items-center rounded-lg gap-x-5 justify-center hidden group-hover:flex bg-black bg-opacity-40
                  `}
                        >
                           <Tooltip
                              content={library.includes(item?.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}
                           >
                              <button
                                 onClick={(e) => handleAddLibrary(e, item?.encodeId, item)}
                                 className={`hover:bg-white hover:bg-opacity-10 text-white rounded-full p-1.5 ${
                                    library.includes(item?.encodeId) && 'text-tprimary'
                                 }`}
                              >
                                 {library.includes(item?.encodeId) ? (
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

                           <span className='border border-white text-white rounded-full p-2'>
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

                           <Tooltip content={'Khác'}>
                              <button
                                 onClick={(e) => e.stopPropagation()}
                                 className='hover:bg-white text-white hover:bg-opacity-10 rounded-full p-1.5'
                              >
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                 >
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                                    />
                                 </svg>
                              </button>
                           </Tooltip>
                        </div>
                     </div>
                     {title ? (
                        <div className='flex flex-col mt-2 gap-y-1'>
                           <span title={item?.title} className='font-medium truncate'>
                              {item?.title}
                           </span>
                           <div className='text-secondary line-clamp-2'>
                              {item?.artists?.map((artist, index) => {
                                 return index === item?.artists.length - 1 ? (
                                    <Link
                                       href={artist.link}
                                       key={artist.id}
                                       className='isHover cursor-pointer hover:underline'
                                    >
                                       {artist.name}
                                    </Link>
                                 ) : (
                                    <>
                                       <Link
                                          href={artist.link}
                                          key={artist.id}
                                          className='isHover cursor-pointer hover:underline'
                                       >
                                          {artist.name}
                                       </Link>
                                       ,{' '}
                                    </>
                                 )
                              })}
                           </div>
                        </div>
                     ) : (
                        <p title={item?.sortDescription} className='text-secondary mt-2 line-clamp-2'>
                           {item?.sortDescription}
                        </p>
                     )}
                  </div>
               ))}
            </div>
         ) : (
            <>
               <div className='hidden xl:grid grid-cols-5 gap-x-5 2xl:gap-x-7 select-none'>
                  {list.slice(0, 5).map((item) => (
                     <div key={item?.encodeId}>
                        <div onClick={() => router.push(item?.link)} className='relative block group cursor-pointer'>
                           <div className='relative aspect-square overflow-hidden rounded-md'>
                              <Image
                                 src={item?.thumbnailM}
                                 alt={item?.title}
                                 fill
                                 sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                 className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
                              />
                           </div>
                           <div
                              className={`absolute inset-0 z-10 items-center rounded-lg gap-x-5 justify-center hidden group-hover:flex bg-black bg-opacity-40
                     `}
                           >
                              <Tooltip
                                 content={library.includes(item?.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}
                              >
                                 <button
                                    onClick={(e) => handleAddLibrary(e, item?.encodeId, item)}
                                    className={`hover:bg-white hover:bg-opacity-10 text-white rounded-full p-1.5 ${
                                       library.includes(item?.encodeId) && 'text-tprimary'
                                    }`}
                                 >
                                    {library.includes(item?.encodeId) ? (
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

                              <span className='border border-white text-white rounded-full p-2'>
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

                              <Tooltip content={'Khác'}>
                                 <button
                                    onClick={(e) => e.stopPropagation()}
                                    className='hover:bg-white text-white hover:bg-opacity-10 rounded-full p-1.5'
                                 >
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       fill='none'
                                       viewBox='0 0 24 24'
                                       strokeWidth={1.5}
                                       stroke='currentColor'
                                       className='w-6 h-6'
                                    >
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                                       />
                                    </svg>
                                 </button>
                              </Tooltip>
                           </div>
                        </div>
                        {title ? (
                           <div className='flex flex-col mt-2 gap-y-1'>
                              <span title={item?.title} className='font-medium truncate'>
                                 {item?.title}
                              </span>
                              <div className='text-secondary line-clamp-2'>
                                 {item?.artists?.map((artist, index) => {
                                    return index === item?.artists.length - 1 ? (
                                       <Link
                                          href={artist.link}
                                          key={artist.id}
                                          className='isHover cursor-pointer hover:underline'
                                       >
                                          {artist.name}
                                       </Link>
                                    ) : (
                                       <>
                                          <Link
                                             href={artist.link}
                                             key={artist.id}
                                             className='isHover cursor-pointer hover:underline'
                                          >
                                             {artist.name}
                                          </Link>
                                          ,{' '}
                                       </>
                                    )
                                 })}
                              </div>
                           </div>
                        ) : (
                           <p title={item?.sortDescription} className='text-secondary mt-2 line-clamp-2'>
                              {item?.sortDescription}
                           </p>
                        )}
                     </div>
                  ))}
               </div>
               <div className='hidden lg:grid xl:hidden grid-cols-4 gap-x-7 select-none'>
                  {list.slice(0, 4).map((item) => (
                     <div key={item?.encodeId}>
                        <div onClick={() => router.push(item?.link)} className='relative block group cursor-pointer'>
                           <div className='relative aspect-square overflow-hidden rounded-md'>
                              <Image
                                 src={item?.thumbnailM}
                                 alt={item?.title}
                                 fill
                                 sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                 className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
                              />
                           </div>
                           <div
                              className={`absolute inset-0 z-10 items-center rounded-lg gap-x-5 justify-center hidden group-hover:flex bg-black bg-opacity-40
                   `}
                           >
                              <Tooltip
                                 content={library.includes(item?.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}
                              >
                                 <button
                                    onClick={(e) => handleAddLibrary(e, item?.encodeId, item)}
                                    className={`hover:bg-white hover:bg-opacity-10 text-white rounded-full p-1.5 ${
                                       library.includes(item?.encodeId) && 'text-tprimary'
                                    }`}
                                 >
                                    {library.includes(item?.encodeId) ? (
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

                              <span className='border border-white text-white rounded-full p-2'>
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

                              <Tooltip content={'Khác'}>
                                 <button
                                    onClick={(e) => e.stopPropagation()}
                                    className='hover:bg-white text-white hover:bg-opacity-10 rounded-full p-1.5'
                                 >
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       fill='none'
                                       viewBox='0 0 24 24'
                                       strokeWidth={1.5}
                                       stroke='currentColor'
                                       className='w-6 h-6'
                                    >
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                                       />
                                    </svg>
                                 </button>
                              </Tooltip>
                           </div>
                        </div>
                        {title ? (
                           <div className='flex flex-col mt-2 gap-y-1'>
                              <span title={item?.title} className='font-medium truncate'>
                                 {item?.title}
                              </span>
                              <div className='text-secondary line-clamp-2'>
                                 {item?.artists?.map((artist, index) => {
                                    return index === item?.artists.length - 1 ? (
                                       <Link
                                          href={artist.link}
                                          key={artist.id}
                                          className='isHover cursor-pointer hover:underline'
                                       >
                                          {artist.name}
                                       </Link>
                                    ) : (
                                       <>
                                          <Link
                                             href={artist.link}
                                             key={artist.id}
                                             className='isHover cursor-pointer hover:underline'
                                          >
                                             {artist.name}
                                          </Link>
                                          ,{' '}
                                       </>
                                    )
                                 })}
                              </div>
                           </div>
                        ) : (
                           <p title={item?.sortDescription} className='text-secondary mt-2 line-clamp-2'>
                              {item?.sortDescription}
                           </p>
                        )}
                     </div>
                  ))}
               </div>
               <div className='hidden sm:grid lg:hidden grid-cols-3 gap-x-5 select-none'>
                  {list.slice(0, 3).map((item) => (
                     <div key={item?.encodeId}>
                        <div onClick={() => router.push(item?.link)} className='relative block group cursor-pointer'>
                           <div className='relative aspect-square overflow-hidden rounded-md'>
                              <Image
                                 src={item?.thumbnailM}
                                 alt={item?.title}
                                 fill
                                 sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                 className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
                              />
                           </div>
                           <div
                              className={`absolute inset-0 z-10 items-center rounded-lg gap-x-5 justify-center hidden group-hover:flex bg-black bg-opacity-40
                   `}
                           >
                              <Tooltip
                                 content={library.includes(item?.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}
                              >
                                 <button
                                    onClick={(e) => handleAddLibrary(e, item?.encodeId, item)}
                                    className={`hover:bg-white hover:bg-opacity-10 text-white rounded-full p-1.5 ${
                                       library.includes(item?.encodeId) && 'text-tprimary'
                                    }`}
                                 >
                                    {library.includes(item?.encodeId) ? (
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

                              <span className='border border-white text-white rounded-full p-2'>
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

                              <Tooltip content={'Khác'}>
                                 <button
                                    onClick={(e) => e.stopPropagation()}
                                    className='hover:bg-white text-white hover:bg-opacity-10 rounded-full p-1.5'
                                 >
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       fill='none'
                                       viewBox='0 0 24 24'
                                       strokeWidth={1.5}
                                       stroke='currentColor'
                                       className='w-6 h-6'
                                    >
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                                       />
                                    </svg>
                                 </button>
                              </Tooltip>
                           </div>
                        </div>
                        {title ? (
                           <div className='flex flex-col mt-2 gap-y-1'>
                              <span title={item?.title} className='font-medium truncate'>
                                 {item?.title}
                              </span>
                              <div className='text-secondary line-clamp-2'>
                                 {item?.artists?.map((artist, index) => {
                                    return index === item?.artists.length - 1 ? (
                                       <Link
                                          href={artist.link}
                                          key={artist.id}
                                          className='isHover cursor-pointer hover:underline'
                                       >
                                          {artist.name}
                                       </Link>
                                    ) : (
                                       <>
                                          <Link
                                             href={artist.link}
                                             key={artist.id}
                                             className='isHover cursor-pointer hover:underline'
                                          >
                                             {artist.name}
                                          </Link>
                                          ,{' '}
                                       </>
                                    )
                                 })}
                              </div>
                           </div>
                        ) : (
                           <p title={item?.sortDescription} className='text-secondary mt-2 line-clamp-2'>
                              {item?.sortDescription}
                           </p>
                        )}
                     </div>
                  ))}
               </div>
               <div className='grid sm:hidden grid-cols-2 gap-x-3 select-none'>
                  {list.slice(0, 2).map((item) => (
                     <div key={item?.encodeId}>
                        <div onClick={() => router.push(item?.link)} className='relative block group cursor-pointer'>
                           <div className='relative aspect-square overflow-hidden rounded-md'>
                              <Image
                                 src={item?.thumbnailM}
                                 alt={item?.title}
                                 fill
                                 sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                 className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
                              />
                           </div>
                           <div
                              className={`absolute inset-0 z-10 items-center rounded-lg gap-x-5 justify-center hidden group-hover:flex bg-black bg-opacity-40
                   `}
                           >
                              <Tooltip
                                 content={library.includes(item?.encodeId) ? 'Xoá khỏi thư viện' : 'Thêm vào thư viện'}
                              >
                                 <button
                                    onClick={(e) => handleAddLibrary(e, item?.encodeId, item)}
                                    className={`hover:bg-white hover:bg-opacity-10 text-white rounded-full p-1.5 ${
                                       library.includes(item?.encodeId) && 'text-tprimary'
                                    }`}
                                 >
                                    {library.includes(item?.encodeId) ? (
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

                              <span className='border border-white text-white rounded-full p-2'>
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

                              <Tooltip content={'Khác'}>
                                 <button
                                    onClick={(e) => e.stopPropagation()}
                                    className='hover:bg-white text-white hover:bg-opacity-10 rounded-full p-1.5'
                                 >
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       fill='none'
                                       viewBox='0 0 24 24'
                                       strokeWidth={1.5}
                                       stroke='currentColor'
                                       className='w-6 h-6'
                                    >
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                                       />
                                    </svg>
                                 </button>
                              </Tooltip>
                           </div>
                        </div>
                        {title ? (
                           <div className='flex flex-col mt-2 gap-y-1'>
                              <span title={item?.title} className='font-medium truncate'>
                                 {item?.title}
                              </span>
                              <div className='text-secondary line-clamp-2'>
                                 {item?.artists?.map((artist, index) => {
                                    return index === item?.artists.length - 1 ? (
                                       <Link
                                          href={artist.link}
                                          key={artist.id}
                                          className='isHover cursor-pointer hover:underline'
                                       >
                                          {artist.name}
                                       </Link>
                                    ) : (
                                       <>
                                          <Link
                                             href={artist.link}
                                             key={artist.id}
                                             className='isHover cursor-pointer hover:underline'
                                          >
                                             {artist.name}
                                          </Link>
                                          ,{' '}
                                       </>
                                    )
                                 })}
                              </div>
                           </div>
                        ) : (
                           <p title={item?.sortDescription} className='text-secondary mt-2 line-clamp-2'>
                              {item?.sortDescription}
                           </p>
                        )}
                     </div>
                  ))}
               </div>
            </>
         )}
      </>
   )
}
