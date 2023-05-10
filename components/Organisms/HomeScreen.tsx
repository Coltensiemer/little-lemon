import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Atoms/Header'
import OnboardButton from '../Atoms/OnboardButton'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstName from '../Atoms/FirstName';
import EmailInput from '../Atoms/EmailInput';

export default function HomeScreen({navigation}) {
  return (
	<View>
	  <Header /> 
	  <FirstName 
	  style ={{ 
		marginTop: 50, 
	  }}
	
	  
	/> 
		<EmailInput 
	/> 
	  <OnboardButton 
	  navigation={navigation}
	  label={"Sign Up"}
  //@ts-ignore
	  style = {{
		backgroundColor: "yellow"}} 
	  /> 
	</View>
  )
}

