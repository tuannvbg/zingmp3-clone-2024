export interface CategoryMVType {
   err: number
   msg: string
   data: Data
   timestamp: number
}

export interface Data {
   id: string
   name: string
   title: string
   alias: string
   link: string
   parent: Parent
   childs: Child[]
}

export interface Parent {
   id: string
   name: string
   title: string
   alias: string
   link: string
}

export interface Child {
   id: string
   name: string
   title: string
   alias: string
   link: string
}
