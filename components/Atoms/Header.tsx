import { StyleSheet, Text, View,Image, ViewStyle } from 'react-native'
import React from 'react'


export default function Header( ) {
  return (
	<View style={styles.container}>
	  <Image 
	  source={require("../../assets/littlelemonIcon/Logo.png")}
	  //@ts-ignore
	  style={[styles.logo]} /> 
	</View>
  )
}


type styles = {
	container: ViewStyle,
	logo: ViewStyle,
  };


const styles = StyleSheet.create({
	container: { 
		backgroundColor: null
	},
	logo: { 
		// margin:50,
	}

})