'use client'
import { getCategoryMV, getListMV } from '@/apis/home.api'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/perspective-extreme.css'
import Link from 'next/link'
import Loading from '@/components/Loading/Loading'
import MvArtistItem from '@/components/MvArtistItem/MvArtistItem'
import { Item } from '@/types/artist.type'
import { AppContext } from '@/contexts/app.context'

export default function MV({ params }: { params: { id: string } }) {
   const { categoryMv, setCategoryMv } = useContext(AppContext)
   const [open, setOpen] = useState<boolean>(false)
   const { data } = useQuery({
      queryKey: ['categorymv', params],
      queryFn: () => getCategoryMV({ id: params.id.replace('.html', '') })
   })
   const { data: listmvData } = useQuery({
      queryKey: ['listmv', data?.data.data.id as string],
      queryFn: () => getListMV({ id: data?.data.data.id as string, page: 1, count: 50 })
   })
   const categories = data?.data.data.childs
   const listMV = listmvData?.data.data?.items
   useEffect(() => {
      if (['IWZ9Z08I', 'IWZ9Z08O', 'IWZ9Z08W', 'IWZ9Z086'].includes(params.id.replace('.html', ''))) {
         setCategoryMv('Tất Cả')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params.id])
   return (
      <div>
         <Tippy
            animation={'perspective-extreme'}
            onClickOutside={() => setOpen(false)}
            visible={open}
            content={
               <div className='relative'>
                  <div
                     style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
                     }}
                     className='absolute w-5 h-3 bg-modal top-0 left-3 -translate-y-full rotate-180'
                  />
                  <ul className='bg-modal p-1 text-xs rounded-lg grid grid-cols-2'>
                     {categories ? (
                        categories.map((item) => (
                           <li key={item.id}>
                              <Link
                                 href={item?.link}
                                 onClick={() => setCategoryMv(item.title)}
                                 className='p-2 block rounded-md hover:bg-white hover:bg-opacity-10'
                              >
                                 {item.title}
                              </Link>
                           </li>
                        ))
                     ) : (
                        <Loading />
                     )}
                  </ul>
               </div>
            }
            interactive={true}
            arrow={false}
            offset={[0, 15]}
            placement={'bottom-start'}
         >
            <button
               onClick={() => setOpen((prev) => !prev)}
               className='bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full px-3.5 py-1.5 inline-flex items-center gap-x-2'
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     d='M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z'
                  />
               </svg>
               {categoryMv}
               {open ? (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={2}
                     stroke='currentColor'
                     className='w-4 h-4'
                  >
                     <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
                  </svg>
               ) : (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={2}
                     stroke='currentColor'
                     className='w-4 h-4'
                  >
                     <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                  </svg>
               )}
            </button>
         </Tippy>
         {listMV ? (
            <ul className='mt-5 grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6'>
               {listMV.map((item) => (
                  <MvArtistItem key={item.encodeId} item={item as Item} />
               ))}
            </ul>
         ) : (
            <Loading />
         )}
      </div>
   )
}
