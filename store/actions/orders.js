import * as actionTypes from './actionTypes';
import Order from '../../models/Order';

export const fetchOrders = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		try {
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/orders/${userId}.json`
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
		const userId = getState().auth.userId;
		try {
			const date = new Date();
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/orders/${userId}.json?auth=${token}`,
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

			// sending push notifications
			for (const cartItem of cartItems) {
				const pushToken = cartItem.productPushToken;

				fetch(`https://exp.host/--/api/v2/push/send`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Accept-Encoding': 'gzip, deflate',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						to: pushToken,
						title: 'Order was placed!',
						body: cartItem.productTitle,
					}),
				});
			}
		} catch (error) {
			throw error;
		}
	};
};
