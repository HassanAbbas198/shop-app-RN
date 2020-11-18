import * as actionTypes from './actionTypes';

export const signup = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaBxCdmkTXEhKi8vzNhx7li1DMLSpceoc`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			throw new Error('Something went wrong');
		}

		const resData = await response.json();

		dispatch({
			type: actionTypes.SIGNUP,
		});
	};
};
