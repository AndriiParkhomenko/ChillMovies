import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './ToolBar.scss';

const selectIdToken = state => !!state.auth.idToken;

export const ToolBar = ({search, isSearching, onChangeSearch, onSearchMovies}) => {
	const isAuthenticated = useSelector(selectIdToken);
	return (
		<div className="toolbar">
			<div className="account">
				<Link to={isAuthenticated ? '/account' : '/auth'} className='account__link'>
					<img src='/images/icons/account.svg' alt='account'/>
					<p>{isAuthenticated ? 'Account' : 'Sing in'}</p>
				</Link>
			</div>
			<div className="search">
				<Button className='search__button' disabled={isSearching} onClick={onSearchMovies}>
					<Link to={'/search'} className='search__link'>
						<img src='/images/icons/search.svg' alt='search'/>
					</Link>
				</Button>
				<Input
				name='search'
				placeholder='SEARCH'
				className='search__input'
				disabled={isSearching} 
				value={search} 
				onChange={onChangeSearch}
				/>
			</div>
		</div>

	)
}