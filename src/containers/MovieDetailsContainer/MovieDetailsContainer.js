import PT from 'prop-types';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import {arrayUnion, doc, updateDoc, onSnapshot} from "firebase/firestore";
import { useSelector } from 'react-redux';

import { useFetch } from '../../hooks/useFetch';

const { REACT_APP_MOVIES_API_KEY: apiKey, REACT_APP_MOVIES_API_URL: baseUrl } = process.env;

export const MovieDetailsContainer = ({ children }) => {
	const {movieId} = useParams();
	const [like, setLike] = useState(false);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	const selectUser = state => state.auth;
	const user = useSelector(selectUser);
	

	const movieID = doc(db, 'users', `${user?.email}`);
	const { data: movieDetails, isFetching: isFetchingMovieDetails } = useFetch(
		`${baseUrl}/movie/${movieId}?api_key=${apiKey}`
	);

	const { data: similarMovies, isFetching: isFetchingSimilarMovies } = useFetch(
		`${baseUrl}/movie/${movieId}/similar?api_key=${apiKey}`
	);

	useEffect(() => {
		onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
			setFavoriteMovies(doc.data()?.savedMovies);
			if (doc.data()?.savedMovies.some(({id}) => id === +movieId )) {
				setLike(true);
			}
		})
	}, [user?.email], like)

	const handleSaveMovie = async () => {
		if (user?.email) {
			setLike(!like);
			await updateDoc(movieID, {
				savedMovies: arrayUnion({
					id: movieDetails?.id,
					title: movieDetails?.title,
					image: movieDetails?.poster_path,
				})
			})
			saveToFavorites(movieId);
		} else {
			alert('Please log in to save a movie');
		}
	}

	const handleDeleteMovie = async (passedID) => {
		if (user?.email) {
			try {
				setLike(!like);
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
		const updatedFavorites = favorites.filter((id) => +id !== movieId);
		localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
	}

	useEffect(() => {
		const favoritesKey = `favorites_${user?.email}`;
		const favorites = localStorage.getItem(favoritesKey) ? JSON.parse(localStorage.getItem(favoritesKey)) : [];
		if (favorites.includes(movieId)) {
			setLike(true);
		}
	}, [movieId, user?.email]);



	return children({ 
		movieDetails: movieDetails || {}, 
		similarMovies: similarMovies?.results || [], 
		isFetchingMovieDetails, 
		isFetchingSimilarMovies,
		like,
		onSaveMovie: handleSaveMovie,
		onDeleteMovie : handleDeleteMovie
	});
};

MovieDetailsContainer.propTypes = {
	// Render prop
	children: PT.func.isRequired
}