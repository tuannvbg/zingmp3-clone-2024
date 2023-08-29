//info song type
export interface InfoSongType {
   err: number
   msg: string
   data: Data
   timestamp: number
}

export interface Data {
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
   distributor: string
   indicators: any[]
   isIndie: boolean
   mvlink?: string
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric: boolean
   userid: number
   genres: Genre[]
   composers: Composer[]
   album: Album
   isRBT: boolean
   like: number
   listen: number
   liked: boolean
   comment: number
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

export interface Genre {
   id: string
   name: string
   title: string
   alias: string
   link: string
}

export interface Composer {
   id: string
   name: string
   link: string
   spotlight: boolean
   alias: string
   playlistId: string
   cover: string
   thumbnail: string
   totalFollow: number
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
