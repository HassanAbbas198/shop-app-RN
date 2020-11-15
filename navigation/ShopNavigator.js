import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductOverviewScreen,
	},
	// default nav options for every screen
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
			},
			headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
		},
	}
);

export default createAppContainer(ProductsNavigator);