import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

import Product from '../../models/Product';
import * as actionTypes from './actionTypes';

export const fetchProducts = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		try {
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/products.json`
			);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			const resData = await response.json();
			const loadedProducts = [];

			for (const key in resData) {
				loadedProducts.push(
					new Product(
						key,
						resData[key].ownerId,
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price,
						resData[key].ownerPushToken
					)
				);
			}

			dispatch({
				type: actionTypes.SET_PRODUCTS,
				products: loadedProducts.filter((prod) => prod.ownerId != userId),
				userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
			});
		} catch (error) {
			throw error;
		}
	};
};

export const createProduct = (title, description, imageUrl, price) => {
	return async (dispatch, getState) => {
		// push notifications
		let pushToken;
		let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);

		if (statusObj.status !== 'granted') {
			statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		}
		if (statusObj.status !== 'granted') {
			pushToken = null;
		} else {
			const res = await Notifications.getExpoPushTokenAsync();
			pushToken = res.data;
		}

		const token = getState().auth.token;
		const userId = getState().auth.userId;
		try {
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/products.json?auth=${token}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title,
						description,
						imageUrl,
						price,
						ownerId: userId,
						ownerPushToken: pushToken,
					}),
				}
			);
			const resData = await response.json();

			dispatch({
				type: actionTypes.CREATE_PRODUCT,
				productData: {
					id: resData.name,
					title,
					description,
					imageUrl,
					price,
					ownerId: userId,
					pushToken,
				},
			});
		} catch (error) {
			throw error;
		}
	};
};

export const updateProduct = (id, title, description, imageUrl) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;

		try {
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/products/${id}.json?auth=${token}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title,
						description,
						imageUrl,
					}),
				}
			);

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			dispatch({
				type: actionTypes.UPDATE_PRODUCT,
				productId: id,
				productData: {
					title,
					description,
					imageUrl,
				},
			});
		} catch (error) {
			throw error;
		}
	};
};

export const deleteProduct = (productId) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		try {
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/products/${productId}.json?auth=${token}`,
				{
					method: 'DELETE',
				}
			);

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			dispatch({
				type: actionTypes.DELETE_PRODUCT,
				productId,
			});
		} catch (error) {
			throw error;
		}
	};
};
