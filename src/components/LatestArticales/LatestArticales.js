import { Link } from 'react-router-dom';

import { Button } from '../Button/Button';
import { Headline } from '../Headline/Headline';
import { SocialMedia } from '../SocialMedia/SociaMedia';
import { Loader } from '../Loader/Loader';
import './LatestArticales.scss';

export const LatestArticales = ({articles}) => {
	const latestArticles = articles.slice(1, 4);
	
	return(
		<section className='articles'>
			{latestArticles === [] ? (
			<Loader/>
			) : (
				<div className="articles-container">
					<Headline text='read your articles'>Latest Articles</Headline>
					<div className='articles__content'>
					{latestArticles.map(({display_title, summary_short, publication_date, multimedia:{src}, link:{url}}, index) => (
						<div key={index} className='content__article'>
							<div className='content__image'>
								<img src={src} alt='article'/>
							</div>
							<div className='content__info'>
								<div className='content__date'>
									{`${publication_date.slice(8)}.${publication_date.slice(5,7)}.${publication_date.slice(0,4)}`}
								</div>
								<div className='content__title'><a href={url} target='_blank' rel='noreferrer'>{display_title}</a></div>
								<div className='content__description'>{summary_short}</div>
							</div>
							<div className='content__inspiration'>
								<p>Inspiration</p>
								<SocialMedia/>
							</div>
						</div>
					))}
					</div>
					<div className='articles__bottom'>
						<Link to={`/articles`}>
							<Button className='btn'>Read all articles<span></span></Button>
						</Link>
					</div>
				</div>
			)}
		</section>
	)
}