import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Header from '../Atoms/Header';
import { fetchUserData } from '../../assets/Database.js/reservationData';
import { useIsFocused } from '@react-navigation/native';
import { Button, useTheme, TextInput } from 'react-native-paper';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';




interface signInInfo { 
	EmailSignin: string,
	PasswordSignin: string,
}


export default function HomeScreen({navigation}) {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [showData, setData] = useState([]);

  //@ts-ignore
  const {login, isToken} = useContext(AuthContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();



  useEffect(() => {
    if (isFocused) {
      fetchUserData((data) => {
        setData(data);
      });
    }
  }, [isFocused]);

  const reservationAmount = (data) => {
    const length = data.length;
    return length;
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1, }}>
      <Header />

    <Text>Hello, NAME</Text>

     
    </View>
  );
}
