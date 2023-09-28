'use client'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/perspective-extreme.css'
import { authApi, search } from '@/apis/home.api'
import Button from '@/components/Button/Button'
import ContextMenu from '@/components/ContextMenu/ContextMenu'
import ModalTheme from '@/components/Modal/ModalTheme'
import Tooltip from '@/components/Tooltip/Tooltip'
import { AppContext } from '@/contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const linkSearch: string[] = [
   'từ nơi tôi sinh ra',
   'sao trời làm gió',
   'ngày mai người ta lấy chồng',
   'anh đâu muốn thấy em buồn',
   'em là ai',
   'hoa cỏ lau'
]

export default function Header() {
   const [showContextMenu, setShowContextMenu] = useState<any>(null)
   const [open, setOpen] = useState<boolean>(false)
   const [openSearch, setOpenSearch] = useState<boolean>(false)
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
      setValue,
      formState: { isSubmitting }
   } = useForm<{ keyword: string }>({
      defaultValues: {
         keyword: ''
      }
   })

   const handleSearch = handleSubmit(async (data) => {
      if (data.keyword !== '') {
         router.push(`/tim-kiem/tat-ca?q=${data.keyword}`)
         const res = await search(data)
         setSearchData(res.data.data)
      }
   })

   // logout
   const logoutMutation = useMutation({
      mutationFn: authApi.logout,
      onSuccess: () => {
         setIsAuthenticated(false)
         setProfile(null)
         toast.success('Đăng xuất thành công')
         setOpen(false)
      }
   })
   const handleLogout = () => {
      logoutMutation.mutate()
   }

   // sự kiện chuột phải
   const handleCloseContextMenu = () => {
      setShowContextMenu(false)
   }
   useEffect(() => {
      const handleShowContextMenu = (e: any) => {
         let { clientX: left, clientY: top } = e
         if (left > window.innerWidth - 260) {
            left -= 250
         }
         if (top > window.innerHeight - 210) {
            top -= 200
         }
         setShowContextMenu({ left, top })
         e.preventDefault()
      }

      document.body.addEventListener('contextmenu', handleShowContextMenu)
      return () => {
         document.body.removeEventListener('contextmenu', handleShowContextMenu)
      }
   }, [])

   return (
      <div
         className={`fixed flex items-center gap-x-2 transition-all justify-between px-3 sm:px-8 min-[900px]:px-14 top-0 right-0 left-0 min-[900px]:left-[70px] xl:left-[240px] ${
            isScrolled ? 'bg-primary shadow-[0_3px_5px_rgba(0,_0,_0,_0.1)]' : 'bg-transparent'
         }  h-[70px] z-40`}
      >
         <div className='flex items-center gap-x-5 w-full'>
            <button className='disabled:opacity-50 hidden md:block' onClick={() => history.back()}>
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
            <button className='disabled:opacity-50 hidden md:block' onClick={() => history.forward()}>
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
            <div className='max-w-[440px] w-full relative'>
               <Tippy
                  animation={'perspective-extreme'}
                  onClickOutside={() => setOpenSearch(false)}
                  visible={openSearch}
                  content={
                     <div className='bg-modal absolute left-0 right-0 w-full rounded-b-[20px] px-2.5 py-3 shadow-lg'>
                        <h3 className='font-semibold px-2.5 pb-2'>Đề xuất cho bạn</h3>
                        <ul>
                           {linkSearch.map((item) => (
                              <li
                                 onClick={async () => {
                                    router.push(`/tim-kiem/tat-ca?q=${item}`)
                                    const res = await search({ keyword: item })
                                    setSearchData(res.data.data)
                                    setValue('keyword', item)
                                    setOpenSearch(false)
                                 }}
                                 key={item}
                                 className='flex items-center gap-x-2.5 px-2.5 py-2 li-search rounded cursor-pointer'
                              >
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-[18px] h-[18px] text-secondary'
                                 >
                                    <path
                                       strokeLinecap='round'
                                       strokeLinejoin='round'
                                       d='M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941'
                                    />
                                 </svg>
                                 <span>{item}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  }
                  interactive={true}
                  arrow={false}
                  offset={[0, 0]}
                  placement={'bottom-start'}
                  maxWidth={'auto'}
               >
                  <form
                     autoComplete='off'
                     onSubmit={handleSearch}
                     className={`flex h-10 items-center pl-2 form-search w-full ${
                        openSearch ? 'rounded-t-[20px] active' : 'rounded-full'
                     }`}
                  >
                     <button type='submit'>
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
                     </button>
                     <input
                        type='search'
                        placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                        className='outline-none h-full px-2 flex-shrink-0 w-full flex-1 bg-transparent'
                        {...register('keyword')}
                        onFocus={() => setOpenSearch(true)}
                     />

                     {isSubmitting && (
                        <div className='pr-2'>
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img
                              src={'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'}
                              width={20}
                              height={20}
                              className='w-4 h-4 object-cover'
                              alt=''
                           />
                        </div>
                     )}
                  </form>
               </Tippy>
            </div>
         </div>
         <div className='flex items-center gap-x-2 md:gap-x-4'>
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
            <Tippy
               animation={'perspective-extreme'}
               onClickOutside={() => setOpen(false)}
               visible={open}
               content={
                  <div className='bg-modal flex flex-col rounded-md z-[200]'>
                     {isAuthenticated ? (
                        <>
                           <Link
                              className='hover:bg-white flex items-center gap-x-2 hover:bg-opacity-10 px-7 py-2.5'
                              href={'/mymusic/profile'}
                           >
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 viewBox='0 0 24 24'
                                 fill='currentColor'
                                 className='w-[18px] h-[18px]'
                              >
                                 <path
                                    fillRule='evenodd'
                                    d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
                                    clipRule='evenodd'
                                 />
                              </svg>
                              Thông Tin
                           </Link>
                           <Button
                              onClick={handleLogout}
                              isLoading={logoutMutation.isLoading}
                              disabled={logoutMutation.isLoading}
                              className='hover:bg-white flex items-center gap-x-2 hover:bg-opacity-10 px-7 py-2.5'
                           >
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 strokeWidth={2}
                                 stroke='currentColor'
                                 className='w-[18px] h-[18px]'
                              >
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                                 />
                              </svg>
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
               interactive={true}
               arrow={false}
               offset={[0, 10]}
               placement={'bottom-end'}
            >
               <button
                  onClick={() => setOpen((prev) => !prev)}
                  className='w-10 h-10 rounded-full relative flex items-center overflow-hidden justify-center group'
               >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
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
            </Tippy>
         </div>
         <ModalTheme isOpen={openModalTheme} setIsOpen={setOpenModalTheme} />
         {showContextMenu && (
            <ContextMenu left={showContextMenu.left} top={showContextMenu.top} onClose={handleCloseContextMenu} />
         )}
      </div>
   )
}
