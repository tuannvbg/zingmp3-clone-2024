export interface ListMVType {
   err: number
   msg: string
   data: Data
   timestamp: number
}

export interface Data {
   items: Item[]
   total: number
   hasMore: boolean
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
   streamingStatus: number
   artist: Artist2
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

export interface Artist2 {
   id: string
   name: string
   link: string
   spotlight: boolean
   alias: string
   playlistId?: string
   cover: string
   thumbnail: string
}
