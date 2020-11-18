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
				token: action.token,
				userId: action.userId,
			};

		default:
			return state;
	}
};
