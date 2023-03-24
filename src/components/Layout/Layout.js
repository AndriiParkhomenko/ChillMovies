import PT from 'prop-types';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './Layout.scss';

export const Layout = ({
	search, 
	movies,
	isSearching, 
	onChangeSearch,
	onSearchMovies,
	children
	}) => (
<div className='layout'>
	<header className='layout__header'>
		<div className="layout__search-wrapper">
			<Input 
			name='search' 
			placeholder='Search' 
			disabled={isSearching} 
			value={search} 
			onChange={onChangeSearch}
			/>
			<Button disabled={isSearching} onClick={onSearchMovies}>{isSearching ? 'Searching' : 'Search'}</Button>
		</div>
		{/* TODO: Navigation */}
	</header>

	<main className='layout__main'>{children({ movies })}</main>

	<footer className='layout__footer'>
		<strong className='layout__copyright'>All Rights Reserved, {new Date().getFullYear()}</strong>
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