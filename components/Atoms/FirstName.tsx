import { StyleSheet, SafeAreaView, Text, View, TextInput } from 'react-native'
import React from 'react'

export default function FirstName() {

	const [isName, setName] = React.useState("")
  return (
	<SafeAreaView>
	  <TextInput 
	    // @ts-ignore
	  onTextInput={setName}
	  placeholder='First Name'
	  />
	</SafeAreaView>
  )
}

const styles = StyleSheet.create({})