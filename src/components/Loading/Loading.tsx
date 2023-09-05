import React from 'react'

export default function Loading() {
   return (
      <div className='pyramid-loader mx-auto mt-20'>
         <div className='wrapper'>
            <span className='side side1' />
            <span className='side side2' />
            <span className='side side3' />
            <span className='side side4' />
            <span className='shadow' />
         </div>
      </div>
   )
}
