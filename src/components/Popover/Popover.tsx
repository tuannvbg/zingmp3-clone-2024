import useClickOutSide from '@/hooks/useClickOutSide'
import { FloatingPortal, useFloating, arrow, shift, offset, Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import React, { ElementType, useRef, useState } from 'react'

interface Props {
   children: React.ReactNode
   renderPopover: React.ReactNode
   as?: ElementType //custom thẻ
   initialOpen?: boolean
   posistion?: Placement
   arrowClass?: string
   transformOrigin?: string
   isClick?: boolean
}
export default function Popover({
   children,
   renderPopover,
   as: Element = 'div',
   initialOpen = false,
   posistion = 'top',
   arrowClass = 'absolute h-[10px] w-6 bottom-0 translate-y-full rotate-180 bg-[#333]',
   transformOrigin = 'bottom',
   isClick = false
}: Props) {
   const [open, setOpen] = useState<boolean>(initialOpen)
   const arrowRef = useRef<HTMLElement>(null)
   const { refs, x, y, strategy, middlewareData } = useFloating({
      middleware: [offset(10), shift(), arrow({ element: arrowRef })], //offet là khoảng cách từ trên xuống(px), shirt để luôn hiển thị đúng vị trí khi reponsive
      placement: posistion // vị trí hiển thị
   })
   const showPopover = () => {
      setOpen(true)
   }
   const hidePopover = () => {
      setOpen(false)
   }
   const { nodeRef } = useClickOutSide(() => setOpen(false))
   return (
      // cái tooltip sẽ định vị theo thằng có ref={refs.setReference} nên để đâu cũng dc
      <Element
         className='relative z-[100] flex cursor-pointer items-center gap-x-1 hover:text-white/70'
         ref={refs.setReference}
         onMouseEnter={() => !isClick && showPopover()}
         onMouseLeave={() => !isClick && hidePopover()}
         onClick={() => isClick && setOpen((prev) => !prev)}
      >
         <span ref={nodeRef}>{children}</span>
         <div className='absolute top-full h-5 w-full bg-transparent' />
         <AnimatePresence>
            {open && (
               <FloatingPortal>
                  <motion.div
                     ref={refs.setFloating}
                     style={{
                        position: strategy,
                        left: x,
                        top: y,
                        width: 'max-content',
                        transformOrigin: `calc(${middlewareData.arrow?.x}px + 12px) ${transformOrigin}`,
                        zIndex: 10
                     }}
                     initial={{ opacity: 0, transform: 'scale(0)' }}
                     animate={{ opacity: 1, transform: 'scale(1)' }}
                     exit={{ opacity: 0, transform: 'scale(0)' }}
                     transition={{ duration: 0.2 }}
                  >
                     <span
                        ref={arrowRef}
                        className={arrowClass}
                        style={{
                           left: middlewareData.arrow?.x,
                           top: middlewareData.arrow?.y,
                           clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                        }}
                     />
                     {renderPopover}
                  </motion.div>
               </FloatingPortal>
            )}
         </AnimatePresence>
      </Element>
   )
}
