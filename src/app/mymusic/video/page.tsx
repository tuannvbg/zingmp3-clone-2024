import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
   return (
      <div className='text-center mt-10'>
         <Image
            src={'https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-mv-dark.png'}
            alt=''
            width={120}
            height={120}
            className='w-[120px] h-[120px] object-cover mx-auto'
         />
         <p className='text-secondary mt-3 mb-5 font-semibold text-base'>Chưa có MV nào trong thư viện cá nhân</p>
         <Link href={'/mv'} className='uppercase px-5 py-2 rounded-full bg-tprimary hover:bg-opacity-90'>
            Khám phá ngay
         </Link>
      </div>
   )
}
