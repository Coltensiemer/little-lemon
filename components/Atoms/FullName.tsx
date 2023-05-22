import { StyleSheet, SafeAreaView, Text, View, TextInput, ViewStyle, TextStyle } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function FullName({style, placeholder}) {

	const [isName, setName] = React.useState("")

	const storeData = async (value: string) => {
		try {
		  await AsyncStorage.setItem('@storage_Key', value)
		  console.log("successfuly")
		  console.log(isName)
		} catch (e) {
		  console.log(e)
		}
	  }

	  useEffect(() => { 
		storeData(isName)
	  })

  return (
	<SafeAreaView
	style={[styles.container, style]}>
	  <TextInput 
	  //@ts-ignore
	  onChangeText={setName}
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