import PT from 'prop-types';
import { useState , useEffect} from "react"

import { Layout } from "../../components/Layout/Layout";
import { useFetch } from "../../hooks/useFetch";

const { REACT_APP_MOVIES_API_KEY: apiKey, REACT_APP_MOVIES_API_URL: baseUrl } = process.env;

export const LayoutContainer = ({as: Component = Layout, ...other}) => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [showGoToUp, setShowGoToUp] = useState(false);

	const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${search}&page=${page}`;

	const { data, refetch, isFetching } = useFetch(url, {
		enabled: false,
		onSuccess: (data) => {
			setTotalPages(data?.total_pages);
			
			if(data.total_pages < page) {
				setPage(1);
			}
		}});
		

		const { data: moviesReview } = useFetch(
			`https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=JYMqVGqEYaJ71ap5dGGTcCIjtn0anWJo`,
		);

		
		useEffect(() => {
			refetch();
		}, [page])

		useEffect(() => {
			const handleScroll = () => {
				if (window.pageYOffset > 100) {
					setShowGoToUp(true);
				} else {
				setShowGoToUp(false);
				}
			};

			window.addEventListener('scroll', handleScroll, { passive: true });
			return () => window.removeEventListener('scroll', handleScroll, { passive: true });
		}, []);

		
	const handleChangeSearch = e => {
		setSearch(e.target.value);
	}

	
	const handleChangePage = pageNumber => {
		setPage(pageNumber);
	}

	const handleGoToUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });
	
	const movies = data?.results || [];
	const articles = moviesReview?.results || [];

	return (
	<Component 
	{...other} 
	search={search} 
	movies={movies}
	articles={articles}
	isSearching={isFetching}
	onChangeSearch={handleChangeSearch}
	onSearchMovies={refetch}
	currentPage={page}
	totalPages={totalPages}
	onChangePage={handleChangePage}
	showGoToUp={showGoToUp}
	onGoToUp={handleGoToUp}
	/>
	);
};

LayoutContainer.propTypes = {
	// Component to render
	as: PT.elementType
};