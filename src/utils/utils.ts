export function formatDateFromTimestamp(timestamp: number) {
   const date = new Date(timestamp)
   const year = date.getFullYear()
   const month = (date.getMonth() + 1).toString().padStart(2, '0')
   const day = date.getDate().toString().padStart(2, '0')
   return `${day}/${month}/${year}`
}

export function formatNumberWithK(number: number) {
   return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 0 }).format(number)
}

export function timeFormatter(timeElement: number) {
   const timeFloored = Math.floor(timeElement)
   const min = Math.floor(timeFloored / 60)
   const sec = timeFloored % 60
   return `${min >= 10 ? min : `0${min}`}:${sec >= 10 ? sec : `0${sec}`}`
}

export function secondsToHoursMinutes(seconds: number) {
   const hours = Math.floor(seconds / 3600)
   const minutes = Math.floor((seconds % 3600) / 60)
   return `${hours} giờ ${minutes} phút`
}

export function formatDateDifference(targetTimestamp: number): string {
   const currentDate = new Date()
   const targetDate = new Date(targetTimestamp * 1000) // Chuyển đổi sang milliseconds
   const timeDifferenceInMs = currentDate.getTime() - targetDate.getTime()
   const daysDifference = Math.floor(timeDifferenceInMs / (24 * 60 * 60 * 1000))
   return daysDifference === 0 ? 'Hôm nay' : `${daysDifference} ngày trước`
}

export function formatNumberWithDot(number: number) {
   return new Intl.NumberFormat('de-DE').format(number)
}
