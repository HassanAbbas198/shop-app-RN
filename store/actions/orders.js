import * as actionTypes from './actionTypes';

export const addOrder = (cartItems, totalAmount) => {
	return {
		type: actionTypes.ADD_ORDER,
		orderData: {
			items: cartItems,
			amount: totalAmount,
		},
	};
};
