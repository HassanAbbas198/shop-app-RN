import React, { useCallback, useReducer } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/Colors';
import * as actions from '../../store/actions/index';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';

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

const AuthScreen = (props) => {
	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false,
	});

	const signupHandler = () => {
		dispatch(
			actions.signup(
				formState.inputValues.email,
				formState.inputValues.password
			)
		);
	};

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
		<View style={styles.screen}>
			<LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
				<Card styles={styles.authContainer}>
					<ScrollView>
						<Input
							id="email"
							label="E-Mail"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							errorText="Please enter a valid email address"
							onInputChange={inputChangedHandler}
							initialValue=""
						/>

						<Input
							id="password"
							label="Password"
							keyboardType="default"
							required
							minLength={5}
							secureTextEntry
							autoCapitalize="none"
							errorText="Please enter a valid Password"
							onInputChange={inputChangedHandler}
							initialValue=""
						/>
						<View style={styles.buttonContainer}>
							<Button
								title="Login"
								color={Colors.primary}
								onPress={signupHandler}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<Button
								title="Switch to Sign Up"
								color={Colors.secondary}
								onPress={() => {}}
							/>
						</View>
					</ScrollView>
				</Card>
			</LinearGradient>
		</View>
	);
};

AuthScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Login',
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},

	gradient: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20,
	},

	buttonContainer: {
		marginTop: 10,
	},
});

export default AuthScreen;
