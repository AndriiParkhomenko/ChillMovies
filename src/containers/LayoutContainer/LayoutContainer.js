import { useState } from "react"
import PT from 'prop-types';

import { Layout } from "../../components/Layout/Layout";

export const LayoutContainer = ({as: Component = Layout, ...other}) => {
	const [search, setSearch] = useState('');
	const [movies, setMovies] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	const handleChangeSearch = e => {
		setSearch(e.target.value);
	}

	const handleSearchMovies = async () => {
		setIsSearching(true);

		// Sending request

			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/users', {
					method: 'POST',
					headers: {	
						'Content-Type': 'application/json' 
					},
					body: JSON.stringify({
						name: 'Bob',
						age: 23
					})
				});
				console.log(response); 

				const users = await response.json();

				const mockMovies = [1, 2, 3];

				setMovies(mockMovies);
				setIsSearching(false);
			} catch (e) {
				console.log(e)
			}
	}

	return (
	<Component 
	{...other} 
	search={search} 
	movies={movies} 
	isSearching={isSearching} 
	onChangeSearch={handleChangeSearch}
	onSearchMovies={handleSearchMovies}
	/>
	);
};

LayoutContainer.propTypes = {
	// Component to render
	as: PT.elementType
};