import * as actionTypes from '../actions/actionTypes';

const initialState = {
	userId: null,
	token: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTHENTICATE:
			return {
				...state,
				userId: action.userId,
				token: action.token,
			};

		case actionTypes.LOGOUT:
			return {
				...state,
				userId: null,
				token: null,
			};

		default:
			return state;
	}
};
