import * as actionTypes from './actionTypes';
import Order from '../../models/Order';

export const fetchOrders = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/orders/u1.json`
			);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			const resData = await response.json();
			const loadedOrders = [];

			for (const key in resData) {
				loadedOrders.push(
					new Order(
						key,
						resData[key].cartItems,
						resData[key].totalAmount,
						new Date(resData[key].date)
					)
				);
			}

			dispatch({ type: actionTypes.SET_ORDERS, orders: loadedOrders });
		} catch (error) {
			throw error;
		}
	};
};

export const addOrder = (cartItems, totalAmount) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		try {
			const date = new Date();
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/orders/u1.json?auth=${token}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						cartItems,
						totalAmount,
						date: date.toISOString(),
					}),
				}
			);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			const resData = await response.json();

			dispatch({
				type: actionTypes.ADD_ORDER,
				orderData: {
					id: resData.name,
					items: cartItems,
					amount: totalAmount,
					date,
				},
			});
		} catch (error) {
			throw error;
		}
	};
};
