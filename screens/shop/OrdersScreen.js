import React from 'react';
import { FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';

const OrdersScreen = (props) => {
	const orders = useSelector((state) => state.orders.orders);

	return (
		<FlatList
			data={orders}
			renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
		/>
	);
};

OrdersScreen.navigationOptions = (navData) => {
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

export default OrdersScreen;
