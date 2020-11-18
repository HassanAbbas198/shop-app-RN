import Product from '../../models/Product';
import * as actionTypes from './actionTypes';

export const fetchProducts = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/products.json`
			);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			const resData = await response.json();
			const loadedProducts = [];

			for (const key in resData) {
				loadedProducts.push(
					new Product(
						key,
						'u1',
						resData[key].title,
						resData[key].imageUrl,
						resData[key].description,
						resData[key].price
					)
				);
			}

			dispatch({ type: actionTypes.SET_PRODUCTS, products: loadedProducts });
		} catch (error) {
			throw error;
		}
	};
};

export const createProduct = (title, description, imageUrl, price) => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://shop-app-15651.firebaseio.com/products.json`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						title,
						description,
						imageUrl,
						price,
					}),
				}
			);
			const resData = await response.json();

			dispatch({
				type: actionTypes.CREATE_PRODUCT,
				productData: {
					id: resData.name,
					title,
					description,
					imageUrl,
					price,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const updateProduct = (id, title, description, imageUrl) => {
	return async (dispatch) => {
		try {
			await fetch(`https://shop-app-15651.firebaseio.com/products/${id}.json`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					description,
					imageUrl,
				}),
			});

			dispatch({
				type: actionTypes.UPDATE_PRODUCT,
				productId: id,
				productData: {
					title,
					description,
					imageUrl,
				},
			});
		} catch (error) {}
	};
};

export const deleteProduct = (productId) => {
	return async (dispatch) => {
		await fetch(
			`https://shop-app-15651.firebaseio.com/products/${productId}.json`,
			{
				method: 'DELETE',
			}
		);

		dispatch({
			type: actionTypes.DELETE_PRODUCT,
			productId,
		});
	};
};
