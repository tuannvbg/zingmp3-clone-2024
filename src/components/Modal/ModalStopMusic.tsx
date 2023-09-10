import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useContext, useState } from 'react'
import moment from 'moment'
import { toast } from 'react-toastify'
import { AppContext } from '@/contexts/app.context'

interface Props {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const infoTimer = (value: { minute: string; hour: string }) => {
   const { minute, hour } = value
   const date = Date.now()
   const dateToTimer = date + Number(minute) * 60 * 1000 + Number(hour) * 60 * 60 * 1000
   const formatDateToTimer = moment(dateToTimer).format('HH:mm DD/MM/YYYY')

   return `Dự tính dừng phát nhạc lúc: ${formatDateToTimer}`
}

export default function ModalStopMusic({ isOpen, setIsOpen }: Props) {
   const [focus, setFocus] = useState<number>(1)
   function closeModal() {
      setIsOpen(false)
   }
   const [value, setValue] = useState({ minute: '00', hour: '00' })

   const { setTimer } = useContext(AppContext)

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value)
      if (value || value === 0) {
         if (e.target.name === 'hour' && (value < 0 || value >= 24)) return
         if (e.target.name === 'minute' && (value < 0 || value >= 60)) return
         setValue((prev) => ({ ...prev, [e.target.name]: value < 10 ? `0${value}` : value }))
      }
   }

   const handleSaveTimer = () => {
      const { minute, hour } = value
      setTimer(parseInt(hour) * 3600 + parseInt(minute) * 60)
      closeModal()
      toast.success('Hẹn giờ dừng phát nhạc thành công')
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
                     <Dialog.Panel className='transform relative overflow-hidden rounded-lg bg-modal p-5 pb-2 text-center align-middle shadow-xl transition-all'>
                        <Dialog.Title as='h3' className='text-[19px] mb-5 font-semibold leading-6'>
                           Hẹn Giờ Dừng Phát Nhạc
                        </Dialog.Title>
                        <div className='flex items-center p-5 rounded-lg bg-white bg-opacity-10 gap-x-2'>
                           <div
                              className={`flex items-center border-b-2 border-b-gray-300 w-[100px] justify-center ${
                                 focus === 1 ? 'border-b-tprimary' : 'border-b-gray-300'
                              }`}
                           >
                              <input
                                 autoComplete='off'
                                 type='text'
                                 name='hour'
                                 value={value.hour}
                                 onChange={handleChange}
                                 onFocus={() => setFocus(1)}
                                 onBlur={() => setFocus(3)}
                                 className='bg-transparent outline-none text-[34px] tracking-[3px] w-[50px] h-10'
                              />
                              <span className='text-secondary'>GIỜ</span>
                           </div>
                           <div className='text-[34px]'>:</div>
                           <div
                              className={`flex items-center border-b-2 w-[100px] justify-center ${
                                 focus === 2 ? 'border-b-tprimary' : 'border-b-gray-300'
                              }`}
                           >
                              <input
                                 autoComplete='off'
                                 type='text'
                                 name='minute'
                                 value={value.minute}
                                 onChange={handleChange}
                                 onFocus={() => setFocus(2)}
                                 onBlur={() => setFocus(3)}
                                 className='bg-transparent outline-none text-[34px] tracking-[3px] w-[50px] h-10'
                              />
                              <span className='text-secondary'>PHÚT</span>
                           </div>
                        </div>
                        <p className='text-secondary text-xs my-5'>
                           {Number(value.hour) === 0 && Number(value.minute) === 0
                              ? 'Chọn thời gian để dừng phát nhạc'
                              : infoTimer(value)}
                        </p>
                        <button
                           disabled={value?.minute === '00' && value?.hour === '00'}
                           onClick={handleSaveTimer}
                           className={`bg-tprimary text-white relative py-2 rounded-full overflow-hidden w-full disabled:cursor-not-allowed`}
                        >
                           LƯU LẠI
                           {value?.minute === '00' && value?.hour === '00' && (
                              <div className='absolute inset-0 bg-black bg-opacity-30' />
                           )}
                        </button>
                        <button onClick={closeModal} className='mt-2 py-2 w-full'>
                           HUỶ
                        </button>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   )
}
