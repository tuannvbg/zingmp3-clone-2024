export interface HomeType {
   err: number
   msg: string
   data: {
      items: any[]
      hasMore: boolean
      total: number
   }
   timestamp: number
}
