import { StyleSheet, SafeAreaView, Text, View, TextInput } from 'react-native'
import React from 'react'

export default function EmailInput() {
	
const [isEmail, setEmail] = React.useState("")

  return (
	<SafeAreaView>
	 <TextInput
	 onChangeText={setEmail}
	 placeholder='Enter Email'
	 /> 
	</SafeAreaView>
  )
}

const styles = StyleSheet.create({})