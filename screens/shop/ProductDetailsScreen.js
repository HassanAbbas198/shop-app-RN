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

const ProductDetailsScreen = (props) => {
	const id = props.navigation.getParam('productId');

	const products = useSelector((state) => state.products.availableProducts);
	const selectedProd = products.find((prod) => prod.id === id);

	return (
		<View>
			<Text>{selectedProd.title}</Text>
		</View>
	);
};

ProductDetailsScreen.navigationOptions = (navData) => {
	const title = navData.navigation.getParam('productTitle');
	return {
		headerTitle: navData.navigation.getParam('productTitle'),
	};
};

const styles = StyleSheet.create({});

export default ProductDetailsScreen;
