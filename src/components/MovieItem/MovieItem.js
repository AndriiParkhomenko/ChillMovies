import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import {arrayUnion, doc, updateDoc, onSnapshot} from "firebase/firestore";
import { useSelector } from 'react-redux';

import noImage from '../../resources/images/no-image.jpg';

import './MovieItem.scss';

const { REACT_APP_STORAGE_URL: storageUrl } = process.env;

export const MovieItem = ({id:filmID, title, poster_path, vote_average }) => {
	const [like, setLike] = useState(false);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	const selectUser = state => state.auth;
	const user = useSelector(selectUser);

	useEffect(() => {
		onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
			setFavoriteMovies(doc.data()?.savedMovies);
			if (doc.data()?.savedMovies.some(({id}) => id === +filmID )) {
				setLike(true);
			}
		})
	}, [user?.email], like)

	const movieID = doc(db, 'users', `${user?.email}`);

	const posterUrl = poster_path ? `${storageUrl}/w500${poster_path}`: noImage;

	
	const saveMovie = async () => {
		if (user?.email) {
			setLike(true);
			await updateDoc(movieID, {
				savedMovies: arrayUnion({
					id: filmID,
					title: title,
					image: poster_path,
				})
			});
			saveToFavorites(filmID);
		} else {
			alert('Please log in to save a movie');
		}
	}

	const deleteMovie = async (passedID) => {
		if (user?.email) {
			try {
				setLike(false);
				const result = favoriteMovies.filter((item) => item.id !== passedID)
				await updateDoc(movieID, {
					savedMovies: result,
				});
				removeFromFavorites(passedID);
			} catch (error) {
				console.log(error);
			}
		} else {
			alert('Please log in to save a movie');
		}
	}

	const saveToFavorites = (movieId) => {
		const favoritesKey = `favorites_${user?.email}`;
		const favorites = localStorage.getItem(favoritesKey) ? JSON.parse(localStorage.getItem(favoritesKey)) : [];
		if (favorites.includes(movieId)) {
			setLike(true);
		} else {
			favorites.push(movieId);
		}
		localStorage.setItem(favoritesKey, JSON.stringify(favorites));
	}
	
	const removeFromFavorites = (movieId) => {
		const favoritesKey = `favorites_${user?.email}`;
		const favorites = localStorage.getItem(favoritesKey) ? JSON.parse(localStorage.getItem(favoritesKey)) : [];
		const updatedFavorites = favorites.filter((id) => id !== movieId);
		localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
	}

	useEffect(() => {
		const favoritesKey = `favorites_${user?.email}`;
		const favorites = localStorage.getItem(favoritesKey) ? JSON.parse(localStorage.getItem(favoritesKey)) : [];
		if (favorites.includes(filmID)) {
			setLike(true);
		}
	}, [filmID, user?.email]);

	return (
		<li className='movie-item' style={{backgroundImage: `url(${posterUrl})`}}>
			<div className='movie-item__favorite' onClick={like ? () => deleteMovie(filmID) :saveMovie}>
				{like ? 
				<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="gold" className="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
					<path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
				</svg>
				: 
				<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="gold" className="bi bi-bookmark-heart" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
					<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
				</svg>
				}
			</div>
			<Link to={`/movie/${filmID}`} className='movie-item__link' title={title}>
				<h2 className='movie-item__title' >{title}</h2>
				<p className='movie-item__rate'><span>{vote_average.toFixed(1)}</span></p>
			</Link>
		</li>
	)
}