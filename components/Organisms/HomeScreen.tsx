import { StyleSheet,  View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Header from '../Atoms/Header';
import { useIsFocused } from '@react-navigation/native';
import { Button, useTheme, Text, TextInput } from 'react-native-paper';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import Reservations from '../Molecules/Reservations';
import { G } from 'react-native-svg';


export default function HomeScreen({ navigation }) {
  const theme = useTheme();


  //@ts-ignore
  const { isUserData } = useContext(AuthContext);

  console.log("User Data:", isUserData)
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1, }}>
    <View style={{flexDirection: 'row', padding: 20}}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', paddingRight: 10 }}>
          Hello
        </Text>
        <Text style={{ alignSelf: 'flex-end', fontSize: 24 }}>
          {isUserData?.isUserData?.first_name}
        </Text>
        </View>
      <Reservations navigation={navigation} />
    </View>
  );
}
