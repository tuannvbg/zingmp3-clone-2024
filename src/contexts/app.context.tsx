'use client'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Artist } from '@/types/artist.type'
import { HomeListType } from '@/types/homelist.type'
import { SongItem } from '@/types/playlist.type'
import { User } from '@/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from '@/utils/auth'
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
   playlistLibrary: HomeListType[] | []
   setPlaylistLibrary: (value: [] | HomeListType[] | ((val: [] | HomeListType[]) => [] | HomeListType[])) => void
   songsLibrary: SongItem[] | []
   setSongsLibrary: (value: [] | SongItem[] | ((val: [] | SongItem[]) => [] | SongItem[])) => void
   isAuthenticated: boolean
   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
   profile: User | null
   setProfile: React.Dispatch<React.SetStateAction<User | null>>
   artistLibrary: Artist[] | []
   setArtistLibrary: (value: [] | Artist[] | ((val: [] | Artist[]) => [] | Artist[])) => void
   isShowLyric: boolean
   setIsShowLyric: React.Dispatch<React.SetStateAction<boolean>>
   currentTimeAudio: number
   setCurrentTimeAudio: React.Dispatch<React.SetStateAction<number>>
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
   setSearchData: () => null,
   playlistLibrary: [],
   setPlaylistLibrary: () => null,
   songsLibrary: [],
   setSongsLibrary: () => null,
   isAuthenticated: Boolean(getAccessTokenFromLS()),
   setIsAuthenticated: () => null,
   profile: getProfileFromLS(),
   setProfile: () => null,
   artistLibrary: [],
   setArtistLibrary: () => null,
   isShowLyric: false,
   setIsShowLyric: () => null,
   currentTimeAudio: 0,
   setCurrentTimeAudio: () => null
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
   const [playlistLibrary, setPlaylistLibrary] = useLocalStorage<HomeListType[] | []>(
      'playlistLibrary',
      initialAppContext.playlistLibrary
   )
   const [songsLibrary, setSongsLibrary] = useLocalStorage<SongItem[] | []>(
      'songsLibrary',
      initialAppContext.songsLibrary
   )
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
   const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
   const [artistLibrary, setArtistLibrary] = useLocalStorage<Artist[] | []>('artistLibrary', [])
   const [isShowLyric, setIsShowLyric] = useState<boolean>(initialAppContext.isShowLyric)
   const [currentTimeAudio, setCurrentTimeAudio] = useState<number>(initialAppContext.currentTimeAudio)
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
            setSearchData,
            playlistLibrary,
            setPlaylistLibrary,
            songsLibrary,
            setSongsLibrary,
            isAuthenticated,
            setIsAuthenticated,
            profile,
            setProfile,
            artistLibrary,
            setArtistLibrary,
            isShowLyric,
            setIsShowLyric,
            currentTimeAudio,
            setCurrentTimeAudio
         }}
      >
         {children}
      </AppContext.Provider>
   )
}
