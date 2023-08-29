export interface RadioType {
   id: number
   encodeId: string
   title: string
   thumbnail: string
   thumbnailM: string
   thumbnailV: string
   thumbnailH: string
   description: string
   status: number
   type: string
   link: string
   streaming: string
   host: Host
   activeUsers: number
   program: Program
}

export interface Host {
   name: string
   encodeId: string
   thumbnail: string
   link: string
}

export interface Program {
   encodeId: string
   title: string
   thumbnail: string
   thumbnailH: string
   description: string
   startTime: number
   endTime: number
   hasSongRequest: boolean
}
