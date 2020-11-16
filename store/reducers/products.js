import * as actionTypes from '../actions/actionTypes';
import { PRODUCTS } from '../../data/dummy-data';

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.DELETE_PRODUCT:
			return {
				...state,
				userProducts: state.userProducts.filter(
					(prod) => prod.id !== action.productId
				),

				availableProducts: state.availableProducts.filter(
					(prod) => prod.id !== action.productId
				),
			};

		default:
			return state;
	}
};
