import * as actionTypes from '../actions/actionTypes';
import CartItem from '../../models/Cart-item';

const initialState = {
	items: {},
	totalAmount: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_TO_CART:
			const addedProduct = action.product;
			const prodPrice = addedProduct.price;
			const prodTitle = addedProduct.title;

			let updatedOrNewCartItem;

			if (state.items[addedProduct.id]) {
				// already have the item in the cart
				updatedOrNewCartItem = new CartItem(
					state.items[addedProduct.id].qty + 1,
					prodPrice,
					prodTitle,
					state.items[addedProduct.id].sum + prodPrice
				);
			} else {
				updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
			}
			return {
				...state,
				items: {
					...state.items,
					[addedProduct.id]: updatedOrNewCartItem,
				},
				totalAmount: state.totalAmount + prodPrice,
			};

		case actionTypes.REMOVE_FROM_CART:
			const currentQty = state.items[action.productId].qty;

			let updatedCartItems;
			const selectedCartItem = state.items[action.productId];

			if (currentQty > 1) {
				// reduce it, not erase it
				const updatedCartItem = new CartItem(
					selectedCartItem.qty - 1,
					selectedCartItem.productPrice,
					selectedCartItem.productTitle,
					selectedCartItem.sum - selectedCartItem.productPrice
				);

				updatedCartItems = {
					...state.items,
					[action.productId]: updatedCartItem,
				};
			} else {
				updatedCartItems = { ...state.items };
				delete updatedCartItems[action.productId];
			}

			return {
				...state,
				items: updatedCartItems,
				totalAmount: state.totalAmount - selectedCartItem.productPrice,
			};

		// clearing the cart after presing order now
		case actionTypes.ADD_ORDER:
			return initialState;

		// remove prod from cart when deleted
		case actionTypes.DELETE_PRODUCT:
			if (!state.items[action.productId]) {
				return state;
			}

			const updatedItems = { ...state.items };
			const itemTotal = state.items[action.productId].sum;

			delete updatedItems[action.productId];
			return {
				...state,
				items: updatedItems,
				totalAmount: state.totalAmount - itemTotal,
			};

		default:
			return state;
	}
};
