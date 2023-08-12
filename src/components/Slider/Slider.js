import { Navigation, Pagination, Keyboard, Mousewheel  } from 'swiper'; 
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.scss';
import { MovieItem } from '../MovieItem/MovieItem';

export const Slider = ({sliderList}) => {

	return (
				<div className="slider-content">
					<Swiper
						modules={[Navigation, Pagination, Keyboard, Mousewheel]}
						slidesPerView={7}
						grabCursor={true}
						keyboard={{enabled: true}}
						navigation
						mousewheel={true}
						pagination={{ clickable: true }}
						breakpoints={{
							1400: {
								spaceBetween: 10,
								slidesPerView: 6,
							},
							1200: {
								spaceBetween: 30,
								slidesPerView: 5,
							},
							993: {
								spaceBetween: 25,
								slidesPerView: 5,
							},
							768: {
								spaceBetween: 20,
								slidesPerView: 4,
							},
							576: {
								spaceBetween: 40,
								slidesPerView: 3,
							},
							320: {
								spaceBetween: 5,
								slidesPerView: 2,
							},
						}}
					>
						{sliderList.map((movie) => {
							return (
								<SwiperSlide key={movie.id}>
									<MovieItem {...movie} />
								</SwiperSlide>
							)
						})}
					</Swiper>
				</div>
	)
}