export interface AlbumType {
   sectionType: string
   viewType: string
   title: string
   link: string
   sectionId: string
   items: Item[]
}

export interface Item {
   encodeId: string
   title: string
   alias: string
   isOffical: boolean
   username: string
   artistsNames: string
   artists: Artist[]
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
   album?: Album
   distributor: string
   indicators: any[]
   isIndie: boolean
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric: boolean
   radioId?: number
   mvlink?: string
   streamPrivileges?: number[]
   downloadPrivileges?: number[]
   zoneid?: string
   type?: string
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
