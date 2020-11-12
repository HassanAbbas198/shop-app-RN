import { PRODUCTS } from '../../data/dummy-data';

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case value:
			break;

		default:
			return {
				state,
			};
	}
};

export default reducer;
