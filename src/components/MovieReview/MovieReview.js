import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

import './MovieReview.scss';

export const MovieReview = ({articles}) => {
	const freshReviews = articles.slice(0, 1);
	
	return (
		<section className='latest'>
			{freshReviews === [] ? (
			<Loader/>
			) : (
				<div className='latest-container'>
					{freshReviews.map(({byline, display_title, summary_short, multimedia:{src}, link:{url}}, index) => {
						return (
							<div key={index} className='latest-review'>
								<div className='latest-review__image'>
									<img src={src} alt='latest-review'/>
								</div>
								<div className='latest-review__info'>
									<p className='latest-review__headline'>Fresh review</p>
									<p className='latest-review__author'>By {byline}</p>
									<p className='latest-review__title'>{display_title}</p>
									<p className='latest-review__description'>{summary_short}</p>
									<Button className='latest-review__button'><a href={url} target='_blank' rel="noreferrer" >More details</a><span></span></Button>
								</div>
							</div>
						)
					})}
				</div>
			)}
		</section>
	)
}
