import React, { useState } from 'react'

interface TooltipProps {
   content: React.ReactNode
   children: React.ReactNode
   left?: boolean
   bottom?: boolean
   bottomLeft?: boolean
}

export default function Tooltip({ content, children, left, bottom, bottomLeft }: TooltipProps) {
   const [showTooltip, setShowTooltip] = useState(false)

   const handleMouseEnter = () => {
      setShowTooltip(true)
   }

   const handleMouseLeave = () => {
      setShowTooltip(false)
   }

   return (
      <div className='relative'>
         <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
         </div>
         <div
            className={`absolute whitespace-nowrap bottom-11 ${
               left
                  ? 'right-0'
                  : bottom
                  ? 'bottom-[-35px] -translate-x-[45%]'
                  : bottomLeft
                  ? 'bottom-[-35px] -translate-x-[70%]'
                  : 'left-1/2 -translate-x-1/2'
            } transition-all bg-[#333] text-xs text-white py-1 px-2 rounded z-[100] ${
               showTooltip ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
         >
            {content}
         </div>
         <div
            style={{
               clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
            }}
            className={`absolute ${
               bottom || bottomLeft
                  ? 'bottom-[-20px] rotate-180 -translate-y-full translate-x-1/2'
                  : 'bottom-9 left-1/2 -translate-x-1/2'
            } transition-all w-4 h-2 bg-[#333] z-[100] ${showTooltip ? 'visible opacity-100' : 'invisible opacity-0'}`}
         />
      </div>
   )
}
