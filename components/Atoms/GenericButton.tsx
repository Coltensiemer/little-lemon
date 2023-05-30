import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'


export default function GenericButton({placeholder}) {
	<Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    {placeholder}
  </Button>

}

const styles = StyleSheet.create({})