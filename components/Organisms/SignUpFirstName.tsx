import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Atoms/Header'
import FirstName from '../Atoms/FullName'
import OnboardButton from '../Atoms/OnboardButton'
import LastName from '../Atoms/LastName'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SignUpFirstName({style, navigation}) {



  return (
	<View>
		<Header /> 
		<FirstName 
		style={null}
		placeholder={null}
		onchange={null}
		/> 
		<LastName 
		style={null} 
		/> 
		<OnboardButton 
		label={"Click to Continue"} 
		styleContainer={null}
		style={{backgroundColor: "yellow"}} 
		styleText={null}
		// How to connect to Email sign up??? 
		ScreenName={"Email"}
		/> 
	</View>
  )
}

const styles = StyleSheet.create({})