import useLocalStorage from '@/hooks/useLocalStorage'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'

interface Props {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const themes: {
   title: string
   img: string
   image: string
}[] = [
   {
      title: 'XONE',
      img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/xone-thumbn.jpg',
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/xone-bg.jpg'
   },
   {
      title: 'Zing Music Awards',
      img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/zma.jpg',
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/zma.svg'
   },
   {
      title: 'Tháp Eiffel',
      img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/eiffel.jpg',
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/eiffel.jpg'
   },
   {
      title: 'Jack',
      img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jack.jpg',
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/jack.jpg'
   },
   {
      title: 'IU',
      img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/iu.jpg',
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/iu.jpg'
   },
   {
      title: 'Ji Chang Wook',
      img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/ji-chang-wook.jpg',
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/ji-chang-wook.jpg'
   },
   {
      title: 'Lisa',
      img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/lisa.jpg',
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/lisa.jpg'
   },
   {
      title: 'Jennie Kim',
      img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jennie.jpg',
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/jennie.jpg'
   },
   {
      title: 'Jisoo',
      img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/jisoo.jpg',
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/jisoo.jpg'
   },
   {
      title: 'Rosé',
      img: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/rose.jpg',
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/rose.jpg'
   }
]

export default function ModalTheme({ isOpen, setIsOpen }: Props) {
   const [theme, setTheme] = useLocalStorage<{ image: string; title: string }>('theme', {
      image: 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/rose.jpg',
      title: 'Rosé'
   })
   const [isActive, setIsActive] = useState<string>()
   function closeModal() {
      setIsOpen(false)
   }

   const handleChangeTheme = (image: string, title: string) => {
      setTheme({ image, title })
      setIsActive(title)
      setIsOpen(false)
      document.body.style.backgroundImage = `url('${image}')`
      themes.forEach((item) => {
         document.body.classList.remove(item.title.replaceAll(' ', '-'))
      })
      const playerControl: HTMLElement = document.querySelector('.playerControl') as HTMLElement
      const logo: HTMLImageElement = document.querySelector('.logo') as HTMLImageElement
      document.body.classList.add(title.replaceAll(' ', '-'))
      logo.src = ['XONE', 'Zing Music Awards', 'Tháp Eiffel', 'Jack', 'Rosé'].includes(title)
         ? 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg'
         : 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-light.svg'

      if (playerControl) {
         if (title === 'Zing Music Awards') {
            playerControl.style.backgroundImage =
               "url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-player/zma.png')"
         } else if (title === 'XONE') {
            playerControl.style.backgroundImage =
               "url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/xone-miniplayer.jpg')"
         } else {
            playerControl.style.backgroundImage = "url('')"
         }
      }
   }

   const handleReviewTheme = (image: string, title: string) => {
      document.body.style.backgroundImage = `url('${image}')`
      themes.forEach((item) => {
         document.body.classList.remove(item.title.replaceAll(' ', '-'))
      })
      const playerControl: HTMLElement = document.querySelector('.playerControl') as HTMLElement
      const logo: HTMLImageElement = document.querySelector('.logo') as HTMLImageElement
      document.body.classList.add(title.replaceAll(' ', '-'))
      logo.src = ['XONE', 'Zing Music Awards', 'Tháp Eiffel', 'Jack', 'Rosé'].includes(title)
         ? 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg'
         : 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-light.svg'

      if (title === 'Zing Music Awards') {
         playerControl.style.backgroundImage =
            "url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-player/zma.png')"
      } else if (title === 'XONE') {
         playerControl.style.backgroundImage =
            "url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/xone-miniplayer.jpg')"
      } else {
         playerControl.style.backgroundImage = "url('')"
      }
   }

   useEffect(() => {
      if (!isOpen) {
         themes.forEach((item) => {
            document.body.classList.remove(item.title.replaceAll(' ', '-'))
            document.body.style.backgroundImage = `url('')`
         })
      }
      document.body.style.backgroundImage = `url('${theme.image}')`
      document.body.classList.add(theme.title?.replaceAll(' ', '-'))
      setIsActive(theme.title)
      const playerControl: HTMLElement = document.querySelector('.playerControl') as HTMLElement
      const logo: HTMLImageElement = document.querySelector('.logo') as HTMLImageElement
      document.body.classList.add(theme.title?.replaceAll(' ', '-'))
      logo.src = ['XONE', 'Zing Music Awards', 'Tháp Eiffel', 'Jack', 'Rosé'].includes(theme.title)
         ? 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg'
         : 'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-light.svg'

      if (playerControl) {
         if (theme.title === 'Zing Music Awards') {
            playerControl.style.backgroundImage =
               "url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-player/zma.png')"
         } else if (theme.title === 'XONE') {
            playerControl.style.backgroundImage =
               "url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/xone-miniplayer.jpg')"
         } else {
            playerControl.style.backgroundImage = "url('')"
         }
      }
   }, [isOpen, theme.image, theme.title])
   return (
      <Transition appear show={isOpen} as={Fragment}>
         <Dialog as='div' className='relative z-[100]' onClose={closeModal}>
            <Transition.Child
               as={Fragment}
               enter='ease-out duration-300'
               enterFrom='opacity-0'
               enterTo='opacity-100'
               leave='ease-in duration-200'
               leaveFrom='opacity-100'
               leaveTo='opacity-0'
            >
               <div className='fixed inset-0 bg-black bg-opacity-50' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto z-[100]'>
               <div className='flex min-h-full items-center justify-center p-4 text-center'>
                  <Transition.Child
                     as={Fragment}
                     enter='ease-out duration-300'
                     enterFrom='opacity-0 scale-95'
                     enterTo='opacity-100 scale-100'
                     leave='ease-in duration-200'
                     leaveFrom='opacity-100 scale-100'
                     leaveTo='opacity-0 scale-95'
                  >
                     <Dialog.Panel className='transform relative overflow-hidden rounded-lg py-5 px-[30px] bg-tertiary w-[900px] text-left shadow-xl transition-all'>
                        <Dialog.Title as='h3' className='text-2xl font-bold mb-5'>
                           Giao Diện
                        </Dialog.Title>
                        <h4 className='font-semibold text-lg mb-2.5'>Chủ Đề</h4>
                        <div className='grid grid-cols-5 gap-3.5'>
                           {themes.slice(0, 3).map((item) => (
                              <div key={item.title}>
                                 <div
                                    className={`overflow-hidden relative pt-[66.67%] rounded-md group ${
                                       isActive === item.title && 'border border-tprimary'
                                    }`}
                                 >
                                    <Image
                                       fill
                                       className='absolute top-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
                                       alt={item.title}
                                       src={item.img}
                                       sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    />
                                    <div className='absolute inset-0 z-10 bg-black bg-opacity-40 hidden group-hover:block' />
                                    <div className='absolute inset-0 z-20 flex-col items-center justify-center gap-2 hidden group-hover:flex'>
                                       <button
                                          onClick={() => handleChangeTheme(item.image, item.title)}
                                          className='w-[110px] text-white h-[22px] text-[10px] font-medium bg-tprimary rounded-full'
                                       >
                                          ÁP DỤNG
                                       </button>
                                       <button
                                          onClick={() => handleReviewTheme(item.image, item.title)}
                                          className='w-[110px] h-[22px] text-white text-[10px] font-medium bg-black bg-opacity-50 border border-grayDa rounded-full'
                                       >
                                          XEM TRƯỚC
                                       </button>
                                    </div>
                                    {isActive === item.title && (
                                       <div className='w-5 h-5 flex z-10 absolute text-white bottom-2 right-2 items-center justify-center bg-tprimary rounded-full'>
                                          <svg
                                             xmlns='http://www.w3.org/2000/svg'
                                             fill='none'
                                             viewBox='0 0 24 24'
                                             strokeWidth={2.5}
                                             stroke='currentColor'
                                             className='w-3 h-3'
                                          >
                                             <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M4.5 12.75l6 6 9-13.5'
                                             />
                                          </svg>
                                       </div>
                                    )}
                                 </div>
                                 <h5 className='font-medium text-xs mt-1.5'>{item.title}</h5>
                              </div>
                           ))}
                        </div>
                        <h4 className='font-semibold text-lg mt-5 mb-2.5'>Nghệ Sĩ</h4>
                        <div className='grid grid-cols-5 gap-3.5'>
                           {themes.slice(3).map((item) => (
                              <div key={item.title}>
                                 <div
                                    className={`overflow-hidden relative pt-[66.67%] rounded-md group ${
                                       isActive === item.title && 'border border-tprimary'
                                    }`}
                                 >
                                    <Image
                                       fill
                                       className='absolute top-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-500'
                                       alt={item.title}
                                       src={item.img}
                                       sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    />
                                    <div className='absolute inset-0 z-20 bg-black bg-opacity-40 hidden group-hover:block' />
                                    <div className='absolute inset-0 z-30 flex-col items-center justify-center gap-2 hidden group-hover:flex'>
                                       <button
                                          onClick={() => handleChangeTheme(item.image, item.title)}
                                          className='w-[110px] h-[22px] text-white text-[10px] font-medium bg-tprimary rounded-full'
                                       >
                                          ÁP DỤNG
                                       </button>
                                       <button
                                          onClick={() => handleReviewTheme(item.image, item.title)}
                                          className='w-[110px] h-[22px] text-white text-[10px] font-medium bg-black bg-opacity-50 border border-grayDa rounded-full'
                                       >
                                          XEM TRƯỚC
                                       </button>
                                    </div>
                                    {isActive === item.title && (
                                       <div className='w-5 h-5 flex z-10 absolute text-white bottom-2 right-2 items-center justify-center bg-tprimary rounded-full'>
                                          <svg
                                             xmlns='http://www.w3.org/2000/svg'
                                             fill='none'
                                             viewBox='0 0 24 24'
                                             strokeWidth={2.5}
                                             stroke='currentColor'
                                             className='w-3 h-3'
                                          >
                                             <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M4.5 12.75l6 6 9-13.5'
                                             />
                                          </svg>
                                       </div>
                                    )}
                                 </div>
                                 <h5 className='font-medium text-xs mt-1.5'>{item.title}</h5>
                              </div>
                           ))}
                        </div>
                        <button title='Đóng' className='absolute top-2 right-2' onClick={closeModal}>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={2}
                              stroke='currentColor'
                              className='w-8 h-8'
                           >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                           </svg>
                        </button>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   )
}
