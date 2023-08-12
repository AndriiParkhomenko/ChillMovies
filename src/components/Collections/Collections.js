import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../Button/Button';
import { Headline } from '../Headline/Headline';
import './Collections.scss';
import { CollectionsContainer } from '../../containers/CollectionsContainer/CollectionsContainer';

const {REACT_APP_STORAGE_URL: storageUrl} = process.env;

export const Collections = () => {

	const [ currentTab, setCurrentTab ] = useState('1');

	return (

		<CollectionsContainer>
		{({topRated, nowPlaying, populartMovies}) => {
			const tabs = [
				{
					id: 1,
					title: 'Top Rated',
					content: topRated
				},
				{
					id: 2,
					title: 'Popular',
					content: populartMovies
				},
				{
					id: 3,
					title: 'Now Playing',
					content: nowPlaying
				},
			]
		
			const handleTabClick = e => {
				setCurrentTab(e.target.id)
			}
			return (
			<section className='collections'>
				<Headline text='Choose your compilation'>Collections</Headline>
				<div className='collections__container'>
					<div className='tabs'>
						<nav className='tabs__items'>
							{tabs.map(({id, title}) => (
									<Button 
									key={id} 
									id={id} 
									className='tabs__item' 
									disabled={currentTab === `${id}`} 
									onClick={(handleTabClick)}
									>
										{title}
									</Button>
							))}
						</nav>
					</div>
					<div className='content'>
						{tabs.map(({id, content}) => (
							<div key={id} className='content__container'>
								{currentTab === `${id}` && <div className='content__body'>{content.slice(0, 8).map(({id, title, poster_path}) => (
									<div className='content-movie' key={id}>
										<Link to={`/movie/${id}`} title={title}>
											{/* <img src={backdrop} alt='backdrop'/> */}
											<img src={`${storageUrl}/w200${poster_path}`} alt={title}
											className='content-movie__image'/>
											<div className='content-movie__title' >{title}</div>
										</Link>
								</div>
								))}</div>}
							</div>
						))}
					</div>
				</div>
			</section>
			)}}
		</CollectionsContainer>
	)
}

