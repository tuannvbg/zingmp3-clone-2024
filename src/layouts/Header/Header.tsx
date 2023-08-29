'use client'
import { search } from '@/apis/home.api'
import { AppContext } from '@/contexts/app.context'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function Header() {
   const { setSearchData } = useContext(AppContext)
   const [isScrolled, setIsScrolled] = useState<boolean>(false)
   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 0) {
            setIsScrolled(true)
         } else {
            setIsScrolled(false)
         }
      }

      window.addEventListener('scroll', handleScroll)
      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])
   const router = useRouter()
   const {
      register,
      handleSubmit,
      formState: { isSubmitting }
   } = useForm<{ keyword: string }>({
      defaultValues: {
         keyword: ''
      }
   })

   const handleSearch = handleSubmit(async (data) => {
      if (data.keyword !== '') {
         const res = await search(data)
         setSearchData(res.data.data)
         router.push(`/tim-kiem/tat-ca?q=${data.keyword}`)
      }
   })

   return (
      <div
         className={`fixed flex items-center transition-all justify-between px-14 top-0 right-0 left-[240px] ${
            isScrolled ? 'bg-primary shadow-[0_3px_5px_rgba(0,_0,_0,_0.1)]' : 'bg-transparent'
         }  h-[70px] z-40`}
      >
         <div className='flex items-center gap-x-5'>
            <button>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
               >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
               </svg>
            </button>
            <button>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
               >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
               </svg>
            </button>
            <form
               onSubmit={handleSearch}
               className='flex h-10 items-center pl-2 bg-white bg-opacity-10 rounded-full w-[440px]'
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
                     d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
               </svg>
               <input
                  type='text'
                  placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                  className='outline-none h-full px-2 flex-1 bg-transparent placeholder:text-grayDa'
                  {...register('keyword')}
               />
               {isSubmitting && (
                  <div className='pr-2'>
                     <Image
                        src={'https://i.gifer.com/ZKZg.gif'}
                        width={20}
                        height={20}
                        className='w-4 h-4 object-cover'
                        alt=''
                     />
                  </div>
               )}
            </form>
         </div>
         <button>Login</button>
      </div>
   )
}
