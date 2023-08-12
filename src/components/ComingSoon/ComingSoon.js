import { ComingSoonContainer } from '../../containers/ComingSoonContainer/ComingSoonContainer';
import { Loader } from '../Loader/Loader';
import { Headline } from '../Headline/Headline';
import { Slider } from '../Slider/Slider';

import './ComingSoon.scss';

export const ComingSoon = () => (
	<ComingSoonContainer>
		{({comingMovies, isFetchingComingMovies}) => {
			return (
				<div className='coming-soon'>
					<Headline text='Grab your oportinity'>Coming Soon</Headline>
					{isFetchingComingMovies ? (
						<Loader/>
					): (
						<Slider sliderList={comingMovies}/>
					)}
				</div>
			)
		}}
	</ComingSoonContainer>
)