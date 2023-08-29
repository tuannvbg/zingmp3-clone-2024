export interface ChartHomeType {
   err: number
   msg: string
   data: Data
   timestamp: number
}

export interface Data {
   RTChart: Rtchart
   newRelease: NewRelease[]
   weekChart: WeekChart
}

export interface Rtchart {
   promotes: Promote[]
   items: Item[]
   chart: Chart
   chartType: string
   sectionType: string
   sectionId: string
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
   album: Album
   distributor: string
   indicators: any[]
   isIndie: boolean
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric: boolean
   downloadPrivileges?: number[]
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

export interface Item {
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
   album: Album2
   distributor: string
   indicators: string[]
   isIndie: boolean
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric?: boolean
   rakingStatus: number
   score: number
   totalTopZing: number
   artist?: Artist5
   mvlink?: string
   downloadPrivileges?: number[]
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

export interface Album2 {
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
   playlistId?: string
   totalFollow: number
}

export interface Artist5 {
   id: string
   name: string
   link: string
   spotlight: boolean
   alias: string
   playlistId?: string
   cover: string
   thumbnail: string
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
   Z6C86FIW: Z6C86Fiw[]
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

export interface Z6C86Fiw {
   time: number
   hour: string
   counter: number
}

export interface NewRelease {
   encodeId: string
   title: string
   alias: string
   isOffical: boolean
   username: string
   artistsNames: string
   artists: Artist6[]
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
   album: Album3
   distributor: string
   indicators: any[]
   isIndie: boolean
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric: boolean
   downloadPrivileges?: number[]
   mvlink?: string
}

export interface Artist6 {
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

export interface Album3 {
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
   artists: Artist7[]
   artistsNames: string
}

export interface Artist7 {
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

export interface WeekChart {
   vn: Vn
   us: Us
   korea: Korea
}

export interface Vn {
   banner: string
   playlistId: string
   chartId: number
   cover: string
   country: string
   type: string
   group: Group[]
   link: string
   week: number
   year: number
   latestWeek: number
   startDate: string
   endDate: string
   items: Item2[]
   sectionId: string
}

export interface Group {
   id: number
   name: string
   type: string
   link: string
}

export interface Item2 {
   encodeId: string
   title: string
   alias: string
   isOffical: boolean
   username: string
   artistsNames: string
   artists: Artist8[]
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
   album: Album4
   distributor: string
   indicators: any[]
   isIndie: boolean
   streamingStatus: number
   allowAudioAds: boolean
   hasLyric: boolean
   rakingStatus: number
   score: number
   mvlink?: string
   downloadPrivileges?: number[]
}

export interface Artist8 {
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

export interface Album4 {
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
   artists: Artist9[]
   artistsNames: string
}

export interface Artist9 {
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

export interface Us {
   banner: string
   playlistId: string
   chartId: number
   cover: string
   country: string
   type: string
   group: Group2[]
   link: string
   week: number
   year: number
   latestWeek: number
   startDate: string
   endDate: string
   items: Item3[]
   sectionId: string
}

export interface Group2 {
   id: number
   name: string
   type: string
   link: string
}

export interface Item3 {
   encodeId: string
   title: string
   alias: string
   isOffical: boolean
   username: string
   artistsNames: string
   artists: Artist10[]
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
   album: Album5
   distributor: string
   indicators: string[]
   isIndie: boolean
   streamingStatus: number
   streamPrivileges?: number[]
   downloadPrivileges: number[]
   allowAudioAds: boolean
   hasLyric?: boolean
   rakingStatus: number
   score: number
   radioId?: number
   mvlink?: string
}

export interface Artist10 {
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

export interface Album5 {
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
   artists: Artist11[]
   artistsNames: string
}

export interface Artist11 {
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

export interface Korea {
   banner: string
   playlistId: string
   chartId: number
   cover: string
   country: string
   type: string
   group: Group3[]
   link: string
   week: number
   year: number
   latestWeek: number
   startDate: string
   endDate: string
   items: Item4[]
   sectionId: string
}

export interface Group3 {
   id: number
   name: string
   type: string
   link: string
}

export interface Item4 {
   encodeId: string
   title: string
   alias: string
   isOffical: boolean
   username: string
   artistsNames: string
   artists: Artist12[]
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
   album: Album6
   distributor: string
   indicators: any[]
   isIndie: boolean
   streamingStatus: number
   downloadPrivileges?: number[]
   allowAudioAds: boolean
   hasLyric?: boolean
   rakingStatus: number
   score: number
   streamPrivileges?: number[]
   mvlink?: string
}

export interface Artist12 {
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

export interface Album6 {
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
   artists: Artist13[]
   artistsNames: string
}

export interface Artist13 {
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
