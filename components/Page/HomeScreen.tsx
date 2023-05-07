import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Molecules/Header'
import OnboardButton from '../Atoms/OnboardButton'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomeScreen({navigation}) {
  return (
	<View>
	  <Header /> 
	  <OnboardButton 
	  navigation={navigation}
	  /> 
	</View>
  )
}

const styles = StyleSheet.create({})