import MV from '@/modules/MV/MV'
import React from 'react'

export default function page({ params }: { params: { id: string } }) {
   return <MV params={params} />
}
