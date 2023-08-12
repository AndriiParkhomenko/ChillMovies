import * as types from "../actionTypes";
import { db } from "../../firebase-config";
import {doc, setDoc} from "firebase/firestore";


const ID_TOKEN_ALIAS = '__tkn'
const LOCAL_ID_ALIAS = '__lid'

export const signUp = (idToken, localId, email) => {
	localStorage.setItem(ID_TOKEN_ALIAS, idToken);
	localStorage.setItem(LOCAL_ID_ALIAS, localId);
	localStorage.setItem('email', email);
	setDoc(doc(db, 'users', email), {
		savedMovies: []
	})

	alert('Registration was successful');

	return {
		type: types.SING_UP,
		payload: {idToken, localId, email}
	}
};

export const logIn = (idToken, localId, email) => {
	localStorage.setItem(ID_TOKEN_ALIAS, idToken);
	localStorage.setItem(LOCAL_ID_ALIAS, localId);
	localStorage.setItem('email', email);

	return {
		type: types.LOG_IN,
		payload: {idToken, localId, email}
	}
};

export const logoutUser = () => {
	localStorage.removeItem(ID_TOKEN_ALIAS);
	localStorage.removeItem(LOCAL_ID_ALIAS);
	localStorage.removeItem('email');

	return {
		type: types.LOGOUT_USER
	};
}

export const deleteUser = () => {
	localStorage.removeItem(ID_TOKEN_ALIAS);
	localStorage.removeItem(LOCAL_ID_ALIAS);
	localStorage.removeItem('email');

	return {
		type: types.DELETE_USER
	};
}
