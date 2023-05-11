import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Atoms/Header'
import FirstName from '../Atoms/FirstName'
import OnboardButton from '../Atoms/OnboardButton'

export default function SignUpFirstName({style, navigation}) {
  return (
	<View>
		<Header /> 
		<FirstName 
		style={null} /> 
		<OnboardButton 
		label={"Click to Continue"} 
		style={{backgroundColor: "yellow"}} 
		// How to connect to Email sign up??? 
		ScreenName={"Email"}
		/> 
	</View>
  )
}

const styles = StyleSheet.create({})