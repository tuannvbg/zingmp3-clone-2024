'use client'
import { AppContext } from '@/contexts/app.context'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useContext } from 'react'

interface Props {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalCloseTimer({ isOpen, setIsOpen }: Props) {
   const { setTimer } = useContext(AppContext)
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
                     <Dialog.Panel className='transform relative overflow-hidden rounded-lg bg-modal w-[540px] p-5 text-left align-middle shadow-xl transition-all'>
                        <Dialog.Title as='h3' className='text-lg mb-2.5 font-semibold leading-6'>
                           Xóa Hẹn Giờ
                        </Dialog.Title>
                        <p>Bạn có chắc chắn muốn xóa hẹn giờ?</p>
                        <div className='flex text-xs items-center justify-end gap-x-4 mt-2'>
                           <button
                              onClick={closeModal}
                              className='border py-1.5 px-3.5 hover:bg-opacity-20 rounded-full border-gray-400 bg-white bg-opacity-10'
                           >
                              KHÔNG
                           </button>
                           <button
                              onClick={() => {
                                 setTimer(null)
                                 closeModal()
                              }}
                              className='py-1.5 px-3.5 rounded-full bg-tprimary hover:bg-opacity-50'
                           >
                              CÓ
                           </button>
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   )
}
