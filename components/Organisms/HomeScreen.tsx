import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Header from '../Atoms/Header';
import { useIsFocused } from '@react-navigation/native';
import { Button, useTheme, TextInput } from 'react-native-paper';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import Reservations from '../Molecules/Reservations';

import { G } from 'react-native-svg';


interface signInInfo {
  EmailSignin: string;
  PasswordSignin: string;
}

interface isUserData {
  AccessToken: string;
  Auth: boolean;
  Message: string;
  refreshToken: string;
  user: {
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    password: string;
  };
}

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [showData, setData] = useState([]);

  //@ts-ignore
  const { login, isToken, isUserData } = useContext(AuthContext);

  // console.log('data', isUserData)

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Header />
<View style={{flexDirection: 'row', justifyContent: 'left', margin: 10}}>
      <Text style={{fontSize: 32, fontWeight: 'bold', paddingRight: 10}}>Hello</Text>
        <Text style={{alignSelf: 'flex-end', fontSize: 24}}>{isUserData?.user?.first_name}</Text>
        </View>
      <Reservations />

    </View>
  );
}
