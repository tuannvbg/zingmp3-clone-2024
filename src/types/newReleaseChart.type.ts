export interface NewReleaseChartType {
   err: number
   msg: string
   data: Data
   timestamp: number
}

export interface Data {
   banner: string
   type: string
   link: string
   title: string
   sectionType: string
   sectionId: string
   viewType: string
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
   indicators: string[]
   isIndie: boolean
   mvlink?: string
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric?: boolean
   rakingStatus: number
   releasedAt: number
   downloadPrivileges?: number[]
   streamPrivileges?: number[]
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
   playlistId?: string
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
   playlistId?: string
   totalFollow: number
}
