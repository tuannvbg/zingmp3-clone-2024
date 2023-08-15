'use client'
import { getHome } from '@/apis/home.api'
import Slider from '@/components/Slider'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Home() {
   const { data } = useQuery({
      queryKey: ['home'],
      queryFn: getHome,
      staleTime: 1000 * 60
   })
   console.log(data?.data.data)

   return (
      <div className='h-[calc(100vh-70px)] mt-[70px] overflow-y-auto px-10'>
         <Slider />
      </div>
   )
}
