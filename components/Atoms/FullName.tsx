import { StyleSheet, SafeAreaView, Text, View, TextInput, ViewStyle, TextStyle } from 'react-native'
import React, { useEffect } from 'react'


export default function FullName({style, placeholder, onchange, value}) {


  return (
	<SafeAreaView
	style={[styles.container, style]}>
	  <TextInput 
	  value={value}
	  onChangeText={onchange}
	  placeholder={placeholder}
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