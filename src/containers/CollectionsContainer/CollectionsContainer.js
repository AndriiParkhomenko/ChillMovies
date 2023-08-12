import { useFetch } from '../../hooks/useFetch';

const { REACT_APP_MOVIES_API_KEY: apiKey, REACT_APP_MOVIES_API_URL: baseUrl } = process.env;

export const CollectionsContainer = ({ children }) => {
	const { data: topRated } = useFetch(
		`${baseUrl}/movie/top_rated?api_key=${apiKey}`
	);

	const { data: nowPlaying } = useFetch(
		`${baseUrl}/movie/now_playing?api_key=${apiKey}`
	);

	const { data: populartMovies } = useFetch(
		`${baseUrl}/movie/popular?api_key=${apiKey}`
	);

	return children({ 
		topRated: topRated?.results || [], 
		nowPlaying: nowPlaying?.results || [], 
		populartMovies: populartMovies?.results || [], 
	});
}