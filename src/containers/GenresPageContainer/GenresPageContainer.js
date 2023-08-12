import { useState, useEffect } from 'react';

import { useFetch } from '../../hooks/useFetch';

const { REACT_APP_MOVIES_API_KEY: apiKey, REACT_APP_MOVIES_API_URL: baseUrl } = process.env;

export const GenresPageContainer = ({children}) => {
	const [ genreId, setGenreId ] = useState(null);
	const [ currentGenre, setCurrentGenre ] = useState(null);
	const [ genrePage, setGenrePage ] = useState(1);
	const [totalGenresPages, setGenresTotalPages] = useState(0);

	const { data: genreMovies, isFetching: isFetchingGenreMovies } = useFetch(
		`${baseUrl}/genre/movie/list?api_key=${apiKey}`
	);

	const { data: genrList, refetch, isFetching: isFetchingGenrList } = useFetch(
		`${baseUrl}/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${genrePage}&sort_by=popularity.desc&with_genres=${genreId}`, {
			enabled: false,
			onSuccess: (data) => {
				if(data?.total_pages > 500 ? setGenresTotalPages(500) : setGenresTotalPages(data?.total_pages));
				
				if(data.total_pages < genrePage) {
					setGenrePage(1);
				}
			}
		}
	);

	useEffect(() => {
		refetch();
	}, [genrePage, genreId])

	const handleChangeGenre = id => {
		setGenreId(id);
		setCurrentGenre(id);
		setGenrePage(1);
	}

	const handleGenresChangePage = pageNumber => {
		setGenrePage(pageNumber);
	}

	return children({ 
		genreMovies: genreMovies?.genres || [], 
		isFetchingGenreMovies,
		onChangeGenre: handleChangeGenre,
		currentGenre,
		genrList: genrList?.results || [],
		isFetchingGenrList,
		currentGenrePage: genrePage,
		totalGenresPages,
		onGenresChangePage: handleGenresChangePage,
	});
}