import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions/index';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.products.availableProducts);
	const dispatch = useDispatch();

	return (
		<FlatList
			data={products}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onViewDetail={() => {
						props.navigation.navigate({
							routeName: 'ProductDetails',
							params: {
								productId: itemData.item.id,
								productTitle: itemData.item.title,
							},
						});
					}}
					onAddToCart={() => {
						dispatch(actions.addToCart(itemData.item));
					}}
				/>
			)}
		/>
	);
};

ProductsOverviewScreen.navigationOptions = {
	headerTitle: 'All Products',
};

export default ProductsOverviewScreen;
