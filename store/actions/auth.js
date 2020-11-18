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
			const errorResData = await response.json();
			const errorId = errorResData.error.message;

			let message = 'Something went wrong!';

			if (errorId === 'EMAIL_EXISTS') {
				message = `Email already exists`;
			}

			throw new Error(message);
		}

		const resData = await response.json();

		dispatch({
			type: actionTypes.SIGNUP,
		});
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaBxCdmkTXEhKi8vzNhx7li1DMLSpceoc`,
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
			const errorResData = await response.json();
			const errorId = errorResData.error.message;

			let message = 'Something went wrong!';

			if (errorId === 'EMAIL_NOT_FOUND') {
				message = `Email couldn't be found!`;
			} else if (errorId === 'INVALID_PASSWORD') {
				message = `Invalid password!`;
			}

			throw new Error(message);
		}

		const resData = await response.json();

		dispatch({
			type: actionTypes.LOGIN,
		});
	};
};
