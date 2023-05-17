import { StyleSheet, SafeAreaView, Text, View, TextInput, ViewStyle, TextStyle } from 'react-native'
import React from 'react'

export default function FirstName({style}) {

	const [isName, setName] = React.useState("")


  return (
	<SafeAreaView
	style={[styles.container, style]}>
	  <TextInput 
	  //@ts-ignore
	  onChangeText={setName}
	  placeholder='First Name'
	  style={styles.inputtext}
	  />
	</SafeAreaView>
  )
}

type styles ={ 
	container: ViewStyle,
	inputtext: ViewStyle | TextStyle
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