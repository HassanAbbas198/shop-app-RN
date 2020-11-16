import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions/index';
import Colors from '../../constants/Colors';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.products.availableProducts);
	const dispatch = useDispatch();

	const selectItemHandler = (id, title) => {
		props.navigation.navigate({
			routeName: 'ProductDetails',
			params: {
				productId: id,
				productTitle: title,
			},
		});
	};

	return (
		<FlatList
			data={products}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={() => {
						selectItemHandler(itemData.item.id, itemData.item.title);
					}}
				>
					<Button
						title="View Details"
						color={Colors.primary}
						onPress={() => {
							selectItemHandler(itemData.item.id, itemData.item.title);
						}}
					/>
					<Button
						title="To Cart"
						color={Colors.primary}
						onPress={() => {
							dispatch(actions.addToCart(itemData.item));
						}}
					/>
				</ProductItem>
			)}
		/>
	);
};

ProductsOverviewScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'All Products',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="cart"
					iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					onPress={() => {
						navData.navigation.navigate({
							routeName: 'Cart',
						});
					}}
				/>
			</HeaderButtons>
		),
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

export default ProductsOverviewScreen;
