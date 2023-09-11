import { AppContext } from '@/contexts/app.context'
import React, { useContext, useEffect, useState } from 'react'
import Tooltip from '../Tooltip/Tooltip'
import ModalCloseTimer from '../Modal/ModalCloseTimer'
import ModalSetting from '../Modal/ModalSetting'
function formatTime(seconds: number) {
   const hours = Math.floor(seconds / 3600)
   const minutes = Math.floor((seconds % 3600) / 60)
   const remainingSeconds = seconds % 60

   const formattedHours = hours.toString().padStart(2, '0')
   const formattedMinutes = minutes.toString().padStart(2, '0')
   const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

   return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
export default function Timer() {
   const [showModalClose, setShowModalClose] = useState<boolean>(false)
   const [showModalSetting, setShowModalSetting] = useState<boolean>(false)

   const { setTimer, timer, isPlaying, setIsPlaying } = useContext(AppContext)
   let currentTimer: NodeJS.Timeout
   useEffect(() => {
      if (timer && timer > 0) {
         // eslint-disable-next-line react-hooks/exhaustive-deps
         currentTimer = setTimeout(() => setTimer(timer - 1), 1000)
      } else if (timer === 0) {
         if (isPlaying) {
            setIsPlaying(false)
         }
         if (showModalClose) {
            setShowModalClose(false)
         }

         clearTimeout(currentTimer)
         setShowModalSetting(true)
      }

      return () => {
         if (currentTimer) {
            clearTimeout(currentTimer)
         }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [timer])

   return (
      <div className='bg-tprimary flex items-center py-2 pl-4 pr-3 rounded-t-lg absolute left-1/2 -translate-x-1/2 top-0 -translate-y-full text-xs'>
         <span className='font-medium whitespace-nowrap'>Nhạc sẽ dừng sau:</span>
         <span className='font-bold ml-1'>{formatTime(timer as number)}</span>
         <Tooltip content='Xoá hẹn giờ'>
            <button onClick={() => setShowModalClose(true)} className='ml-2'>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-[18px] h-[18px]'
               >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
               </svg>
            </button>
         </Tooltip>
         {showModalSetting && <ModalSetting isOpen={showModalSetting} setIsOpen={setShowModalSetting} />}
         <ModalCloseTimer isOpen={showModalClose} setIsOpen={setShowModalClose} />
      </div>
   )
}
