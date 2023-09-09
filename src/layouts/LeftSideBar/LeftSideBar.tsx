'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { AppContext } from '@/contexts/app.context'
const links: {
   url: string
   title: string
   icon?: React.JSX.Element
   image?: string
}[] = [
   {
      url: '/',
      title: 'Khám Phá',
      icon: (
         <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor'>
            <path
               fillRule='evenodd'
               clipRule='evenodd'
               d='M3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12ZM12 1.75C6.33908 1.75 1.75 6.33908 1.75 12C1.75 17.6609 6.33908 22.25 12 22.25C17.6609 22.25 22.25 17.6609 22.25 12C22.25 6.33908 17.6609 1.75 12 1.75ZM9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12ZM12 7.75C9.65279 7.75 7.75 9.65279 7.75 12C7.75 14.3472 9.65279 16.25 12 16.25C14.3472 16.25 16.25 14.3472 16.25 12C16.25 9.65279 14.3472 7.75 12 7.75Z'
               fillOpacity='0.8'
            />
         </svg>
      )
   },
   {
      url: '/zing-chart',
      title: '#zingchart',
      icon: (
         <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor'>
            <path
               fillRule='evenodd'
               clipRule='evenodd'
               d='M1.76078 11.5281C2.0086 6.08576 6.49865 1.75 12.0018 1.75C14.0559 1.75 15.971 2.35489 17.5759 3.39648C17.9234 3.62198 18.0222 4.08645 17.7967 4.4339C17.5712 4.78136 17.1068 4.88023 16.7593 4.65473C15.3901 3.76614 13.7574 3.25 12.0018 3.25C7.30422 3.25 3.47074 6.95138 3.25923 11.5963C3.24039 12.0101 2.88968 12.3303 2.47589 12.3114C2.06211 12.2926 1.74194 11.9419 1.76078 11.5281ZM21.5275 11.6871C21.9413 11.7057 22.2617 12.0563 22.243 12.4701C21.998 17.9149 17.5067 22.2536 12.0018 22.2536C9.89696 22.2536 7.93821 21.6184 6.30952 20.5292C5.9652 20.299 5.87274 19.8332 6.103 19.4889C6.33327 19.1446 6.79905 19.0521 7.14337 19.2824C8.53298 20.2117 10.203 20.7536 12.0018 20.7536C16.7009 20.7536 20.5354 17.0497 20.7445 12.4026C20.7632 11.9888 21.1137 11.6685 21.5275 11.6871ZM20.7535 8.05986C20.7535 7.40256 20.2207 6.86972 19.5634 6.86972C18.9061 6.86972 18.3732 7.40256 18.3732 8.05986C18.3732 8.71715 18.9061 9.25 19.5634 9.25C20.2207 9.25 20.7535 8.71715 20.7535 8.05986ZM19.5634 5.36972C21.0491 5.36972 22.2535 6.57413 22.2535 8.05986C22.2535 9.54558 21.0491 10.75 19.5634 10.75C19.1208 10.75 18.7031 10.6431 18.3349 10.4537L15.5083 14.5112C15.3814 14.6933 15.1803 14.8099 14.9592 14.8295C14.738 14.8491 14.5196 14.7698 14.3626 14.6128L13.3637 13.6139L12.2257 15.3202C12.0906 15.5227 11.8658 15.6471 11.6225 15.6538C11.3793 15.6605 11.1478 15.5488 11.0018 15.3542L9.05228 12.7558L6.78385 15.0242C6.75187 15.0562 6.71772 15.0847 6.68188 15.1097C6.80299 15.4073 6.86972 15.7328 6.86972 16.074C6.86972 17.4877 5.72363 18.6338 4.30986 18.6338C2.89609 18.6338 1.75 17.4877 1.75 16.074C1.75 14.6602 2.89609 13.5141 4.30986 13.5141C4.83856 13.5141 5.32983 13.6744 5.73772 13.949L8.60299 11.0837C8.75671 10.93 8.96957 10.8506 9.18642 10.8659C9.40327 10.8813 9.60278 10.9901 9.73324 11.164L11.5657 13.6064L12.6234 12.0207C12.748 11.8338 12.9499 11.7126 13.1735 11.6905C13.3971 11.6684 13.6188 11.7477 13.7776 11.9065L14.7897 12.9186L17.2351 9.40829C17.005 9.01185 16.8732 8.55124 16.8732 8.05986C16.8732 6.57413 18.0777 5.36972 19.5634 5.36972ZM4.30986 15.0141C4.8952 15.0141 5.36972 15.4886 5.36972 16.074C5.36972 16.6593 4.8952 17.1338 4.30986 17.1338C3.72452 17.1338 3.25 16.6593 3.25 16.074C3.25 15.4886 3.72452 15.0141 4.30986 15.0141Z'
               fill='#currentColor'
               fillOpacity='0.8'
            />
         </svg>
      )
   },
   {
      url: '/radio',
      title: 'Radio',
      icon: (
         <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor'>
            <path
               fillRule='evenodd'
               clipRule='evenodd'
               d='M11.8722 2.67978C11.911 3.09217 11.6082 3.45794 11.1958 3.49675C6.88011 3.90291 3.5 7.54519 3.5 11.98C3.5 16.6875 7.30771 20.501 12.0014 20.501C16.6952 20.501 20.5029 16.6875 20.5029 11.98C20.5029 10.3767 20.0618 8.87895 19.2951 7.59953C19.0822 7.24422 19.1976 6.78359 19.5529 6.57068C19.9082 6.35777 20.3688 6.4732 20.5818 6.82851C21.4842 8.33451 22.0029 10.0978 22.0029 11.98C22.0029 17.513 17.5266 22.001 12.0014 22.001C6.4763 22.001 2 17.513 2 11.98C2 6.76649 5.9737 2.48158 11.0553 2.00335C11.4676 1.96454 11.8334 2.26739 11.8722 2.67978ZM11.8656 6.19339C11.9286 6.60278 11.6479 6.98576 11.2385 7.0488C8.85318 7.4161 7.02419 9.48361 7.02419 11.9799C7.02419 13.3678 7.58856 14.622 8.50124 15.527C8.79536 15.8186 8.79736 16.2935 8.50571 16.5876C8.21405 16.8818 7.73918 16.8838 7.44506 16.5921C6.25964 15.4166 5.52419 13.7835 5.52419 11.9799C5.52419 8.73441 7.90208 6.04487 11.0102 5.56627C11.4196 5.50323 11.8026 5.784 11.8656 6.19339ZM16.7493 8.68305C17.1175 8.49328 17.5698 8.63791 17.7595 9.00609C18.2192 9.89782 18.4783 10.9096 18.4783 11.9799C18.4783 15.5622 15.58 18.469 12.0013 18.469C11.5871 18.469 11.2513 18.1333 11.2513 17.719C11.2513 17.3048 11.5871 16.969 12.0013 16.969C14.7485 16.969 16.9783 14.7368 16.9783 11.9799C16.9783 11.1542 16.7788 10.3774 16.4262 9.69332C16.2365 9.32514 16.3811 8.87282 16.7493 8.68305ZM14.3787 2.2439C13.9763 2.14558 13.5704 2.39207 13.4721 2.79444C13.4513 2.87927 13.4459 2.96425 13.4541 3.04647V9.4046C13.0253 9.16142 12.5297 9.02255 12.0013 9.02255C10.3691 9.02255 9.04861 10.3481 9.04861 11.9799C9.04861 13.6117 10.3691 14.9373 12.0013 14.9373C13.6336 14.9373 14.9541 13.6117 14.9541 11.9799C14.9541 11.9479 14.9535 11.916 14.9525 11.8842C14.9536 11.8681 14.9541 11.8519 14.9541 11.8355V3.98669C15.7486 4.28167 16.4875 4.69246 17.1504 5.19895C17.4795 5.45044 17.9502 5.3875 18.2017 5.05837C18.4532 4.72924 18.3902 4.25855 18.0611 4.00706C16.9849 3.18473 15.7363 2.57565 14.3787 2.2439ZM12.0013 10.5225C11.2005 10.5225 10.5486 11.1735 10.5486 11.9799C10.5486 12.7863 11.2005 13.4373 12.0013 13.4373C12.8022 13.4373 13.4541 12.7863 13.4541 11.9799C13.4541 11.1735 12.8022 10.5225 12.0013 10.5225Z'
               fillOpacity='0.8'
            />
         </svg>
      )
   },

   {
      url: '/moi-phat-hanh',
      title: 'Nhạc Mới',
      icon: (
         <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor'>
            <path
               fillRule='evenodd'
               clipRule='evenodd'
               d='M20.25 2C20.25 1.58579 19.9142 1.25 19.5 1.25C19.0858 1.25 18.75 1.58579 18.75 2C18.75 2.95195 18.4626 3.63685 18.0656 4.07478C17.6709 4.51015 17.1258 4.75 16.5 4.75C16.0858 4.75 15.75 5.08579 15.75 5.5C15.75 5.91421 16.0858 6.25 16.5 6.25C17.126 6.25 17.671 6.48996 18.0657 6.9254C18.4628 7.36341 18.75 8.04835 18.75 9C18.75 9.41421 19.0858 9.75 19.5 9.75C19.9142 9.75 20.25 9.41421 20.25 9C20.25 8.04805 20.5374 7.36315 20.9344 6.92522C21.3291 6.48985 21.8742 6.25 22.5 6.25C22.9142 6.25 23.25 5.91421 23.25 5.5C23.25 5.08579 22.9142 4.75 22.5 4.75C21.874 4.75 21.329 4.51004 20.9343 4.0746C20.5372 3.63659 20.25 2.95165 20.25 2ZM19.1769 5.08231C19.2934 4.95373 19.4013 4.81641 19.5 4.6709C19.5987 4.81629 19.7064 4.95351 19.8229 5.082C19.9625 5.23602 20.1129 5.37549 20.2725 5.49999C20.113 5.62441 19.9627 5.76378 19.8231 5.91769C19.7066 6.04627 19.5987 6.18359 19.5 6.3291C19.4013 6.18371 19.2936 6.04649 19.1771 5.918C19.0375 5.76398 18.8871 5.62451 18.7275 5.50001C18.887 5.37559 19.0373 5.23622 19.1769 5.08231ZM13.5095 5.31294C13.5652 5.72339 13.2776 6.10128 12.8672 6.15698L12.3492 6.22728L11.3238 6.36644C10.186 6.55633 9.25 7.65728 9.25 8.74999V18.5C9.25 20.5711 7.57107 22.25 5.5 22.25C3.42893 22.25 1.75 20.5711 1.75 18.5C1.75 16.4289 3.42893 14.75 5.5 14.75C6.3442 14.75 7.12325 15.0289 7.75 15.4997V8.74999C7.75 6.89294 9.25015 5.18376 11.0921 4.88439L11.1116 4.88149L12.1475 4.7409L12.6655 4.67061C13.0759 4.61491 13.4538 4.90249 13.5095 5.31294ZM5.5 16.25C6.74264 16.25 7.75 17.2573 7.75 18.5C7.75 19.7426 6.74264 20.75 5.5 20.75C4.25736 20.75 3.25 19.7426 3.25 18.5C3.25 17.2573 4.25736 16.25 5.5 16.25ZM19.5 11.75C19.9142 11.75 20.25 12.0858 20.25 12.5V17.5C20.25 19.5711 18.5711 21.25 16.5 21.25C14.4289 21.25 12.75 19.5711 12.75 17.5C12.75 15.4289 14.4289 13.75 16.5 13.75C17.3442 13.75 18.1233 14.0289 18.75 14.4997V12.5C18.75 12.0858 19.0858 11.75 19.5 11.75ZM16.5 15.25C17.7426 15.25 18.75 16.2573 18.75 17.5C18.75 18.7426 17.7426 19.75 16.5 19.75C15.2574 19.75 14.25 18.7426 14.25 17.5C14.25 16.2573 15.2574 15.25 16.5 15.25Z'
               fillOpacity='0.8'
            />
         </svg>
      )
   },
   {
      url: '/top100',
      title: 'Top 100',
      icon: (
         <svg width={24} height={24} viewBox='0 0 24 24' fill='none'>
            <path
               fillRule='evenodd'
               clipRule='evenodd'
               d='M12 17L7.01888 19.6187C6.65207 19.8116 6.22335 19.5001 6.29341 19.0916L7.24472 13.5451L3.21491 9.61699C2.91815 9.32773 3.08191 8.82374 3.49202 8.76415L9.06107 7.95491L11.5516 2.90849C11.735 2.53687 12.265 2.53687 12.4484 2.90849L14.9389 7.95491L20.508 8.76415C20.9181 8.82374 21.0818 9.32773 20.7851 9.61699L16.7553 13.5451L17.7066 19.0916C17.7766 19.5001 17.3479 19.8116 16.9811 19.6187L12 17Z'
               stroke='currentColor'
               strokeOpacity='0.8'
               strokeWidth='1.5'
            />
         </svg>
      )
   },
   {
      url: '/the-loai-video/Viet-Nam/IWZ9Z08I.html',
      title: 'MV',
      icon: (
         <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5 mr-1 translate-x-[1px]'
         >
            <path
               strokeLinecap='round'
               strokeLinejoin='round'
               d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5'
            />
         </svg>
      )
   },
   {
      url: '/library/songs',
      title: 'Bài Hát',
      image: 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-song.cf0cb0b4.svg'
   },
   {
      url: '/library/playlist',
      title: 'Playlist',
      image: 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg'
   },
   {
      url: '/library/recent',
      title: 'Gần Đây',
      image: 'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg'
   }
]

