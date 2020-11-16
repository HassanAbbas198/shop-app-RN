import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	Button,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';

const ProductDetailsScreen = (props) => {
	const id = props.navigation.getParam('productId');

	const products = useSelector((state) => state.products.availableProducts);
	const selectedProd = products.find((prod) => prod.id === id);

	return (
		<ScrollView>
			<Image source={{ uri: selectedProd.imageUrl }} style={styles.image} />
			<View style={styles.actions}>
				<Button title="Add to Cart" onPress={() => {}} color={Colors.primary} />
			</View>
			<Text style={styles.price}>${selectedProd.price}</Text>
			<Text style={styles.description}>{selectedProd.description}</Text>
		</ScrollView>
	);
};

ProductDetailsScreen.navigationOptions = (navData) => {
	const title = navData.navigation.getParam('productTitle');
	return {
		headerTitle: title,
	};
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 300,
	},

	actions: {
		marginVertical: 10,
		alignItems: 'center',
	},

	price: {
		fontSize: 20,
		color: '#888',
		textAlign: 'center',
		marginVertical: 20,
	},

	description: {
		fontSize: 14,
		textAlign: 'center',
		marginHorizontal: 20,
	},
});

export default ProductDetailsScreen;
