import { combineReducers } from "redux";

import { authReducer } from "./reducers/auth";

export const rootReducer	= combineReducers({auth: authReducer});

// import * as types from './actionTypes';

// const INITIAL_STATE = {
// 	idToken: null,
// 	localId: null
// };

// export const rootReducer = (state = INITIAL_STATE, {type, payload}) => {
// 	switch (type) {
// 		case types.AUTHENTICATE_USER:
// 			return {
// 				...state,
// 				...payload
// 			}
// 		default:
// 			return state;
// 	}
// };