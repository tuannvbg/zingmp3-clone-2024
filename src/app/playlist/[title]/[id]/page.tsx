import Playlist from '@/modules/Playlist/Playlist'
import React from 'react'

export default function PlaylistPage({ params }: { params: { id: string } }) {
   return <Playlist params={params} />
}
