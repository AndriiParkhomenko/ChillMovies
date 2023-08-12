import { logIn, logoutUser } from "../store/actions/auth";

const ID_TOKEN_ALIAS = '__tkn'
const LOCAL_ID_ALIAS = '__lid'

export const checkAuthState = (store) => {
	const idToken = localStorage.getItem(ID_TOKEN_ALIAS);
	const localId = localStorage.getItem(LOCAL_ID_ALIAS);
	const email = localStorage.getItem('email');

	if (idToken && localId && email) {
		store.dispatch(logIn(idToken, localId, email));
	} else {
		store.dispatch(logoutUser());
	}
};