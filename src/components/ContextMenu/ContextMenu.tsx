import { useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'
interface Props {
   left: number
   top: number
   onClose: () => void
}
const classNameLi = 'cursor-pointer py-2.5 pl-3.5 pr-5 flex items-center gap-x-3 hover:bg-white hover:bg-opacity-10'
const ContextMenu = ({ left, top, onClose }: Props) => {
   const wrapperRef = useRef<HTMLUListElement>(null)
   const history = window.history
   const router = useRouter()

   const handleBack = () => {
      history.back()
      onClose()
   }

   const handleNext = () => {
      history.forward()
      onClose()
   }

   const handleReload = () => {
      window.location.reload()
      onClose()
   }

   const handleRedirect = (to: string) => {
      router.push(to)
      onClose()
   }

   useEffect(() => {
      const wrapper = wrapperRef.current

      const handleClick = (e: any) => {
         if (!wrapper?.contains(e.target)) {
            onClose()
         }
      }

      document.body.addEventListener('click', handleClick, true)
      document.body.addEventListener('wheel', onClose)
      window.addEventListener('resize', onClose)

      return () => {
         document.body.removeEventListener('click', handleClick, true)
         document.body.removeEventListener('wheel', onClose)
         window.removeEventListener('resize', onClose)
      }
   }, [onClose])

   return (
      <ul
         ref={wrapperRef}
         className='fixed bg-modal w-[250px] rounded-md py-2.5 shadow-lg z-[2000]'
         style={{ left, top }}
      >
         <li className={classNameLi} onClick={handleBack}>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               fill='none'
               viewBox='0 0 24 24'
               strokeWidth={1.5}
               stroke='currentColor'
               className='w-[18px] h-[18px]'
            >
               <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
            </svg>
            <span>Quay lại</span>
         </li>
         <li className={classNameLi} onClick={handleNext}>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               fill='none'
               viewBox='0 0 24 24'
               strokeWidth={1.5}
               stroke='currentColor'
               className='w-[18px] h-[18px]'
            >
               <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
            </svg>
            <span>Tiếp theo</span>
         </li>
         <li className={classNameLi} onClick={handleReload}>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               fill='none'
               viewBox='0 0 24 24'
               strokeWidth={1.5}
               stroke='currentColor'
               className='w-[18px] h-[18px]'
            >
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
               />
            </svg>

            <span>Tải lại trang</span>
         </li>
         <li className={classNameLi} onClick={() => handleRedirect('/')}>
            <svg width={18} height={18} viewBox='0 0 24 24' fill='currentColor'>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12ZM12 1.75C6.33908 1.75 1.75 6.33908 1.75 12C1.75 17.6609 6.33908 22.25 12 22.25C17.6609 22.25 22.25 17.6609 22.25 12C22.25 6.33908 17.6609 1.75 12 1.75ZM9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12ZM12 7.75C9.65279 7.75 7.75 9.65279 7.75 12C7.75 14.3472 9.65279 16.25 12 16.25C14.3472 16.25 16.25 14.3472 16.25 12C16.25 9.65279 14.3472 7.75 12 7.75Z'
                  fillOpacity='0.8'
               />
            </svg>
            <span>Khám phá</span>
         </li>
      </ul>
   )
}

export default ContextMenu
