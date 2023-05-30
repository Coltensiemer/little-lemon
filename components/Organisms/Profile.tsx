import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Avatar, TextInput } from 'react-native-paper'
import FullName from '../Atoms/FullName'
import LastName from '../Atoms/LastName'

export default function Profile() {
  return (
	<View>
		<Avatar.Image source={null} />
	<Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
	Change Picture
  	</Button>
	  <TextInput
      label="First Name"
      value={null}
      onChangeText={null}
	  />
	   <TextInput
      label="Last Name"
      value={null}
      onChangeText={null}
	  />
	<Text> Notification</Text>
	



	
	</View>
  )
}

const styles = StyleSheet.create({})