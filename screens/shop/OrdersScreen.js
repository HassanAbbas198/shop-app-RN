import React, { useCallback, useEffect, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	ActivityIndicator,
	View,
	Text,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';

import * as actions from '../../store/actions/index';
import Colors from '../../constants/Colors';

import HeaderButton from '../../components/UI/HeaderButton';

const OrdersScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const orders = useSelector((state) => state.orders.orders);

	const loadOrders = useCallback(async () => {
		setIsLoading(true);
		await dispatch(actions.fetchOrders());
		setIsLoading(false);
	}, []);

	useEffect(() => {
		loadOrders();
	}, [loadOrders]);

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (orders.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No orders found!</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={orders}
			renderItem={(itemData) => (
				<OrderItem
					amount={itemData.item.totalAmount}
					date={itemData.item.readableDate}
					items={itemData.item.items}
				/>
			)}
		/>
	);
};

export const screenOptions = (navData) => {
	return {
		headerTitle: 'My Orders',
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

export default OrdersScreen;
