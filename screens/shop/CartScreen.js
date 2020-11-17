import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions/index';
import Colors from '../../constants/Colors';

import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';

const CartScreen = (props) => {
	const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

	const dispatch = useDispatch();

	// tranforming the items to an array
	const cartItems = useSelector((state) => {
		const transformedCartItems = [];
		for (const key in state.cart.items) {
			transformedCartItems.push({
				productId: key,
				productTitle: state.cart.items[key].productTitle,
				productPrice: state.cart.items[key].productPrice,
				qty: state.cart.items[key].qty,
				sum: state.cart.items[key].sum,
			});
		}
		return transformedCartItems.sort((a, b) =>
			a.productId > b.productId ? 1 : -1
		);
	});

	return (
		<View style={styles.screen}>
			<Card styles={styles.summary}>
				<Text style={styles.summaryText}>
					Total:{' '}
					<Text style={styles.amount}>
						${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
					</Text>
				</Text>
				<Button
					title="Order Now"
					onPress={() => {
						dispatch(actions.addOrder(cartItems, cartTotalAmount));
					}}
					color={Colors.secondary}
					disabled={cartItems.length === 0}
				/>
			</Card>

			<FlatList
				data={cartItems}
				keyExtractor={(item) => item.productId}
				renderItem={(itemData) => (
					<CartItem
						qty={itemData.item.qty}
						title={itemData.item.productTitle}
						amount={itemData.item.sum}
						onRemove={() => {
							dispatch(actions.removeFromCart(itemData.item.productId));
						}}
						deletable
					/>
				)}
			/>
		</View>
	);
};

CartScreen.navigationOptions = {
	headerTitle: 'My Cart',
};

const styles = StyleSheet.create({
	screen: {
		margin: 20,
	},
	summary: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		padding: 10,
	},
	summaryText: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
	},
	amount: {
		color: Colors.primary,
	},
});

export default CartScreen;
