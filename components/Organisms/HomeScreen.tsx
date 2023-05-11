import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Atoms/Header'
import OnboardButton from '../Atoms/OnboardButton'
import FirstName from '../Atoms/FirstName';
import EmailInput from '../Atoms/EmailInput';
import PassWordInput from '../Atoms/PassWordInput';

export default function HomeScreen({ ScreenName}) {
  return (
	<View>
	  <Header /> 
	  <EmailInput  
	/> 
		<PassWordInput
	/> 
	  <OnboardButton 
	  label={"Sign In"}
	  ScreenName={null} // Going to Menu once setup 
  //@ts-ignore
  		styleContainer={null}
	  style = {{
		backgroundColor: "yellow",}} 
	  /> 
	  <OnboardButton 
	  label={"Sign Up"}
		style = {{ 
			backgroundColor: "white"
		}}
		styleContainer={null}
		ScreenName={"FirstName"}
	  /> 
	</View>
  )
}

