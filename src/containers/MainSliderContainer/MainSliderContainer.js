import { useFetch } from '../../hooks/useFetch';

const { REACT_APP_MOVIES_API_KEY: apiKey, REACT_APP_MOVIES_API_URL: baseUrl } = process.env;

export const MainSliderContainer = ({ children }) => {
	const { data: trendingMovies, isFetching: isFetchingTrendingMovies } = useFetch(
		`${baseUrl}/trending/movie/week?api_key=${apiKey}`
	);

	return children({ 
		trendingMovies: trendingMovies?.results || [], 
		isFetchingTrendingMovies 
	});
}