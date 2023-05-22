import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'

export default function Saveinput({style, styleText, label, onClick}) {
  return (
	<View style={styles.container}>
	    <Pressable
        style={[styles.buttons, style]}

        onPress={onClick}
      >
        <Text style={[styles.text, styleText]}>{label}</Text>
      </Pressable>
	</View>
  )
}

const styles = StyleSheet.create({
	container: { 
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'yellow', 
		

	},
	buttons: { 
		borderRadius: 20,
		height: 50,
		width: 300,
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 64,

	},
	text: { 

	}
})