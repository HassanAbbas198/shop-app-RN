import * as actionTypes from '../actions/actionTypes';
import Order from '../../models/Order';

const initialState = {
	orders: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_ORDER:
			const newOrder = new Order(
				new Date().toString(),
				action.orderData.items,
				action.orderData.amount,
				new Date()
			);

			return {
				...state,
				orders: state.orders.concat(newOrder),
			};

		default:
			return state;
	}
};
