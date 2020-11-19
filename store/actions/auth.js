import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from './actionTypes';

export const authenticate = (userId, token, expiryTime) => {
	return (dispatch) => {
		dispatch(setLogoutTimer(expiryTime));
		dispatch({
			type: actionTypes.AUTHENTICATE,
			userId,
			token,
		});
	};
};

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

		dispatch(
			authenticate(
				resData.localId,
				resData.idToken,
				parseInt(resData.expiresIn) * 1000
			)
		);

		const timestamp =
			(new Date().getTime() + parseInt(resData.expiresIn)) * 1000;
		const expirationDate = new Date(timestamp);

		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
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

		dispatch(
			authenticate(
				resData.localId,
				resData.idToken,
				parseInt(resData.expiresIn) * 1000
			)
		);

		const timestamp =
			(new Date().getTime() + parseInt(resData.expiresIn)) * 1000;
		const expirationDate = new Date(timestamp);

		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

export const logout = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem('userData');
	return {
		type: actionTypes.LOGOUT,
	};
};

let timer;
const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

const setLogoutTimer = (expirationTime) => {
	return (dispatch) => {
		timer = setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

const saveDataToStorage = (token, userId, expirationDate) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token,
			userId,
			expiryDate: expirationDate.toISOString(),
		})
	);
};
