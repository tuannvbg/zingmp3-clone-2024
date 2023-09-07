'use client'
import AlbumItem from '@/components/AlbumItem/AlbumItem'
import React from 'react'

export default function Playlist({ params }: { params: { id: string } }) {
   return <AlbumItem params={params} />
}
