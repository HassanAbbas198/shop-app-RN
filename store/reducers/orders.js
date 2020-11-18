import * as actionTypes from '../actions/actionTypes';
import Order from '../../models/Order';

const initialState = {
	orders: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_ORDER:
			const newOrder = new Order(
				action.orderData.id,
				action.orderData.items,
				action.orderData.amount,
				action.orderData.date
			);

			return {
				...state,
				orders: state.orders.concat(newOrder),
			};

		default:
			return state;
	}
};
