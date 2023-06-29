import * as React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screen 
import HomeScreen from '../HomeScreen';
import Profile from '../Profile';


//Screen Names
const HomeName = 'Home'
const SettingName = 'Settings'

const Tab = createBottomTabNavigator; 

export default function Maincontainer() { 
	return [
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={HomeScreen} /> 
				<Tab.Screen name="Settings" component={Profile} /> 
			

			</Tab.Navigator>
		</NavigationContainer>
	]
}