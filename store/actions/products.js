import * as actionTypes from './actionTypes';

export const deleteProduct = (productId) => {
	return {
		type: actionTypes.DELETE_PRODUCT,
		productId,
	};
};
