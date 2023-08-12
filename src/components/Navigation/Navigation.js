import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import './Navigation.scss';
import { Burger } from '../Burger/Burger';

export const Navigation = () => {
	const  links = [
		{
			id:1, 
			url: '/', 
			title: 'Home'
		}, 
		{
			id:2, 
			url: '/about', 
			title: 'About'
		}, 
		{
			id:3, 
			url: '/genres', 
			title: 'Genres',
		},
		{
			id:4, 
			url: '/articles', 
			title: 'Articles',
		},
		{
			id:5, 
			url: '/contact', 
			title: 'Contact',
		}
	]

	const [menuActive, setMenuActive] = useState(false);

	return (
		<>
		<nav className='navigation'>
			<ul className='navigation__list'>
				{links.map( ({id, url, title}) => 
					<li className='navigation__list-item' key={id}>
						<NavLink to={url} className='navigation__link' title={title}>
							{title}
						</NavLink>
					</li>
				)}
			</ul>
			<div className={menuActive ? 'burger active' : 'burger'} onClick={() => setMenuActive(true) }><span></span></div>
			{menuActive && <Burger active={menuActive} links={links} onClickCloseIcon={() => setMenuActive(false)}/>}
		</nav>
		</>
	)
};


