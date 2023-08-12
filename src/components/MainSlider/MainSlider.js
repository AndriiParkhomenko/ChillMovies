import { MainSliderContainer } from '../../containers/MainSliderContainer/MainSliderContainer';
import { Loader } from '../Loader/Loader';
import { Headline } from '../Headline/Headline';

import './MainSlider.scss';
import { Slider } from '../Slider/Slider';

export const MainSlider = () => (
	<MainSliderContainer>
		{({trendingMovies, isFetchingTrendingMovies}) => {
			return (
				<div className='main-slider'>
					<Headline text='Some quality items'>Tranding Movies</Headline>
					{isFetchingTrendingMovies ? (
						<Loader/>
					): (
						<Slider sliderList={trendingMovies}/>
					)}
				</div>
			)
		}}
	</MainSliderContainer>
)