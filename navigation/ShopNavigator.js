import React from 'react';
import { Platform, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import {
	createDrawerNavigator,
	DrawerItemList,
} from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import * as actions from '../store/actions/index';

import ProductOverviewScreen, {
	screenOptions as productOverviewScreenOptions,
} from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen, {
	screenOptions as productDetailsScreenOptions,
} from '../screens/shop/ProductDetailsScreen';
import CartScreen, {
	screenOptions as cartScreenOptions,
} from '../screens/shop/CartScreen';
import OrdersScreen, {
	screenOptions as ordersScreenOptions,
} from '../screens/shop/OrdersScreen';
import UserProductsScreen, {
	screenOptions as userProductsScreenOptions,
} from '../screens/user/UserProductsScreen';
import EditProductScreen, {
	screenOptions as editProductsScreenOptions,
} from '../screens/user/EditProductScreen';
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

const ProductsStackNavigator = createStackNavigator();
export const ProductsNavigator = () => {
	return (
		<ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<ProductsStackNavigator.Screen
				name="ProductsOverview"
				component={ProductOverviewScreen}
				options={productOverviewScreenOptions}
			/>
			<ProductsStackNavigator.Screen
				name="ProductDetails"
				component={ProductDetailsScreen}
				options={productDetailsScreenOptions}
			/>
			<ProductsStackNavigator.Screen
				name="Cart"
				component={CartScreen}
				options={cartScreenOptions}
			/>
		</ProductsStackNavigator.Navigator>
	);
};

const OrdersStackNavigator = createStackNavigator();
export const OrdersNavigator = () => {
	return (
		<OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<OrdersStackNavigator.Screen
				name="Orders"
				component={OrdersScreen}
				options={ordersScreenOptions}
			/>
		</OrdersStackNavigator.Navigator>
	);
};

const AdminStackNavigator = createStackNavigator();
export const AdminNavigator = () => {
	return (
		<AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<AdminStackNavigator.Screen
				name="UserProducts"
				component={UserProductsScreen}
				options={userProductsScreenOptions}
			/>

			<AdminStackNavigator.Screen
				name="EditProduct"
				component={EditProductScreen}
				options={editProductsScreenOptions}
			/>
		</AdminStackNavigator.Navigator>
	);
};

const ShopDrawerNavigator = createDrawerNavigator();
export const ShopNavigator = () => {
	const dispatch = useDispatch();
	return (
		<ShopDrawerNavigator.Navigator
			drawerContent={(props) => {
				return (
					<View style={{ flex: 1 }}>
						<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
							<DrawerItemList {...props} />
							<Button
								title="Logout"
								color={Colors.primary}
								onPress={() => {
									dispatch(actions.logout());
								}}
							/>
						</SafeAreaView>
					</View>
				);
			}}
			drawerContentOptions={{
				activeTintColor: Colors.primary,
			}}
		>
			<ShopDrawerNavigator.Screen
				name="Products"
				component={ProductsNavigator}
				options={{
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
							size={22}
							color={props.color}
						/>
					),
				}}
			/>

			<ShopDrawerNavigator.Screen
				name="Orders"
				component={OrdersNavigator}
				options={{
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
							size={22}
							color={props.color}
						/>
					),
				}}
			/>

			<ShopDrawerNavigator.Screen
				name="Admin"
				component={AdminNavigator}
				options={{
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
							size={22}
							color={props.color}
						/>
					),
				}}
			/>
		</ShopDrawerNavigator.Navigator>
	);
};

// // merging the 2 stack navigators into one drawer Navigation
// const ShopNavigator = createDrawerNavigator(
// 	{
// 		Products: ProductsNavigator,
// 		Orders: OrdersNavigator,
// 		Admin: AdminNavigator,
// 	},
// 	{
// 		contentOptions: {
// 			activeTintColor: Colors.primary,
// 		},
// 	contentComponent: (props) => {
// 		const dispatch = useDispatch();
// 		return (
// 			<View style={{ flex: 1 }}>
// 				<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
// 					<DrawerNavigatorItems {...props} />
// 					<Button
// 						title="Logout"
// 						color={Colors.primary}
// 						onPress={() => {
// 							dispatch(actions.logout());
// 						}}
// 					/>
// 				</SafeAreaView>
// 			</View>
// 		);
// 	},
// }
// );

// const AuthNavigator = createStackNavigator(
// 	{
// 		Auth: AuthScreen,
// 	},
// 	{
// 		defaultNavigationOptions: defaultNavOptions,
// 	}
// );

// // startup screen is the first thing that gets loaded
// const MainNavigator = createSwitchNavigator({
// 	Startup: StartupScreen,
// 	Auth: AuthNavigator,
// 	Shop: ShopNavigator,
// });

// export default createAppContainer(MainNavigator);
