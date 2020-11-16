import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
	return (
		<View style={styles.cartItem}>
			<View style={styles.itemData}>
				<Text style={styles.qty}>{props.qty} </Text>
				<Text style={styles.mainText}>{props.title}</Text>
			</View>

			<View style={styles.itemData}>
				<Text style={styles.mainText}>{props.amount}</Text>
				<TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
					<Ionicons
						name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
						size={22}
						color="red"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItem: {
		padding: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 20,
	},

	itemData: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	qty: {
		fontFamily: 'open-sans',
		fontSize: 16,
		color: '#888',
	},

	mainText: {
		fontFamily: 'open-sans-bold',
		fontSize: 16,
	},

	deleteButton: {
		marginLeft: 20,
	},
});

export default CartItem;
