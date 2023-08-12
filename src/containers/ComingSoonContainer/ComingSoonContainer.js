import { useFetch } from '../../hooks/useFetch';

const { REACT_APP_MOVIES_API_KEY: apiKey, REACT_APP_MOVIES_API_URL: baseUrl } = process.env;

export const ComingSoonContainer = ({ children }) => {
	const { data: comingMovies, isFetching: isFetchingComingMovies } = useFetch(
		`${baseUrl}/movie/upcoming?api_key=${apiKey}`
	);

	return children({ 
		comingMovies: comingMovies?.results || [], 
		isFetchingComingMovies 
	});
}