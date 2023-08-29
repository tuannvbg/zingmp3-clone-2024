import ZingChartWeek from '@/modules/ZingChartWeek/ZingChartWeek'
import React from 'react'

export default function page({ params }: { params: { id: string } }) {
   return <ZingChartWeek params={params} />
}
