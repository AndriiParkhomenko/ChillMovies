import * as types from '../actionTypes';

const INITIAL_STATE = {
	idToken: null,
	localId: null,
	email: null
};

export const authReducer = (state = INITIAL_STATE, {type, payload}) => {
	switch (type) {
		case types.SING_UP:
			return {
				...state,
				...payload
			};

		case types.LOG_IN:
			return {
				...state,
				...payload
			};

		case types.LOGOUT_USER:
			return INITIAL_STATE;

		case types.DELETE_USER:
			return INITIAL_STATE;

		default:
			return state;
	}
};