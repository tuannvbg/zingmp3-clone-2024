import React from 'react'

export default function Header() {
   return (
      <div className='fixed flex items-center justify-between px-10 top-0 right-[250px] left-[200px] bg-primary bg-opacity-60 h-[70px] z-10 backdrop-blur-2xl'>
         <div className='flex items-center gap-x-5'>
            <button>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
               >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
               </svg>
            </button>
            <button>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
               >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
               </svg>
            </button>
            <div className='flex h-10 items-center pl-2 bg-white bg-opacity-20 rounded-full w-[440px]'>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
               </svg>
               <input
                  type='text'
                  placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                  className='outline-none h-full px-2 flex-1 bg-transparent placeholder:text-[#dadada]'
               />
            </div>
         </div>
         <button>Login</button>
      </div>
   )
}
