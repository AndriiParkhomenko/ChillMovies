import { MainSlider } from '../../components/MainSlider/MainSlider';
import { Quote } from '../../components/Quote/Quote';
import { ComingSoon } from '../../components/ComingSoon/ComingSoon';
import { Collections } from '../../components/Collections/Collections';
import { MovieReview } from '../../components/MovieReview/MovieReview';
import { LatestArticales } from '../../components/LatestArticales/LatestArticales';
import './HomePages.scss';

export const HomePage = ({articles}) => (
	<div className='home-page'>
		<MainSlider/>
		<Quote/>
		<Collections/>
		<MovieReview articles={articles}/>
		<ComingSoon/>
		<LatestArticales articles={articles}/>
	</div>
);
