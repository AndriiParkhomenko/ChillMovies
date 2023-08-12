import { Route, Routes } from 'react-router-dom';

import { LayoutContainer } from '../../containers/LayoutContainer/LayoutContainer';
import { HomePage } from '../../pages/HomePage/HomePage';
import { SearchPage } from '../../pages/SearchPage/SearchPage';
import { MovieDetailsPage } from '../../pages/MovieDetailsPage/MovieDetailsPage';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { AuthPage } from '../../pages/AuthPage/AuthPage';
import { AboutPage } from '../../pages/AboutPage/AboutPage';

import { ContactPage } from '../../pages/ContactPage/ContactPage';
import { ArticlesPage } from '../../pages/ArticlesPage/ArticlesPage';
import { GenresPage } from '../../pages/GenresPage/GenresPage';
import { AccountPage } from '../../pages/AccountPage/AccountPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';

export const App = () => {
	useDocumentTitle();

	return (
		<div className="app">
			<LayoutContainer>
				{({ movies, articles, currentPage, totalPages, onChangePage }) => (
					<Routes>
						<Route path="/" element={<HomePage articles={articles} />}/> 
	
						<Route 
						path='/search' 
						element={<SearchPage movies={movies} currentPage={currentPage} totalPages={totalPages} onChangePage={onChangePage}/>}
						/>

						<Route path="/movie/:movieId" element={<MovieDetailsPage movies={movies}/>}/>

						<Route path="/auth" element={<AuthPage/>}/>

						<Route path="/account" element={<AccountPage/>}/>

						<Route path="/about" element={<AboutPage/>}/>

						<Route path="/genres" element={<GenresPage/>}/>

						<Route path="/articles" element={<ArticlesPage articles={articles}/>}/>

						<Route path="/contact" element={<ContactPage/>}/>

						<Route path="*" element={<NotFoundPage/>}/> 
					</Routes>
				)
				}
			</LayoutContainer>
		</div>
	);
}

