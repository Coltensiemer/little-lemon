import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../Atoms/Header';
import EmailInput from '../Atoms/EmailInput';

export default function SignUpEmail() {
  return (
    <View>
      <Header />
      <EmailInput />
    </View>
  );
}

const styles = StyleSheet.create({});
