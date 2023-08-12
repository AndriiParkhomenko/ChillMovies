import { GenresPageContainer } from '../../containers/GenresPageContainer/GenresPageContainer';
import { Pagination } from '../../components/Pagination/Pagination';
import { MovieItem } from '../../components/MovieItem/MovieItem';
import { Loader } from '../../components/Loader/Loader';
import './GenresPage.scss';

export const GenresPage = () => (
	<GenresPageContainer>
		{({genreMovies, 
		isFetchingGenreMovies, 
		onChangeGenre, 
		genrList, 
		isFetchingGenrList, 
		currentGenrePage, 
		totalGenresPages, 
		onGenresChangePage, 
		currentGenre}) => {
			return (
				<div className='genres'>
					{isFetchingGenreMovies ? (
						<Loader/>
					) : (	<div className="genres-block">
						<ul className='genres-list'>
							{genreMovies.map(({id, name}) => {
								return(
									<li key={id}>
										<button className='genres-item' disabled={currentGenre === id} onClick={() => onChangeGenre(id)}>{name}</button>
									</li>
								)
							})}
						</ul>
					</div>)}
					<div className='genres-movies'>
						{isFetchingGenrList ? (
							<Loader/>
						) : (<div className='genres-movies__container'>
							{genrList.length ? (
								<ul className='genres-movies__list'>
									{genrList.map((movie) => (
										<MovieItem key={movie.id} {...movie} />
									))}
								</ul>
							) : (
								<p className='no-movies'>There is no movies yet</p>
							)}
						</div>)}
						{genrList.length === 0 ? 
						null : 
						<Pagination currentPage={currentGenrePage} totalPages={totalGenresPages} onChangePage={onGenresChangePage}/>}
					</div>
				</div>
			)
		}}
	</GenresPageContainer>
)