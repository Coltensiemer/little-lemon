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

  
  const {login} = useContext(AuthContext)

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
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Header />
     <Text style={{fontWeight:'bold', fontSize:30}}> Sign In</Text>
     <Text>or Join Little Lemon</Text>


     <View style={{flex: 1}}>
      {/* Email SIGN IN */}
      <Controller
        control={control}
        name='EmailSignin'
        defaultValue=''
        rules={{
          required: {
            value: false, // need to be true to work
            message: 'Email is required',
          },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Email is invalid',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label='Email'
            onChangeText={(text) => onChange(text)}
            error={!!errors.EmailSignin}
			mode='outlined'
          />
        )}
      />
	  
	 
	 
      <Controller
        control={control}
        name='PasswordSignin'
        defaultValue=''
        rules={{
          required: {
            value: false,
            message: 'Password is required',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label='Password'
            onChangeText={(text) => onChange(text)}
            error={!!errors.PasswordSignin}
			mode='outlined'
          />
        )}
      />
      <Button mode='contained' onPress={handleSubmit(login)}>
        Sign In
      </Button>
    </View>

     
    </View>
  );
}
