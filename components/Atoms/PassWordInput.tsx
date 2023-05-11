import { StyleSheet, SafeAreaView, Text, View, TextInput } from 'react-native'
import React from 'react'

export default function PassWordInput() {
	
const [isEmail, setEmail] = React.useState("")

  return (
	<SafeAreaView
	style={styles.container}>
	 <TextInput
	 onChangeText={setEmail}
	 placeholder='Enter Password'
	 style={styles.inputtext}
	 /> 
	</SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container: { 
		flex:0, 
		alignItems: "center"
	},
	inputtext:  { 
		width:200, 
		height: 50,
		marginBottom: 40, 
		backgroundColor: "lightgray",
	}
})