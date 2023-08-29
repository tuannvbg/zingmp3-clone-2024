import { AlbumType } from './album.type'

export interface PlaylistType {
   err: number
   msg: string
   data: Data
   timestamp: number
}

export interface Data {
   encodeId: string
   title: string
   thumbnail: string
   isoffical: boolean
   link: string
   isIndie: boolean
   releaseDate: string
   sortDescription: string
   releasedAt: number
   genreIds: string[]
   PR: boolean
   artists: Artist[]
   artistsNames: string
   playItemMode: number
   subType: number
   uid: number
   thumbnailM: string
   isShuffle: boolean
   isPrivate: boolean
   userName: string
   isAlbum: boolean
   textType: string
   isSingle: boolean
   distributor: string
   description: string
   aliasTitle: string
   sectionId: string
   contentLastUpdate: number
   artist: Artist2
   genres: Genre[]
   song: Song
   sections?: AlbumType[]
   like: number
   listen: number
   liked: boolean
}

export interface Artist {
   id: string
   name: string
   link: string
   spotlight: boolean
   alias: string
   thumbnail: string
   thumbnailM: string
   isOA: boolean
   isOABrand: boolean
   playlistId: string
   totalFollow: number
}

export interface Artist2 {
   id: string
   name: string
   link: string
   spotlight: boolean
   alias: string
   playlistId: string
   cover: string
   thumbnail: string
}

export interface Genre {
   id: string
   name: string
   title: string
   alias: string
   link: string
}

export interface Song {
   items: SongItem[]
   total: number
   totalDuration: number
}

export interface SongItem {
   score: number
   encodeId: string
   title: string
   alias: string
   isOffical: boolean
   username: string
   artistsNames: string
   artists: Artist3[]
   isWorldWide: boolean
   thumbnailM: string
   link: string
   thumbnail: string
   duration: number
   zingChoice: boolean
   isPrivate: boolean
   preRelease: boolean
   releaseDate: number
   genreIds: string[]
   album: Album
   distributor: string
   indicators: any[]
   isIndie: boolean
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric: boolean
   mvlink?: string
   downloadPrivileges?: number[]
   streamPrivileges?: number[]
}

export interface Artist3 {
   id: string
   name: string
   link: string
   spotlight: boolean
   alias: string
   thumbnail: string
   thumbnailM: string
   isOA: boolean
   isOABrand: boolean
   playlistId: string
}

export interface Album {
   encodeId: string
   title: string
   thumbnail: string
   isoffical: boolean
   link: string
   isIndie: boolean
   releaseDate: string
   sortDescription: string
   releasedAt: number
   genreIds: string[]
   PR: boolean
   artists: Artist4[]
   artistsNames: string
}

export interface Artist4 {
   id: string
   name: string
   link: string
   spotlight: boolean
   alias: string
   thumbnail: string
   thumbnailM: string
   isOA: boolean
   isOABrand: boolean
   playlistId: string
   totalFollow: number
}
