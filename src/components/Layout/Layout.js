import PT from 'prop-types';
import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { SocialMedia } from '../SocialMedia/SociaMedia';
import { ToolBar } from '../ToolBar/ToolBar';
import './Layout.scss';

export const Layout = ({
	search, 
	movies,
	articles,
	isSearching, 
	onChangeSearch,
	onSearchMovies,
	currentPage,
	totalPages,
	onChangePage,
	showGoToUp,
	onGoToUp,
	children
	}) => (
<div className='layout'>
	<header className='layout__header'>
		<div className='header__top'>
			<SocialMedia/>
			<ToolBar search={search} isSearching={isSearching} onChangeSearch={onChangeSearch} onSearchMovies={onSearchMovies}/>
		</div>
		<div className='header__bottom'>
			<Link to={'/'} className='header__logo'><span>Chill</span>&movies</Link>
			<Navigation/>
		</div>
	</header>

	<main className='layout__main'>
		{children({ movies, articles, currentPage, totalPages, onChangePage })}
	</main>

	<footer className='layout__footer'>
		<strong className='layout__copyright'>All Rights Reserved, {new Date().getFullYear()}</strong>
		{showGoToUp && ( 
			<a className="layout__go-to-up" onClick={onGoToUp}>
				<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
				</svg>
			</a>
		)}
	</footer>
</div>
);

Layout.propTypes = {
	// Value for the search input
	search: PT.string.isRequired,
	// List of fetched movies
	movies: PT.array.isRequired,
	// Indicates whether movies are searching
	isSearching: PT.bool.isRequired,
	// Callback for changing value of the search input
	onChangeSearch: PT.func.isRequired,
	// Callback for searching movies
	onSearchMovies: PT.func.isRequired,
	// Render function for presentation component
	children: PT.func.isRequired
}