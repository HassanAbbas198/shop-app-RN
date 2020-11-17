import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as actions from '../../store/actions/index';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';

const UserProductsScreen = (props) => {
	const userProducts = useSelector((state) => state.products.userProducts);

	const dispatch = useDispatch();

	const editProductHandler = (id) => {
		props.navigation.navigate('EditProduct', { productId: id });
	};

	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={() => {
						editProductHandler(itemData.item.id);
					}}
				>
					<Button
						title="Edit"
						color={Colors.primary}
						onPress={() => {
							editProductHandler(itemData.item.id);
						}}
					/>
					<Button
						title="Delete"
						color={Colors.primary}
						onPress={() => {
							dispatch(actions.deleteProduct(itemData.item.id));
						}}
					/>
				</ProductItem>
			)}
		/>
	);
};

UserProductsScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'My Products',
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
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
					onPress={() => {
						navData.navigation.navigate('EditProduct');
					}}
				/>
			</HeaderButtons>
		),
	};
};

export default UserProductsScreen;
