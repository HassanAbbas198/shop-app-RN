import React, { useCallback, useEffect, useReducer } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions/index';

import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';

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

	const inputChangedHandler = useCallback(
		(inputId, inputValue, inputValidity) => {
			dispatchFormState({
				type: 'FORM_UPDATE',
				value: inputValue,
				isValid: inputValidity,
				input: inputId,
			});
		},
		[dispatchFormState]
	);

	return (
		<ScrollView>
			<View style={styles.form}>
				<Input
					id="title"
					label="Title"
					errorText="Please enter a valid title"
					keyboardType="default"
					returnKeyType="next"
					onInputChange={inputChangedHandler}
					initialValue={editedProduct ? editedProduct.title : ''}
					initiallyValid={!!editedProduct}
					required
				/>

				<Input
					id="imageUrl"
					label="Image Url"
					errorText="Please enter a valid image Url"
					keyboardType="default"
					returnKeyType="next"
					onInputChange={inputChangedHandler}
					initialValue={editedProduct ? editedProduct.imageUrl : ''}
					initiallyValid={!!editedProduct}
					required
				/>

				{!editedProduct && (
					<Input
						id="price"
						label="Price"
						errorText="Please enter a valid price"
						keyboardType="decimal-pad"
						returnKeyType="next"
						onInputChange={inputChangedHandler}
						required
						min={0.1}
					/>
				)}

				<Input
					id="description"
					label="Description"
					errorText="Please enter a valid description"
					keyboardType="default"
					multiline
					numberOfLines={3}
					onInputChange={inputChangedHandler}
					initialValue={editedProduct ? editedProduct.description : ''}
					initiallyValid={!!editedProduct}
					required
					minLength={5}
				/>
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
});

export default EditProductScreen;
