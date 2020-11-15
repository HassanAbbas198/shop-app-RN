import React from 'react';
import {
	Button,
	Image,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = (props) => {
	let TouchableComponent = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableComponent = TouchableNativeFeedback;
	}

	return (
		<View style={styles.product}>
			<View>
				<TouchableComponent onPress={props.onViewDetail} useForeground>
					<View>
						<View style={styles.imageContainer}>
							<Image source={{ uri: props.image }} style={styles.image} />
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.title}>{props.title}</Text>
							<Text style={styles.price}>${props.price.toFixed(2)}</Text>
						</View>
						<View style={styles.actions}>
							<Button
								title="View Details"
								color={Colors.primary}
								onPress={props.onViewDetail}
							/>
							<Button
								title="To Cart"
								color={Colors.primary}
								onPress={props.onAddToCart}
							/>
						</View>
					</View>
				</TouchableComponent>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	product: {
		shadowColor: 'black',
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
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
		height: '15%',
		padding: 10,
	},

	title: {
		fontSize: 18,
		marginVertical: 4,
	},

	price: {
		fontSize: 14,
		color: '#888',
	},

	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '25%',
		paddingHorizontal: 15,
	},
});

export default ProductItem;
