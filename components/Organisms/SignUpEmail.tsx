import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../Atoms/Header';
import EmailInput from '../Atoms/EmailInput';
import OnboardButton from '../Atoms/OnboardButton';
import PassWordInput from '../Atoms/PassWordInput';

export default function SignUpEmail() {
  return (
    <View>
      <Header />
      <EmailInput />
	  <PassWordInput /> 
	  <OnboardButton 
	  styleContainer={null}
	  style={{
		backgroundColor: "yellow",
	  }} 
		label={"Click to Finish"}
		
	  /> 
    </View>
  );
}

const styles = StyleSheet.create({});
