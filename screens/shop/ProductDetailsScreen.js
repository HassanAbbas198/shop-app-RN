import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as actions from '../../store/actions/index';

const ProductDetailsScreen = (props) => {
	const id = props.navigation.getParam('productId');

	const products = useSelector((state) => state.products.availableProducts);
	const selectedProd = products.find((prod) => prod.id === id);

	const dispatch = useDispatch();

	return (
		<ScrollView>
			<Image source={{ uri: selectedProd.imageUrl }} style={styles.image} />
			<View style={styles.actions}>
				<Button
					title="Add to Cart"
					onPress={() => {
						dispatch(actions.addToCart(selectedProd));
					}}
					color={Colors.primary}
				/>
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
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		color: '#888',
		textAlign: 'center',
		marginVertical: 20,
	},

	description: {
		fontFamily: 'open-sans',
		fontSize: 14,
		textAlign: 'center',
		marginHorizontal: 20,
	},
});

export default ProductDetailsScreen;
