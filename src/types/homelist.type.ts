export interface HomeListType {
   encodeId: string
   thumbnail: string
   thumbnailM: string
   link: string
   title: string
   sortDescription: string
   artists: Artist[]
   artistsNames: string
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
