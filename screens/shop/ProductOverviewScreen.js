import React, { useEffect, useState, useCallback } from 'react';
import {
	FlatList,
	Platform,
	Button,
	ActivityIndicator,
	StyleSheet,
	View,
	Text,
	Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions/index';
import Colors from '../../constants/Colors';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [isRefreshing, setIsRefreshing] = useState(false);
	const dispatch = useDispatch();

	const products = useSelector((state) => state.products.availableProducts);

	const loadProducts = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(actions.fetchProducts());
		} catch (error) {
			// we have the error here cz we rethrew it in the action creator
			setError(error.message);
		}
		setIsRefreshing(false);
	}, [dispatch]);

	useEffect(() => {
		setIsLoading(true);
		loadProducts().then(() => {
			setIsLoading(false);
		});
	}, [loadProducts]);

	const { navigation } = props;
	useEffect(() => {
		const willFocusSub = navigation.addListener('willFocus', loadProducts);

		return () => {
			willFocusSub.remove();
		};
	}, [loadProducts]);

	const selectItemHandler = (id, title) => {
		props.navigation.navigate({
			routeName: 'ProductDetails',
			params: {
				productId: id,
				productTitle: title,
			},
		});
	};

	if (error) {
		Alert.alert('An error occured!', 'Something went wrong', [
			{
				text: 'Try again',
				onPress: () => {
					loadProducts();
				},
			},
		]);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (!isLoading && products.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No products found!</Text>
			</View>
		);
	}

	return (
		<FlatList
			onRefresh={loadProducts}
			refreshing={isRefreshing}
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

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ProductsOverviewScreen;
