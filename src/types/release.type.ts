export interface ReleaseType {
   all: All[]
   vPop: VPop[]
   others: Other[]
}

export interface All {
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
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric?: boolean
   downloadPrivileges?: number[]
   streamPrivileges?: number[]
   mvlink?: string
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

export interface VPop {
   encodeId: string
   title: string
   alias: string
   isOffical: boolean
   username: string
   artistsNames: string
   artists: Artist2[]
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
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric?: boolean
   mvlink?: string
   streamPrivileges?: number[]
   downloadPrivileges?: number[]
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
}

export interface Other {
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
   distributor: string
   indicators: string[]
   isIndie: boolean
   streamingStatus: number
   downloadPrivileges: number[]
   allowAudioAds: boolean
   streamPrivileges?: number[]
   hasLyric?: boolean
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
   playlistId?: string
}
