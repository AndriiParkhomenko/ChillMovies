import PT from 'prop-types';

import { MovieDetailsContainer } from '../../containers/MovieDetailsContainer/MovieDetailsContainer';
import { Button } from "../../components/Button/Button";
import { Loader } from '../../components/Loader/Loader';

import noImage from '../../resources/images/no-image.jpg';
import { Headline } from '../../components/Headline/Headline';
import { Slider } from '../../components/Slider/Slider';
import './MovieDetailsPage.scss'

const {REACT_APP_STORAGE_URL: storageUrl} = process.env;

export const MovieDetailsPage = () => (
	<MovieDetailsContainer>
		{({ movieDetails,
			similarMovies, 
			isFetchingMovieDetails, 
			isFetchingSimilarMovies, 
			like,
			onSaveMovie,
			onDeleteMovie }) => {
			const { id,
				title, 
				original_title, 
				release_date, 
				poster_path, 
				overview, 
				vote_average,
				genres,
				budget,
				revenue,
				production_countries,
				runtime,
				tagline} = movieDetails;

				const similarMoviesList = similarMovies && similarMovies.length !== 0 ? similarMovies : null;

				const originalTitle = original_title ? original_title : null;
				const poster = poster_path ? `${storageUrl}/w500${poster_path}` : noImage;
				const movieGenres = genres && genres.length !== 0 ? genres.map(({id, name}) => <span key={id}>{` ${name}`}</span>) : null;
				const rating = vote_average ? vote_average.toFixed(1) : null;
				const productCountries = production_countries && production_countries.length !== 0 ? production_countries : null;
				const prodCountries = production_countries ? 
				production_countries.map(({name}) => <span key={name}>{` ${name}`}</span>) 
				: null;
				const date = release_date ? `${release_date.slice(8)}.${release_date.slice(5,7)}.${release_date.slice(0,4)}`  : null;

			return (
				<div className="movie-details-page">
					{isFetchingMovieDetails ? (
					<Loader/>
					) : (
					<div className="movie-details-page__top">
						<div className="movie-details-page__image-wrapper">
							<img className="movie-details-page__image" src={poster} alt='poster'/>
						</div>
						<div className="movie-details-page__info info-movie">
							<div className="info-movie__block">
								<p className="info-movie__label">Title</p>
								<h2 className="info-movie__title info-movie__text">{title}</h2>
							</div>
							{title !== originalTitle ? <div className="info-movie__block">
								<p className="info-movie__label">Original title</p>
								<h2 className="info-movie__title info-movie__text">{originalTitle}</h2>
							</div>: null}
							<div className="info-movie__flex-block">
								{rating ? <div className="info-movie__block rate">
									<p className="info-movie__label">IMDb</p>
									<p className="info-movie__rate info-movie__text">{rating}</p>
								</div>: null}
								{date ? <div className="info-movie__block">
									<p className="info-movie__label">Realease date</p>
									<p className="info-movie__date info-movie__text">{date}</p>
								</div> : null}
							</div>
							{movieGenres ? <div className="info-movie__block">
								<p className="info-movie__label">Genres</p>
								<p className="info-movie__genres info-movie__text">{movieGenres}</p>
							</div> : null}
							{productCountries ? <div className="info-movie__block">
								<p className="info-movie__label">Countries</p>
								<p className="info-movie__countries info-movie__text">{prodCountries}</p>
							</div> : null}
							{runtime ? <div className="info-movie__block">
								<p className="info-movie__label">Runtime</p>
								<p className="info-movie__runtime info-movie__text">{`${runtime} min.`}</p>
							</div> : null}
							{budget && revenue ? 
							<div className="info-movie__block profit">
								<div>
									<p className="info-movie__label">Budget</p>
									<p className="info-movie__budget info-movie__text">{budget.toLocaleString()}</p>
								</div>
								<div>
									<p className="info-movie__label">Revenue</p>
									<p className="info-movie__revenue info-movie__text">{revenue.toLocaleString()}</p>
								</div>
							</div>
							: null}
							{tagline ? <div className="info-movie__block">
								<p className="info-movie__label">Slogan</p>
								<p className="info-movie__slogan info-movie__text">{tagline}</p>
							</div> : null}
							<span className='info-movie__favorite'>
							{like ? 
								<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="gold" className="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
									<path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
								</svg>
								: 
								<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="gold" className="bi bi-bookmark-heart" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
									<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
								</svg>
								}
							</span>
							<Button 
							variant="primary" 
							className="info-movie__button" 
							title="Add to Favorite" 
							onClick={like ? () => onDeleteMovie(id) : onSaveMovie}>
								{like ? 'Remove from Favorites' : 'Add to Favorites'}
							</Button>
						</div>
					</div>
					)}
					{overview ? <div className="overview">
						<p className="overview__label">Overview</p>
						<span className="overview__text">{overview}</span>
					</div> : null}
					{similarMoviesList ? (<div className="movie-details-page__bottom">
						<Headline text='Look at this'>Similar Movies</Headline>
						{isFetchingSimilarMovies ? (
							<Loader/>
						): (
							<Slider sliderList={similarMovies}/>
						)}
					</div>) : null} 
				</div>
			)
		}}
	</MovieDetailsContainer>
)

MovieDetailsPage.propTypes = {
	// List of fetched moviesfrom the API
	movies: PT.arrayOf(PT.shape({
		id: PT.number.isRequired,
		title: PT.string.isRequired,
		original_title: PT.string,
		poster_path: PT.string,
		release_date: PT.string.isRequired,
		overview: PT.string.isRequired,
		vote_average: PT.number,

	})).isRequired,
}