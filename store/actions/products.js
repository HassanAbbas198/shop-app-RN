import * as actionTypes from './actionTypes';

export const deleteProduct = (productId) => {
	return {
		type: actionTypes.DELETE_PRODUCT,
		productId,
	};
};

export const createProduct = (title, description, imageUrl, price) => {
	return {
		type: actionTypes.CREATE_PRODUCT,
		productData: {
			title,
			description,
			imageUrl,
			price,
		},
	};
};

export const updateProduct = (id, title, description, imageUrl) => {
	return {
		type: actionTypes.UPDATE_PRODUCT,
		productId: id,
		productData: {
			title,
			description,
			imageUrl,
		},
	};
};
