export interface HomeType {
   err: number
   msg: string
   data: Data
   timestamp: number
}

export interface Data {
   items: Item[]
   hasMore: boolean
   total: number
}

export interface Item {
   sectionType: string
   viewType?: string
   title?: string
   link?: string
   sectionId?: string
   items: any
   itemType?: string
   options?: Options
   banner?: string
   type?: string
   promotes?: Promote[]
   chart?: Chart
   chartType?: string
   adId?: string
   pageType?: string
}

export interface Options {
   autoSlider?: boolean
   hideArrow?: boolean
   hideTitle?: boolean
}

export interface Promote {
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
   mvlink?: string
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric?: boolean
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

export interface Chart {
   times: Time[]
   minScore: number
   maxScore: number
   items: Items
   totalScore: number
}

export interface Time {
   hour: string
}

export interface Items {
   Z6600ZDO: Z6600Zdo[]
   Z6AABFU6: Z6Aabfu6[]
   Z6D60IUD: Z6D60Iud[]
   [key: string]: (Z6600Zdo | Z6Aabfu6 | Z6D60Iud)[]
}

export interface Z6600Zdo {
   time: number
   hour: string
   counter: number
}

export interface Z6Aabfu6 {
   time: number
   hour: string
   counter: number
}

export interface Z6D60Iud {
   time: number
   hour: string
   counter: number
}
