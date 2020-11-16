import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';

const CartScreen = (props) => {
	const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

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
		return transformedCartItems;
	});

	return (
		<View style={styles.screen}>
			<View style={styles.summary}>
				<Text style={styles.summaryText}>
					Total:{' '}
					<Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
				</Text>
				<Button
					title="Order Now"
					onPress={() => {}}
					color={Colors.secondary}
					disabled={cartItems.length === 0}
				/>
			</View>

			<FlatList
				data={cartItems}
				keyExtractor={(item) => item.productId}
				renderItem={(itemData) => (
					<CartItem
						qty={itemData.item.qty}
						title={itemData.item.productTitle}
						amount={itemData.item.sum}
						onRemove={() => {}}
					/>
				)}
			/>
		</View>
	);
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
		shadowColor: 'black',
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
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
