import React from 'react';
import { Platform, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
	createAppContainer,
	createSwitchNavigator,
	SafeAreaView,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
	createDrawerNavigator,
	DrawerNavigatorItems,
} from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import * as actions from '../store/actions/index';

import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductOverviewScreen,
		ProductDetails: ProductDetailsScreen,
		Cart: CartScreen,
	},
	// default nav options for every screen
	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					size={22}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultNavOptions,
	}
);

const OrdersNavigator = createStackNavigator(
	{
		Orders: OrdersScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
					size={22}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultNavOptions,
	}
);

const AdminNavigator = createStackNavigator(
	{
		UserProducts: UserProductsScreen,
		EditProduct: EditProductScreen,
	},

	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
					size={22}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultNavOptions,
	}
);

// merging the 2 stack navigators into one drawer Navigation
const ShopNavigator = createDrawerNavigator(
	{
		Products: ProductsNavigator,
		Orders: OrdersNavigator,
		Admin: AdminNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
		},
		contentComponent: (props) => {
			const dispatch = useDispatch();
			return (
				<View style={{ flex: 1 }}>
					<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
						<DrawerNavigatorItems {...props} />
						<Button
							title="Logout"
							color={Colors.primary}
							onPress={() => {
								dispatch(actions.logout());
								props.navigation.navigate('Auth');
							}}
						/>
					</SafeAreaView>
				</View>
			);
		},
	}
);

const AuthNavigator = createStackNavigator(
	{
		Auth: AuthScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

// startup screen is the first thing that gets loaded
const MainNavigator = createSwitchNavigator({
	Startup: StartupScreen,
	Auth: AuthNavigator,
	Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
