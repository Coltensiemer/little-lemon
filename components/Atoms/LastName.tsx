import { StyleSheet, SafeAreaView, Text, View, TextInput } from 'react-native'
import React from 'react'

export default function LastName({style}) {

	const [isName, setName] = React.useState("")


  return (
	<SafeAreaView
	style={[styles.container, style]}>
	  <TextInput 
	    // @ts-ignore
	  onTextInput={setName}
	  placeholder='Last Name'
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