export interface Top100Type {
   err: number
   msg: string
   data: Daum[]
   timestamp: number
}

export interface Daum {
   sectionType: string
   viewType: string
   title: string
   link: string
   sectionId: string
   items: Item[]
   genre: Genre
}

export interface Item {
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
   totalFollow: number
}

export interface Genre {
   name: string
}
