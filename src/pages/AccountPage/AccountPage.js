import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, logoutUser } from '../../store/actions/auth';
import { SavedMovies } from '../../components/SavedMovies/SavedMovies';
import { useMutation } from '../../hooks/useMutation';
import { Button } from '../../components/Button/Button';

import './AccountPage.scss';

const {REACT_APP_FIREBASE_API_KEY: apiKey, REACT_APP_FIREBASE_AUTH_URL: baseUrl } = process.env;

export const AccountPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const selectUser = state => state.auth;
	const user = useSelector(selectUser);

	useEffect(() => {
		if (!(user?.email)) navigate('/');
	}, [user?.email]);

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/')
	}

	const deleteUrl = baseUrl + `/accounts:delete?key=${apiKey}`;

	const {mutate} = useMutation({
		url: deleteUrl,
		headers: {
			'Content-Type': 'application/json'
		},
		onSuccess: () => {
			dispatch(deleteUser())
			navigate('/')
		},
		onError: error => alert(`Запит не був відправлений ${error}`)
	});

	const handleDeleteUser = (passedIdToken) => {
		mutate(JSON.stringify({idToken: passedIdToken}));
	}

	return (
		<div className='account-page'>
			<div className='account-page__info'>Email:<span>{user?.email}</span></div>
			<div className='account-page__favorite'>
				<h2>My movies</h2>
				<SavedMovies/>
			</div>
			<Button className='logout-account' onClick={handleLogout}>Logout</Button>
			<Button className='delete-account' onClick={() => handleDeleteUser(user.idToken)}>Delete account</Button>
		</div>
	)
}
