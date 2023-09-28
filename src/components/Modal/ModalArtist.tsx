import { Dialog, Transition } from '@headlessui/react'
import DOMPurify from 'dompurify'
import Image from 'next/image'
import React, { Fragment } from 'react'

interface Props {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
   thumbnail: string
   name: string
   biography: string
}

export default function ModalArtist({ isOpen, setIsOpen, thumbnail, name, biography }: Props) {
   function closeModal() {
      setIsOpen(false)
   }

   return (
      <Transition appear show={isOpen} as={Fragment}>
         <Dialog as='div' className='relative z-[100000]' onClose={closeModal}>
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
                     <Dialog.Panel className='transform relative overflow-hidden rounded-lg bg-tertiary w-[480px] p-6 text-center align-middle shadow-xl transition-all'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           src={thumbnail}
                           alt={name}
                           width={110}
                           height={110}
                           className='w-[110px] h-[110px] object-cover rounded-full mb-3.5 mx-auto'
                        />
                        <span className='text-2xl font-bold'>{name}</span>
                        <div
                           className='max-h-[218px] overflow-auto mt-5 text-secondary text-left'
                           dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(biography) //DOMPurify chống tấn công XSS
                           }}
                        />
                        <button title='Đóng' className='absolute top-2 right-2' onClick={closeModal}>
                           <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-6 h-6'
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
