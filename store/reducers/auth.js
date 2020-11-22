import * as actionTypes from '../actions/actionTypes';

const initialState = {
	userId: null,
	token: null,
	didTryAutoLogin: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTHENTICATE:
			return {
				...state,
				userId: action.userId,
				token: action.token,
				didTryAutoLogin: true,
			};

		case actionTypes.SET_DID_TRY_AL:
			return {
				...state,
				didTryAutoLogin: true,
			};

		case actionTypes.LOGOUT:
			return {
				...state,
				userId: null,
				token: null,
				didTryAutoLogin: true,
			};

		default:
			return state;
	}
};
