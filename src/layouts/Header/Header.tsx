'use client'
import { authApi, search } from '@/apis/home.api'
import Button from '@/components/Button/Button'
import ModalTheme from '@/components/Modal/ModalTheme'
import Popover from '@/components/Popover/Popover'
import Tooltip from '@/components/Tooltip/Tooltip'
import { AppContext } from '@/contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function Header() {
   const { setSearchData, profile, isAuthenticated, setIsAuthenticated, setProfile } = useContext(AppContext)
   const [isScrolled, setIsScrolled] = useState<boolean>(false)
   const [openModalTheme, setOpenModalTheme] = useState<boolean>(false)
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

   // logout
   const logoutMutation = useMutation({
      mutationFn: authApi.logout,
      onSuccess: () => {
         setIsAuthenticated(false)
         setProfile(null)
      }
   })
   const handleLogout = () => {
      logoutMutation.mutate()
   }

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
                  className='outline-none h-full px-2 flex-1 bg-transparent placeholder:text-[#999]'
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
         <div className='flex items-center gap-x-4'>
            <Tooltip bottomCenter content='Chủ đề'>
               <button
                  onClick={() => setOpenModalTheme(true)}
                  className='w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center'
               >
                  <svg width={20} height={20} viewBox='0 0 20 20'>
                     <defs>
                        <linearGradient id='j32lhg93hd' x1='62.206%' x2='18.689%' y1='70.45%' y2='39.245%'>
                           <stop offset='0%' stopColor='#F81212' />
                           <stop offset='100%' stopColor='red' />
                        </linearGradient>
                        <linearGradient id='hjoavsus6g' x1='50%' x2='11.419%' y1='23.598%' y2='71.417%'>
                           <stop offset='0%' stopColor='#00F' />
                           <stop offset='100%' stopColor='#0031FF' />
                        </linearGradient>
                        <linearGradient id='la1y5u3dvi' x1='65.655%' x2='25.873%' y1='18.825%' y2='56.944%'>
                           <stop offset='0%' stopColor='#FFA600' />
                           <stop offset='100%' stopColor='orange' />
                        </linearGradient>
                        <linearGradient id='2dsmrlvdik' x1='24.964%' x2='63.407%' y1='8.849%' y2='55.625%'>
                           <stop offset='0%' stopColor='#13EFEC' />
                           <stop offset='100%' stopColor='#00E8DF' />
                        </linearGradient>
                        <filter
                           id='4a7imk8mze'
                           width='230%'
                           height='230%'
                           x='-65%'
                           y='-65%'
                           filterUnits='objectBoundingBox'
                        >
                           <feGaussianBlur in='SourceGraphic' stdDeviation='3.9' />
                        </filter>
                        <filter
                           id='301mo6jeah'
                           width='312.7%'
                           height='312.7%'
                           x='-106.4%'
                           y='-106.4%'
                           filterUnits='objectBoundingBox'
                        >
                           <feGaussianBlur in='SourceGraphic' stdDeviation='3.9' />
                        </filter>
                        <filter
                           id='b2zvzgq7fj'
                           width='295%'
                           height='295%'
                           x='-97.5%'
                           y='-97.5%'
                           filterUnits='objectBoundingBox'
                        >
                           <feGaussianBlur in='SourceGraphic' stdDeviation='3.9' />
                        </filter>
                        <filter
                           id='a1wq161tvl'
                           width='256%'
                           height='256%'
                           x='-78%'
                           y='-78%'
                           filterUnits='objectBoundingBox'
                        >
                           <feGaussianBlur in='SourceGraphic' stdDeviation='3.9' />
                        </filter>
                        <path
                           id='qtpqrj1oda'
                           d='M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z'
                        />
                        <path id='jggzvnjgfc' d='M0 0H20V20H0z' />
                        <path
                           id='2eiwxjmc7m'
                           d='M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z'
                        />
                     </defs>
                     <g fill='none' fillRule='evenodd' transform='translate(2 3)'>
                        <mask id='tinejqaasb' fill='#fff'>
                           <use xlinkHref='#qtpqrj1oda' />
                        </mask>
                        <use fill='#FFF' fillOpacity={0} xlinkHref='#qtpqrj1oda' />
                        <g mask='url(#tinejqaasb)'>
                           <g transform='translate(-2 -3)'>
                              <mask id='uf3ckvfvpf' fill='#fff'>
                                 <use xlinkHref='#jggzvnjgfc' />
                              </mask>
                              <use fill='#D8D8D8' xlinkHref='#jggzvnjgfc' />
                              <circle
                                 cx='8.9'
                                 cy='6.8'
                                 r={9}
                                 fill='url(#j32lhg93hd)'
                                 filter='url(#4a7imk8mze)'
                                 mask='url(#uf3ckvfvpf)'
                              />
                              <circle
                                 cx='9.3'
                                 cy='13.7'
                                 r='5.5'
                                 fill='url(#hjoavsus6g)'
                                 filter='url(#301mo6jeah)'
                                 mask='url(#uf3ckvfvpf)'
                              />
                              <circle
                                 cx='15.9'
                                 cy='6.9'
                                 r={6}
                                 fill='url(#la1y5u3dvi)'
                                 filter='url(#b2zvzgq7fj)'
                                 mask='url(#uf3ckvfvpf)'
                              />
                              <circle
                                 cx='16.4'
                                 cy='17.7'
                                 r='7.5'
                                 fill='url(#2dsmrlvdik)'
                                 filter='url(#a1wq161tvl)'
                                 mask='url(#uf3ckvfvpf)'
                              />
                           </g>
                        </g>
                        <use fill='#FFF' fillOpacity='0.05' xlinkHref='#2eiwxjmc7m' />
                     </g>
                  </svg>
               </button>
            </Tooltip>
            <Popover
               renderPopover={
                  <div className='bg-modal flex flex-col rounded-md z-[200]'>
                     {isAuthenticated ? (
                        <>
                           <Link className='hover:bg-white hover:bg-opacity-10 px-7 py-2.5' href={'/mymusic/profile'}>
                              Thông Tin
                           </Link>
                           <Button
                              onClick={handleLogout}
                              isLoading={logoutMutation.isLoading}
                              disabled={logoutMutation.isLoading}
                              className='hover:bg-white hover:bg-opacity-10 px-7 py-2.5'
                           >
                              Đăng Xuất
                           </Button>
                        </>
                     ) : (
                        <>
                           <Link className='hover:bg-white hover:bg-opacity-10 px-7 py-2.5' href={'/register'}>
                              Đăng Ký
                           </Link>
                           <Link className='hover:bg-white hover:bg-opacity-10 px-7 py-2.5' href={'/login'}>
                              Đăng Nhập
                           </Link>
                        </>
                     )}
                  </div>
               }
               posistion='bottom'
               arrowClass='absolute h-[10px] w-6 -translate-y-full bg-modal'
               transformOrigin='top'
               isClick
            >
               <button className='w-10 h-10 rounded-full relative flex items-center overflow-hidden justify-center group'>
                  <Image
                     src={
                        profile?.avatar
                           ? `https://api-ecom.duthanhduoc.com/images/${profile?.avatar}`
                           : 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.67/static/media/user-default.3ff115bb.png'
                     }
                     alt='avatar'
                     width={40}
                     height={40}
                     className='w-full h-full object-cover rounded-full'
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-20 z-10 hidden group-hover:block' />
               </button>
            </Popover>
         </div>
         <ModalTheme isOpen={openModalTheme} setIsOpen={setOpenModalTheme} />
      </div>
   )
}
