import { getInfoSong } from '@/apis/home.api'
import { AppContext } from '@/contexts/app.context'
import useInfoSong from '@/hooks/useInfoSong'
import { Dialog, Transition } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { Fragment, useContext } from 'react'

interface Props {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalSetting({ isOpen, setIsOpen }: Props) {
   const { setIsPlaying, setTimer } = useContext(AppContext)
   //lấy info song
   const { infoSong } = useInfoSong()
   function closeModal() {
      setIsOpen(false)
   }

   return (
      <Transition appear show={isOpen} as={Fragment}>
         <Dialog as='div' className='relative z-[3000]' onClose={closeModal}>
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
                     <Dialog.Panel className='transform relative overflow-hidden rounded-lg bg-modal w-[330px] p-5 text-center align-middle shadow-xl transition-all'>
                        <p className='mb-3 font-medium'>
                           Thời gian phát nhạc đã kết thúc, bạn có muốn tiếp tục phát bài hát này?
                        </p>
                        <div className='px-[50px]'>
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img
                              src={infoSong?.thumbnailM as string}
                              alt={infoSong?.title as string}
                              className='w-full h-full aspect-square rounded-lg object-cover'
                              width={190}
                              height={190}
                           />
                        </div>
                        <p className='font-semibold mt-2'>{infoSong?.title}</p>
                        <p className='text-secondary mb-5 text-xs'>{infoSong?.artistsNames}</p>
                        <button
                           onClick={() => {
                              setIsPlaying(true)
                              setTimer(null)
                           }}
                           className='w-full mb-2 py-2 bg-tprimary rounded-full'
                        >
                           TIẾP TỤC PHÁT
                        </button>
                        <button
                           onClick={() => {
                              closeModal()
                              setTimer(null)
                           }}
                           className='w-full py-2'
                        >
                           BỎ QUA
                        </button>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   )
}
