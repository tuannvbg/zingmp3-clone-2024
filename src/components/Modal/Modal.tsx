import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

interface Props {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ isOpen, setIsOpen }: Props) {
   function closeModal() {
      setIsOpen(false)
   }

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
                     <Dialog.Panel className='transform relative overflow-hidden rounded-lg bg-modal max-w-[340px] p-5 text-center align-middle shadow-xl transition-all'>
                        <Dialog.Title as='h3' className='text-[19px] font-semibold leading-6 text-white'>
                           Dành Cho Tài Khoản Vip
                        </Dialog.Title>
                        <p className='my-3.5 text-secondary'>
                           Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản VIP để nghe bài hát này.
                        </p>
                        <button className='uppercase bg-yellow-500 hover:bg-opacity-90 rounded-full py-1 w-full text-white'>
                           Nâng cấp vip
                        </button>
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
