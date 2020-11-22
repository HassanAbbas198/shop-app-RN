import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as actions from '../store/actions/index';

const StartupScreen = (props) => {
	const dispatch = useDispatch();

	// we cant use async on useEffect
	useEffect(() => {
		const tryLogin = async () => {
			const userData = await AsyncStorage.getItem('userData');
			if (!userData) {
				// props.navigation.navigate('Auth');
				dispatch(actions.setDidTryAl());
				return;
			}
			const transformedData = JSON.parse(userData);
			const { token, userId, expiryDate } = transformedData;

			const expirationDate = new Date(expiryDate);
			if (expirationDate <= new Date() || !token || !userId) {
				// props.navigation.navigate('Auth');
				dispatch(actions.setDidTryAl());
				return;
			}

			// calculating the expiration time
			const expirationTime = expirationDate.getTime() - new Date().getTime();

			dispatch(actions.authenticate(userId, token, expirationTime));
		};

		tryLogin();
	}, []);

	return (
		<View style={styles.screen}>
			<ActivityIndicator size="large" color={Colors.primary} />
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default StartupScreen;
