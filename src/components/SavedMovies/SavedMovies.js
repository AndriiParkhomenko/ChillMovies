import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { db } from '../../firebase-config';
import {onSnapshot, doc, updateDoc} from "firebase/firestore";
import noImage from '../../resources/images/no-image.jpg';
import './SavedMovies.scss';

const { REACT_APP_STORAGE_URL: storageUrl } = process.env;

export const SavedMovies = () => {
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	
	const selectUser = state => state.auth;
	const user = useSelector(selectUser);

	useEffect(() => {
		onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
			setFavoriteMovies(doc.data()?.savedMovies);
		})
	}, [user?.email])

	const movieRef = doc(db, 'users', `${user?.email}`);

	const deleteMovie = async (passedID) => {
		try {
			const result = favoriteMovies.filter((item) => item.id !== passedID)
			await updateDoc(movieRef, {
				savedMovies: result,
			})
			removeFromFavorites(passedID)
		} catch (error) {
			console.log(error);
		}
	}

	const removeFromFavorites = (movieId) => {
		const favoritesKey = `favorites_${user?.email}`;
		const favorites = localStorage.getItem(favoritesKey) ? JSON.parse(localStorage.getItem(favoritesKey)) : [];
		const updatedFavorites = favorites.filter((id) => +id !== movieId);
		localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
	}

	return (
		<>
		{favoriteMovies && favoriteMovies.length === 0 ? (
				<p className='no-movies'>There is no movies yet</p>
			) : (
				<div className="favorite-container">
					{favoriteMovies.map(({id, title, image}) => {
						const posterUrl = image ? `${storageUrl}/w200${image}`: noImage;

						return (
							<div className="favorite-item" key={id}>
								<div className="favorite-item__image-wrapper">
									<span onClick={() => deleteMovie(id)}>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-trash" viewBox="0 0 16 16">
											<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
											<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
										</svg>
									</span>
									<img className="favorite-item__image" src={posterUrl} alt="favorite-item"/>
								</div>
								<p className="favorite-item__title"><Link to={`/movie/${id}`}>{title}</Link></p>
							</div>
						)
					} )}
				</div>
			)}
		</>
	)
}