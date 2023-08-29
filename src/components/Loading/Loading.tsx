import React from 'react'

export default function Loading() {
   return (
      <div
         aria-label='Orange and tan hamster running in a metal wheel'
         role='img'
         className='wheel-and-hamster mx-auto mt-24'
      >
         <div className='wheel' />
         <div className='hamster'>
            <div className='hamster__body'>
               <div className='hamster__head'>
                  <div className='hamster__ear' />
                  <div className='hamster__eye' />
                  <div className='hamster__nose' />
               </div>
               <div className='hamster__limb hamster__limb--fr' />
               <div className='hamster__limb hamster__limb--fl' />
               <div className='hamster__limb hamster__limb--br' />
               <div className='hamster__limb hamster__limb--bl' />
               <div className='hamster__tail' />
            </div>
         </div>
         <div className='spoke' />
      </div>
   )
}
