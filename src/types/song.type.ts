export interface SongType {
   err: number
   msg: string
   data?: Data
   url?: string
   timestamp: number
}

export interface Data {
   '128': string
   '320': string
}
