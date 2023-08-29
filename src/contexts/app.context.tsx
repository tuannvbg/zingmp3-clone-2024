'use client'
import useLocalStorage from '@/hooks/useLocalStorage'
import { SongItem } from '@/types/playlist.type'
import React, { createContext, useState } from 'react'
interface AppContextInterface {
   openSideBarRight: boolean
   setOpenSideBarRight: React.Dispatch<React.SetStateAction<boolean>>
   isPlaying: boolean
   setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
   isLoadingSong: boolean
   setIsLoadingSong: React.Dispatch<React.SetStateAction<boolean>>
   audio: HTMLAudioElement | null
   setAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>
   atAlbum: boolean
   setAtAlbum: React.Dispatch<React.SetStateAction<boolean>>
   playList: SongItem[] | null
   setPlayList: (value: SongItem[] | ((val: SongItem[] | null) => SongItem[] | null) | null) => void
   currentSongId: string
   setCurrentSongId: (value: string | ((val: string) => string)) => void
   albumInfo: { title: string; link: string }
   setAlbumInfo: (
      value:
         | {
              title: string
              link: string
           }
         | ((val: { title: string; link: string }) => {
              title: string
              link: string
           })
   ) => void
   recentSong: SongItem[]
   setRecentSong: (value: SongItem[] | ((val: SongItem[]) => SongItem[])) => void
   searchData: any
   setSearchData: React.Dispatch<any>
}

const initialAppContext: AppContextInterface = {
   openSideBarRight: false,
   setOpenSideBarRight: () => null,
   isPlaying: false,
   setIsPlaying: () => null,
   currentSongId: '',
   setCurrentSongId: () => null,
   isLoadingSong: false,
   setIsLoadingSong: () => null,
   audio: null,
   setAudio: () => null,
   atAlbum: false,
   setAtAlbum: () => null,
   playList: null,
   setPlayList: () => null,
   albumInfo: { title: '', link: '' },
   setAlbumInfo: () => null,
   recentSong: [],
   setRecentSong: () => null,
   searchData: {},
   setSearchData: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

//khi không truyền value vào AppProvider thì cái initialAppContext của AppContext sẽ được sử dụng
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
   const [openSideBarRight, setOpenSideBarRight] = useState<boolean>(initialAppContext.openSideBarRight)
   const [isPlaying, setIsPlaying] = useState<boolean>(initialAppContext.isPlaying)
   const [isLoadingSong, setIsLoadingSong] = useState<boolean>(initialAppContext.isLoadingSong)
   const [audio, setAudio] = useState<HTMLAudioElement | null>(initialAppContext.audio)
   const [atAlbum, setAtAlbum] = useState<boolean>(initialAppContext.atAlbum)
   const [currentSongId, setCurrentSongId] = useLocalStorage<string>('currentSongId', initialAppContext.currentSongId)
   const [playList, setPlayList] = useLocalStorage<SongItem[] | null>('playList', initialAppContext.playList)
   const [albumInfo, setAlbumInfo] = useLocalStorage<{ title: string; link: string }>(
      'albumInfo',
      initialAppContext.albumInfo
   )
   const [recentSong, setRecentSong] = useLocalStorage<SongItem[]>('recentSong', initialAppContext.recentSong)
   const [searchData, setSearchData] = useState<any>(initialAppContext.searchData)
   return (
      <AppContext.Provider
         value={{
            openSideBarRight,
            setOpenSideBarRight,
            isPlaying,
            setIsPlaying,
            currentSongId,
            setCurrentSongId,
            isLoadingSong,
            setIsLoadingSong,
            audio,
            setAudio,
            atAlbum,
            setAtAlbum,
            playList,
            setPlayList,
            albumInfo,
            setAlbumInfo,
            recentSong,
            setRecentSong,
            searchData,
            setSearchData
         }}
      >
         {children}
      </AppContext.Provider>
   )
}
