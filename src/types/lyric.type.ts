export interface LyricType {
   err: number
   msg: string
   data: Data
   timestamp: number
}

export interface Data {
   sentences: Sentence[]
   file: string
   enabledVideoBG: boolean
   defaultIBGUrls: string[]
   BGMode: number
}

export interface Sentence {
   words: Word[]
}

export interface Word {
   startTime: number
   endTime: number
   data: string
}
