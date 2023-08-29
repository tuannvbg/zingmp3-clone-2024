import Album from '@/modules/Album/Album'
import React from 'react'

export default function PlaylistPage({ params }: { params: { id: string } }) {
   return <Album params={params} />
}
