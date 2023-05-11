import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Atoms/Header'
import OnboardButton from '../Atoms/OnboardButton'
import FirstName from '../Atoms/FirstName';
import EmailInput from '../Atoms/EmailInput';

export default function HomeScreen({ ScreenName}) {
  return (
	<View>
	  <Header /> 
	  <FirstName 
	  style ={{ 
		marginTop: 100, 
	  }}
	
	  
	/> 
		<EmailInput 
	/> 
	  <OnboardButton 
	  label={"Sign Up"}
	  ScreenName={"FirstName"}
  //@ts-ignore
	  style = {{
		backgroundColor: "yellow",}} 
	  /> 
	</View>
  )
}

