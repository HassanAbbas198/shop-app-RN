import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const AuthScreen = (props) => {
	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={50}
			style={styles.screen}
		>
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
							errorMessage="Email address is required!"
							onInputChange={() => {}}
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
							errorMessage="Password is required"
							onInputChange={() => {}}
							initialValue=""
						/>
						<View style={styles.buttonContainer}>
							<Button title="Login" color={Colors.primary} onPress={() => {}} />
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
		</KeyboardAvoidingView>
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
