import { ArtistType } from '@/types/artist.type'
import { ChartHomeType } from '@/types/charthome.type'
import { HomeType } from '@/types/home.type'
import { InfoSongType } from '@/types/infoSong.type'
import { NewReleaseChartType } from '@/types/newReleaseChart.type'
import { PlaylistType } from '@/types/playlist.type'
import { SongType } from '@/types/song.type'
import { Top100Type } from '@/types/top100.type'
import http from '@/utils/http'

export const getHome = () => http.get<HomeType>('/home')

//bài phát mới phát hành
export const getNewReleaseChart = () => http.get<NewReleaseChartType>('/newreleasechart')

export const getPlayList = (params: { id: string }) =>
   http.get<PlaylistType>('/detailplaylist', {
      params
   })

//link bài hát
export const getSong = async (params: { id: string }) => {
   try {
      const res = await http.get<SongType>('/song', {
         params
      })
      return res.data.err === 0 ? res.data.data : res.data.url
   } catch (error) {
      console.log(error)
   }
}

export const getInfoSong = (params: { id: string }) =>
   http.get<InfoSongType>('/infosong', {
      params
   })

//get top 100
export const getTop100 = () => http.get<Top100Type>('/top100')

// trang zingchart
export const getCharthome = () => http.get<ChartHomeType>('/charthome')

//search
export const search = (params: { keyword: string }) =>
   http.get('/search', {
      params
   })

export const getArtist = (params: { name: string }) =>
   http.get<ArtistType>('/artist', {
      params
   })
