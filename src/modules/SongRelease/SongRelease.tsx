'use client'
import Loading from '@/components/Loading/Loading'
import Modal from '@/components/Modal/Modal'
import SongMusicItem from '@/components/SongMusicItem/SongMusicItem'
import { AppContext } from '@/contexts/app.context'
import useGetHome from '@/hooks/useGetHome'
import { SongItem } from '@/types/playlist.type'
import { ReleaseType } from '@/types/release.type'
import React, { useContext, useEffect, useState } from 'react'

export default function SongRelease() {
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false) //tắt mở modal
   const { currentSongId, setPlayList, playList } = useContext(AppContext)
   const [tabRelease, setTabRelease] = useState<'all' | 'vPop' | 'others'>('all')
   const { data } = useGetHome()

   const releaseList: ReleaseType = data?.data.data.items[2].items //mới phát hành
   useEffect(() => {
      setPlayList(releaseList?.[tabRelease] as SongItem[])
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [tabRelease])
   if (!releaseList) return <Loading />
   return (
      <div className={`mt-[70px] px-3 sm:px-8 lg:px-14 ${currentSongId ? 'pb-36 md:pb-28' : 'pb-20 md:pb-16'}`}>
         <div className='pt-[30px] flex flex-wrap items-center gap-x-3'>
            <h1 className='text-[40px] font-bold'>Mới Phát Hành</h1>
            <div className='w-9 h-9 rounded-full bg-white flex items-center justify-center'>
               <div
                  style={{
                     clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                  }}
                  className='bg-primary w-3.5 translate-x-[1px] h-4'
               />
            </div>
         </div>

         <div className='flex items-center flex-wrap gap-4 mt-10'>
            <button
               onClick={() => setTabRelease('all')}
               className={`uppercase text-xs text-white rounded-full px-6 py-1 ${
                  tabRelease === 'all' ? 'bg-tprimary' : 'bg-transparent border border-gray-700'
               }`}
            >
               tất cả
            </button>
            <button
               onClick={() => setTabRelease('vPop')}
               className={`uppercase text-xs text-white rounded-full px-6 py-1 ${
                  tabRelease === 'vPop' ? 'bg-tprimary' : 'bg-transparent border border-gray-700'
               }`}
            >
               việt nam
            </button>
            <button
               onClick={() => setTabRelease('others')}
               className={`uppercase text-xs text-white rounded-full px-6 py-1 ${
                  tabRelease === 'others' ? 'bg-tprimary' : 'bg-transparent border border-gray-700'
               }`}
            >
               quốc tế
            </button>
         </div>

         <div className='mt-8'>
            <SongMusicItem playlist={playList as SongItem[]} />
         </div>
         <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </div>
   )
}
