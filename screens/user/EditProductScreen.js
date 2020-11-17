import React, { useCallback, useEffect, useReducer } from 'react';
import {
	Alert,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions/index';

import HeaderButton from '../../components/UI/HeaderButton';

// this is not related to redux
const formReducer = (state, action) => {
	if (action.type === 'FORM_UPDATE') {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		};

		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		};

		let formIsValid = true;
		for (const key in updatedValidities) {
			formIsValid = formIsValid && updatedValidities[key];
		}

		return {
			...state,
			inputValues: updatedValues,
			inputValidities: updatedValidities,
			formIsValid,
		};
	}

	return state;
};

const EditProductScreen = (props) => {
	const prodId = props.navigation.getParam('productId');
	const userProducts = useSelector((state) => state.products.userProducts);
	const editedProduct = userProducts.find((prod) => prod.id === prodId);

	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editedProduct ? editedProduct.title : '',
			imageUrl: editedProduct ? editedProduct.imageUrl : '',
			description: editedProduct ? editedProduct.description : '',
			price: '',
		},
		inputValidities: {
			title: editedProduct ? true : false,
			imageUrl: editedProduct ? true : false,
			description: editedProduct ? true : false,
			price: editedProduct ? true : false,
		},
		formIsValid: editedProduct ? true : false,
	});

	const submitHandler = useCallback(() => {
		if (!formState.formIsValid) {
			Alert.alert('Wrong input!', 'Please check the errors in the form.', [
				{ text: 'Okay' },
			]);
			return;
		}
		if (editedProduct) {
			dispatch(
				actions.updateProduct(
					prodId,
					formState.inputValues.title,
					formState.inputValues.description,
					formState.inputValues.imageUrl
				)
			);
		} else {
			dispatch(
				actions.createProduct(
					formState.inputValues.title,
					formState.inputValues.description,
					formState.inputValues.imageUrl,
					+formState.inputValues.price
				)
			);
		}
		props.navigation.goBack();
	}, [dispatch, prodId, formState]);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	const textChangedHandler = (inputId, text) => {
		let isValid = false;
		if (text.trim().length > 0) {
			isValid = true;
		}
		dispatchFormState({
			type: 'FORM_UPDATE',
			value: text,
			isValid,
			input: inputId,
		});
	};

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={formState.inputValues.title}
						onChangeText={(text) => textChangedHandler('title', text)}
						keyboardType="default"
						returnKeyType="next"
					/>
				</View>

				<View style={styles.formControl}>
					<Text style={styles.label}>Image URL</Text>
					<TextInput
						style={styles.input}
						value={formState.inputValues.imageUrl}
						onChangeText={(text) => textChangedHandler('imageUrl', text)}
					/>
				</View>

				{!editedProduct && (
					<View style={styles.formControl}>
						<Text style={styles.label}>Price</Text>
						<TextInput
							style={styles.input}
							value={formState.inputValues.price}
							onChangeText={(text) => textChangedHandler('price', text)}
							keyboardType="decimal-pad"
						/>
					</View>
				)}

				<View style={styles.formControl}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={styles.input}
						value={formState.inputValues.description}
						onChangeText={(text) => textChangedHandler('description', text)}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

EditProductScreen.navigationOptions = (navData) => {
	const id = navData.navigation.getParam('productId');

	const submitFun = navData.navigation.getParam('submit');
	return {
		headerTitle: id ? 'Edit Product' : 'Add Product',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Save"
					iconName={
						Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
					}
					onPress={submitFun}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	formControl: { width: '100%' },
	label: {
		fontFamily: 'open-sans-bold',
		marginVertical: 8,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
});

export default EditProductScreen;
