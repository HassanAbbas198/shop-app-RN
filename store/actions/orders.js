import * as actionTypes from './actionTypes';

export const addOrder = (cartItems, totalAmount) => {
	return async (dispatch) => {
		try {
			const date = new Date();
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/orders/u1.json`,
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