export default function LeftSideBar() {
   const pathname = usePathname()
   const { currentSongId, isAuthenticated } = useContext(AppContext)
   const router = useRouter()
   const [showSideBar, setShowSideBar] = useState<boolean>(false)
   return (
      <>
         <div
            className={`w-full ${
               showSideBar ? 'max-w-[240px]' : 'max-w-[70px]'
            } transition-all duration-300 xl:max-w-[240px] fixed left-0 top-0 ${
               currentSongId ? 'bottom-[90px]' : 'bottom-0'
            } bg-modal xl:bg-white xl:bg-opacity-5 z-50 hidden min-[900px]:block`}
         >
            <div className={`py-4 xl:pl-7 ${showSideBar && 'pl-7'}`}>
               <Link href={'/'} className='inline-block'>
                  <Image
                     width={120}
                     height={34}
                     className={`w-[120px] h-[34px] object-cover logo ${!showSideBar && 'hidden'} xl:block`}
                     src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg'}
                     alt='logo'
                  />
                  <Image
                     width={50}
                     height={45}
                     className={`w-[50px] mx-[10px] block xl:hidden h-[45px] object-cover ${showSideBar && 'hidden'}`}
                     src={
                        'https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.8.22/static/media/icon_zing_mp3_60.f6b51045.svg'
                     }
                     alt='logo'
                  />
               </Link>
            </div>
            <ul>
               {links.slice(0, 3).map((link) => (
                  <li
                     title={link.title}
                     className={`${pathname === link.url && 'border-l-[3px] border-l-tprimary bg-white bg-opacity-20'}`}
                     key={link.title}
                  >
                     <Link
                        href={link.url}
                        className={`flex items-center gap-x-2.5 py-3 pl-5 pr-5 ${
                           pathname === link.url ? 'pl-[17px]' : 'text-grayDa hover:text-white'
                        }`}
                     >
                        {link.icon}
                        <span className={`font-medium xl:block ${!showSideBar && 'hidden'}`}>{link.title}</span>
                        {link.title === 'Radio' && (
                           <Image
                              src={'https://zjs.zmdcdn.me/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg'}
                              alt=''
                              width={34}
                              height={16}
                              className={`w-[34px] h-4 object-cover xl:block ${!showSideBar && 'hidden'}`}
                           />
                        )}
                     </Link>
                  </li>
               ))}
               <li
                  title='Thư Viện'
                  className={`${
                     pathname.includes('/mymusic') && 'border-l-[3px] border-l-tprimary bg-white bg-opacity-20'
                  }`}
               >
                  <button
                     onClick={() => {
                        if (isAuthenticated) {
                           router.push('/mymusic/song')
                        } else {
                           router.push('/login')
                           toast.warning('Vui lòng đăng nhập')
                        }
                     }}
                     className={`flex items-center gap-x-2.5 py-3 pl-5 pr-5 ${
                        pathname.includes('/mymusic') ? 'pl-[17px]' : 'text-grayDa hover:text-white'
                     }`}
                  >
                     <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor'>
                        <path
                           fillRule='evenodd'
                           clipRule='evenodd'
                           d='M6.5 2.75C6.08579 2.75 5.75 3.08579 5.75 3.5C5.75 3.91421 6.08579 4.25 6.5 4.25H17.5C17.9142 4.25 18.25 3.91421 18.25 3.5C18.25 3.08579 17.9142 2.75 17.5 2.75H6.5ZM3 9.5C3 7.42893 4.67893 5.75 6.75 5.75H17.25C19.3211 5.75 21 7.42893 21 9.5V17.5C21 19.5711 19.3211 21.25 17.25 21.25H6.75C4.67893 21.25 3 19.5711 3 17.5V9.5ZM6.75 7.25C5.50736 7.25 4.5 8.25736 4.5 9.5V17.5C4.5 18.7426 5.50736 19.75 6.75 19.75H17.25C18.4926 19.75 19.5 18.7426 19.5 17.5V9.5C19.5 8.25736 18.4926 7.25 17.25 7.25H6.75ZM13.666 8.87596C13.4359 8.72253 13.14 8.70823 12.8961 8.83874C12.6522 8.96926 12.5 9.2234 12.5 9.5V13.0499C12.125 12.8581 11.7001 12.75 11.25 12.75C9.73122 12.75 8.5 13.9812 8.5 15.5C8.5 17.0188 9.73122 18.25 11.25 18.25C12.6911 18.25 13.8733 17.1415 13.9905 15.7307C13.9967 15.6916 14 15.6515 14 15.6107V15.5V10.9014L15.084 11.624C15.4286 11.8538 15.8943 11.7607 16.124 11.416C16.3538 11.0714 16.2607 10.6057 15.916 10.376L13.666 8.87596ZM12.5 15.5C12.5 14.8096 11.9404 14.25 11.25 14.25C10.5596 14.25 10 14.8096 10 15.5C10 16.1904 10.5596 16.75 11.25 16.75C11.9404 16.75 12.5 16.1904 12.5 15.5Z'
                           fillOpacity='0.8'
                        />
                     </svg>
                     <span className={`font-medium xl:block ${!showSideBar && 'hidden'}`}>Thư Viện</span>
                  </button>
               </li>
            </ul>
            <div className='my-3 px-5'>
               <div className='border-b border-b-gray-700 ' />
            </div>
            <div
               className={`overflow-y-auto ${currentSongId ? 'h-[calc(100vh-429.67px)]' : 'h-[calc(100vh-339.67px)]'}`}
            >
               <ul>
                  {links.slice(3, 6).map((link) => (
                     <li
                        title={link.title}
                        className={`${
                           pathname === link.url && 'border-l-[3px] border-l-tprimary bg-white bg-opacity-20'
                        }`}
                        key={link.title}
                     >
                        <Link
                           href={link.url}
                           className={`flex items-center gap-x-2.5 py-3 pl-5 pr-5 ${
                              pathname === link.url ? 'pl-[17px]' : 'text-grayDa hover:text-white'
                           }`}
                        >
                           {link.icon}
                           <span className={`font-medium xl:block ${!showSideBar && 'hidden'}`}>{link.title}</span>
                        </Link>
                     </li>
                  ))}
               </ul>
               <div
                  style={{
                     backgroundImage: isAuthenticated ? 'linear-gradient(117deg,#614de5,#b567d9)' : ''
                  }}
                  className={`my-3 py-5 px-2.5 hidden mx-auto xl:block text-center rounded-[10px] w-[90%] text-white ${
                     !isAuthenticated && 'bg-tprimary'
                  }`}
               >
                  <p className='mb-2.5'>
                     {isAuthenticated
                        ? 'Nghe nhạc không quảng cáo cùng kho nhạc VIP'
                        : 'Đăng nhập để khám phá playlist dành riêng cho bạn'}
                  </p>
                  <button
                     onClick={() => !isAuthenticated && router.push('/login')}
                     className={`${
                        isAuthenticated
                           ? 'bg-yellow-500 hover:bg-opacity-90'
                           : 'bg-white bg-opacity-10 hover:bg-opacity-20 border border-white'
                     } px-8 py-1 rounded-full text-[13px]`}
                  >
                     {isAuthenticated ? 'NÂNG CẤP VIP' : 'ĐĂNG NHẬP'}
                  </button>
               </div>
               {isAuthenticated && (
                  <>
                     <span className='font-semibold text-base px-5 hidden xl:block'>Thư viện</span>
                     <ul className='hidden xl:block'>
                        {links.slice(6).map((link) => (
                           <li
                              title={link.title}
                              className={`${
                                 pathname === link.url && 'border-l-[3px] border-l-tprimary bg-white bg-opacity-10'
                              }`}
                              key={link.title}
                           >
                              <Link
                                 href={link.url}
                                 className={`flex items-center gap-x-2.5 py-3 pl-5 pr-5 ${
                                    pathname === link.url ? 'pl-[17px]' : 'text-grayDa hover:text-white'
                                 }`}
                              >
                                 <Image
                                    src={link.image as string}
                                    alt={link.title}
                                    width={24}
                                    height={24}
                                    className='w-6 h-6 object-cover'
                                 />
                                 <span className='font-medium'>{link.title}</span>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </>
               )}
            </div>
            <button
               onClick={() => toast.warning('Chức năng này chưa hoàn thiện')}
               className={`${
                  showSideBar ? 'flex' : 'hidden'
               } xl:flex absolute bottom-0 left-0 right-0 h-[52px] items-center gap-x-3 px-7 border-t border-t-gray-700 w-full`}
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
               >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
               </svg>
               Tạo playlist mới
            </button>
            <button
               onClick={() => setShowSideBar((prev) => !prev)}
               className={`flex xl:hidden absolute hover:bg-opacity-20 ${
                  showSideBar ? 'right-1 bottom-1' : 'bottom-3 left-0 right-0 mx-auto'
               } h-10 w-10 justify-center items-center bg-white rounded-full bg-opacity-10`}
            >
               {showSideBar ? (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={1.5}
                     stroke='currentColor'
                     className='w-6 h-6'
                  >
                     <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
               ) : (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     fill='none'
                     viewBox='0 0 24 24'
                     strokeWidth={1.5}
                     stroke='currentColor'
                     className='w-5 h-5'
                  >
                     <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
               )}
            </button>
         </div>

         {/* mobile */}
         <ul className='fixed min-[900px]:hidden left-0 right-0 text-xs bottom-0 border-t border-t-gray-800 h-[55px] flex items-center bg-secondary z-[1000]'>
            {links.slice(0, 3).map((link) => (
               <li key={link.title} className='flex-1'>
                  <Link
                     href={link.url}
                     className={`flex flex-col items-center justify-center w-full  ${
                        pathname === link.url ? 'text-tprimary' : 'text-grayDa'
                     }`}
                  >
                     {link.icon}
                     <span className={`font-medium`}>{link.title}</span>
                  </Link>
               </li>
            ))}
            <li className='flex-1' title='Thư Viện'>
               <button
                  onClick={() => {
                     if (isAuthenticated) {
                        router.push('/mymusic/song')
                     } else {
                        router.push('/login')
                        toast.warning('Vui lòng đăng nhập')
                     }
                  }}
                  className={`flex flex-col items-center justify-center w-full ${
                     pathname.includes('/mymusic') ? 'text-tprimary' : 'text-grayDa'
                  }`}
               >
                  <svg width={24} height={24} viewBox='0 0 24 24' fill='currentColor'>
                     <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M6.5 2.75C6.08579 2.75 5.75 3.08579 5.75 3.5C5.75 3.91421 6.08579 4.25 6.5 4.25H17.5C17.9142 4.25 18.25 3.91421 18.25 3.5C18.25 3.08579 17.9142 2.75 17.5 2.75H6.5ZM3 9.5C3 7.42893 4.67893 5.75 6.75 5.75H17.25C19.3211 5.75 21 7.42893 21 9.5V17.5C21 19.5711 19.3211 21.25 17.25 21.25H6.75C4.67893 21.25 3 19.5711 3 17.5V9.5ZM6.75 7.25C5.50736 7.25 4.5 8.25736 4.5 9.5V17.5C4.5 18.7426 5.50736 19.75 6.75 19.75H17.25C18.4926 19.75 19.5 18.7426 19.5 17.5V9.5C19.5 8.25736 18.4926 7.25 17.25 7.25H6.75ZM13.666 8.87596C13.4359 8.72253 13.14 8.70823 12.8961 8.83874C12.6522 8.96926 12.5 9.2234 12.5 9.5V13.0499C12.125 12.8581 11.7001 12.75 11.25 12.75C9.73122 12.75 8.5 13.9812 8.5 15.5C8.5 17.0188 9.73122 18.25 11.25 18.25C12.6911 18.25 13.8733 17.1415 13.9905 15.7307C13.9967 15.6916 14 15.6515 14 15.6107V15.5V10.9014L15.084 11.624C15.4286 11.8538 15.8943 11.7607 16.124 11.416C16.3538 11.0714 16.2607 10.6057 15.916 10.376L13.666 8.87596ZM12.5 15.5C12.5 14.8096 11.9404 14.25 11.25 14.25C10.5596 14.25 10 14.8096 10 15.5C10 16.1904 10.5596 16.75 11.25 16.75C11.9404 16.75 12.5 16.1904 12.5 15.5Z'
                        fillOpacity='0.8'
                     />
                  </svg>
                  <span className={`font-medium`}>Thư Viện</span>
               </button>
            </li>
         </ul>
      </>
   )
}
