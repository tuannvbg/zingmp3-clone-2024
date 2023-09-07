'use client'
import AlbumItem from '@/components/AlbumItem/AlbumItem'
import React from 'react'
export default function Album({ params }: { params: { id: string } }) {
   return <AlbumItem params={params} />
}
