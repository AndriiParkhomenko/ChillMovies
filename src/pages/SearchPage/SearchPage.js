import PT from 'prop-types';

import { Pagination } from '../../components/Pagination/Pagination';
import { MovieItem } from '../../components/MovieItem/MovieItem';
import './SearchPage.scss';

export const SearchPage = ({movies, currentPage, totalPages, onChangePage }) => (
	<div className="search">
		<div className='search-page'>
			{movies.length ? (
				<ul className='search-page__list'>
					{movies.map((movie) => (
						<MovieItem key={movie.id} {...movie} />
					))}
				</ul>
				) : (
				<p className='no-movies'>There is no movies yet</p>
				)
			}
		</div>
	{movies.length === 0 ? null : <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={onChangePage}/>}
	</div>

)

SearchPage.propTypes ={
	// List of movies fetched from the Movies API
	movies: PT.arrayOf(
		PT.shape({
		id: PT.number.isRequired,
		poster_path: PT.string,
		title: PT.string.isRequired,
		})).isRequired
}