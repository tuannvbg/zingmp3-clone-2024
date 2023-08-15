// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/bundle'

// Anh nghi la thang nextjs no chua tuong thich voi Swiper
// De co gi toi anh lam thu, neu oke thi a giup, da

export default function Slider() {
   return (
      <Swiper
         // install Swiper modules
         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
         spaceBetween={30}
         slidesPerView={3}
         navigation //Kích hoạt điều hướng (nút prev và next) cho slider.
         pagination={{ clickable: true }} //Kích hoạt phân trang và làm cho các chấm tròn trở thành các nút có thể nhấp để chuyển đến slide tương ứng
         // autoplay={{ delay: 1000, disableOnInteraction: false }} //Kích hoạt chế độ tự động chuyển slide. Trong trường hợp này, mỗi slide sẽ tự động chuyển sau 1 giây và sẽ không tắt khi người dùng tương tác với slider.
      >
         <SwiperSlide>Slide 1</SwiperSlide>
         <SwiperSlide>Slide 2</SwiperSlide>
         <SwiperSlide>Slide 3</SwiperSlide>
         <SwiperSlide>Slide 3</SwiperSlide>
         <SwiperSlide>Slide 3</SwiperSlide>
         <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
   )
}
