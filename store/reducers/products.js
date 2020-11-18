import Product from '../../models/Product';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
	availableProducts: [],
	userProducts: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_PRODUCTS:
			return {
				...state,
				availableProducts: action.products,
				userProducts: action.userProducts,
			};

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

		case actionTypes.CREATE_PRODUCT:
			const newProduct = new Product(
				action.productData.id,
				action.productData.ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				action.productData.price
			);
			return {
				...state,
				availableProducts: state.availableProducts.concat(newProduct),
				userProducts: state.userProducts.concat(newProduct),
			};

		case actionTypes.UPDATE_PRODUCT:
			const productIndex = state.userProducts.findIndex(
				(prod) => prod.id === action.productId
			);
			const updatedProduct = new Product(
				action.productId,
				state.userProducts[productIndex].ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				state.userProducts[productIndex].price
			);
			// replacing the product at the index with the updatedProduct
			const updatedUserProducts = [...state.userProducts];
			updatedUserProducts[productIndex] = updatedProduct;

			const availableProductIndex = state.availableProducts.findIndex(
				(prod) => prod.id === action.productId
			);
			const updatedAvailableProducts = [...state.availableProducts];
			updatedAvailableProducts[availableProductIndex] = updatedProduct;

			return {
				...state,
				availableProducts: updatedAvailableProducts,
				userProducts: updatedUserProducts,
			};

		default:
			return state;
	}
};
