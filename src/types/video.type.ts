export interface VideoType {
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
   streamingStatus: number
   artist: Artist2
   startTime: number
   endTime: number
   statusName: string
   statusCode: number
   createdAt: number
   disabledAds: boolean
   privacy: string
   lyric: string
   song: Song
   genres: Genre[]
   composers: Composer[]
   album: Album
   lyrics: Lyric[]
   recommends: Recommend[]
   like: number
   listen: number
   liked: boolean
   comment: number
   streaming: Streaming
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
   playlistId: string
   cover: string
   thumbnail: string
}

export interface Song {
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
   indicators: any[]
   radioId: number
   isIndie: boolean
   mvlink: string
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric: boolean
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

export interface Lyric {
   id: string
   content: string
   username: string
}

export interface Recommend {
   encodeId: string
   title: string
   alias: string
   isOffical: boolean
   username: string
   artistsNames: string
   artists: Artist5[]
   isWorldWide: boolean
   thumbnailM: string
   link: string
   thumbnail: string
   duration: number
   streamingStatus: number
   artist: Artist6
   zoneid?: string
   type?: string
}

export interface Artist5 {
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

export interface Artist6 {
   id: string
   name: string
   link: string
   spotlight: boolean
   alias: string
   playlistId: string
   cover: string
   thumbnail: string
}

export interface Streaming {
   mp4: Mp4
   hls: Hls
}

export interface Mp4 {
   '360p': string
   '480p': string
   '720p': string
   '1080p': string
}

export interface Hls {
   '360p': string
   '480p': string
   '720p': string
   '1080p': string
}
