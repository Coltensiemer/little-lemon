import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Molecules/Header'
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
	  //@ts-ignore
	/> 
		<EmailInput 
	/> 
	  <OnboardButton 
	  navigation={navigation}
	  /> 
	</View>
  )
}

const styles = StyleSheet.create({
	FirstName: { 
		width: 500, 
	},
	EmailInput: { 
		width: 500, 
	}
})