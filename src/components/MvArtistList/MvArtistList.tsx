import { getArtist } from '@/apis/home.api'
import { Artist, Item } from '@/types/artist.type'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Loading from '../Loading/Loading'
import MvArtistItem from '../MvArtistItem/MvArtistItem'

export default function MvArtistList({ item }: { item: Artist }) {
   const { data } = useQuery({
      queryKey: ['artist', item.alias],
      queryFn: () => getArtist({ name: item.alias })
   })
   const artistData = data?.data.data
   let mvList: Item[] = []
   artistData?.sections.forEach((item) => {
      if (item.sectionType === 'video') {
         mvList = item.items
      }
   })
   if (!artistData) return <Loading />
   return (
      <div>
         <h2 className='text-xl font-bold mb-5'>MV Của {artistData.name}</h2>
         <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-6'>
            {mvList && mvList.length > 0 && mvList.map((item) => <MvArtistItem key={item.encodeId} item={item} />)}
         </div>
      </div>
   )
}
