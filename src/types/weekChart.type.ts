export interface WeekChartType {
   banner: string
   cover: string
   country: string
   type: string
   group: Group[]
   link: string
   startDate: string
   endDate: string
}

export interface Group {
   id: number
   name: string
   type: string
   link: string
}
