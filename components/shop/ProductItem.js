import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native';
import Card from '../UI/Card';

const ProductItem = (props) => {
	let TouchableComponent = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableComponent = TouchableNativeFeedback;
	}

	return (
		<Card styles={styles.product}>
			<View>
				<TouchableComponent onPress={props.onSelect} useForeground>
					<View>
						<View style={styles.imageContainer}>
							<Image source={{ uri: props.image }} style={styles.image} />
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.title}>{props.title}</Text>
							<Text style={styles.price}>${props.price.toFixed(2)}</Text>
						</View>
						<View style={styles.actions}>{props.children}</View>
					</View>
				</TouchableComponent>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	product: {
		height: 300,
		margin: 20,
	},

	touchable: {
		overflow: 'hidden',
		borderRadius: 10,
	},

	imageContainer: {
		width: '100%',
		height: '60%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: 'hidden',
	},

	image: {
		width: '100%',
		height: '100%',
	},

	textContainer: {
		alignItems: 'center',
		height: '17%',
		padding: 10,
	},

	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		marginVertical: 2,
	},

	price: {
		fontFamily: 'open-sans',
		fontSize: 14,
		color: '#888',
	},

	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '23%',
		paddingHorizontal: 15,
	},
});

export default ProductItem;
