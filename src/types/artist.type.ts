export interface ArtistType {
   err: number
   msg: string
   data: Data
   timestamp: number
}

export interface Data {
   id: string
   name: string
   link: string
   spotlight: boolean
   alias: string
   playlistId: string
   cover: string
   thumbnail: string
   biography: string
   sortBiography: string
   thumbnailM: string
   national: string
   birthday: string
   realname: string
   totalFollow: number
   follow: number
   awards: string[]
   oalink: string
   oaid: number
   sections: Section[]
   sectionId: string
   isOABrand: boolean
   tabs: number[]
   hasOA: boolean
}

export interface Section {
   sectionType: string
   viewType: string
   title: string
   link: string
   sectionId: string
   items: Item[]
   options?: Options
   itemType?: string
}

export interface Item {
   encodeId?: string
   title?: string
   alias?: string
   isOffical?: boolean
   username?: string
   artistsNames?: string
   artists?: Artist[]
   isWorldWide?: boolean
   thumbnailM: string
   link: string
   thumbnail: string
   duration?: number
   zingChoice?: boolean
   isPrivate?: boolean
   preRelease?: boolean
   releaseDate: any
   genreIds?: string[]
   distributor?: string
   indicators?: any[]
   isIndie?: boolean
   streamingStatus?: number
   allowAudioAds?: boolean
   hasLyric?: boolean
   album?: Album
   radioId?: number
   mvlink?: string
   isoffical?: boolean
   sortDescription?: string
   releasedAt?: number
   PR?: boolean
   playItemMode?: number
   subType?: number
   uid?: number
   isShuffle?: boolean
   userName?: string
   isAlbum?: boolean
   textType?: string
   isSingle?: boolean
   releaseDateText?: string
   artist?: Artist3
   id?: string
   name?: string
   spotlight?: boolean
   isOA?: boolean
   isOABrand?: boolean
   playlistId?: string
   totalFollow?: number
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
   totalFollow?: number
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
   artists: Artist2[]
   artistsNames: string
}

export interface Artist2 {
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

export interface Artist3 {
   id: string
   name: string
   link: string
   spotlight: boolean
   alias: string
   playlistId: string
   cover: string
   thumbnail: string
}

export interface Options {
   artistId: string
}
