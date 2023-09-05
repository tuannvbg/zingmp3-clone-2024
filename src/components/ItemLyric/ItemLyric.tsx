import { AppContext } from '@/contexts/app.context'
import { Sentence } from '@/types/lyric.type'
import { timeFormatter } from '@/utils/utils'
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed'
import React, { useCallback, useContext, useRef } from 'react'

export default function ItemLyric({ lyric }: { lyric: Sentence }) {
   const { currentTimeAudio } = useContext(AppContext)
   const currentTime = timeFormatter(currentTimeAudio)
   const liRef = useRef(null)

   const scrollActive = useCallback(() => {
      setTimeout(() => {
         if (!liRef.current) return
         smoothScrollIntoView(liRef.current, {
            block: 'center',
            behavior: 'smooth'
         })
      }, 50)
   }, [])

   let text = ''
   const words = lyric.words
   const startTime = timeFormatter(words[0].startTime / 1000)
   const endTime = timeFormatter(words[words.length - 1].endTime / 1000)

   const active = currentTime >= startTime && currentTime < endTime
   const over = currentTime > endTime

   lyric.words.forEach((item) => {
      text += `${item.data} `
   })

   if (active) {
      scrollActive()
   }

   return (
      <li ref={liRef} className={`${over && 'text-secondary'} ${active && 'text-tprimary'}`}>
         {' '}
         {text}{' '}
      </li>
   )
}
