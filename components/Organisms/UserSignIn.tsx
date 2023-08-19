import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { TextInput, Button, Divider, Chip } from 'react-native-paper';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';

import Header from '../Atoms/Header';
import { err } from 'react-native-svg/lib/typescript/xml';

interface signInInfo {
  EmailSignin: string;
  PasswordSignin: string;
}

export default function UserSignIn({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();

  const signInForm = watch('EmailSignin');

  //@ts-ignore
  const { login, setUserData, isUserData, setSettingData } = useContext(AuthContext);

  const handleSignIn = async (data: signInInfo) => {
    const signInInfo = {
      EmailSignin: data.EmailSignin,
      PasswordSignin: data.PasswordSignin,
    };
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInInfo),
      };
      const response = await fetch('http://localhost:4100/login', options);

      const responseData = await response.json();

      if (responseData.Auth === true) {
        setUserData(responseData);
        console.log(responseData);
        login(responseData.AccessToken);
        console.log('Login in Successfull');
      } 
      else {
        console.log('User is not Auth');
      }
    }
    catch (error) {
      console.log('error handle Signin', error);
    }

  };

  // const handleSettings = async (data: any) => {
  //   const email = { email: data?.user?.email };

  //   const options = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   };

  //   try {
  //     const response = await fetch(
  //       `http://localhost:3100/get_user_settings?email=${encodeURIComponent(email)}`, options 
  //     );

  //     setSettingData(response);
  //     console.log(response);
  //   } catch (error) {
  //     console.log('Error fetching Handing Settings:', error);
  //   }
  // };

  // useEffect(() => { 
  //   handleSettings(isUserData)
  // },[handleSignIn])

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, justifyContent: 'flex-end', margin: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 10 }}>
          {' '}
          Sign In
        </Text>
        {/* add link to SiGN NAV */}
        <View style={{ flexDirection: 'row' }}>
          <Text>or</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Sign Up');
            }}
          >
            <Text style={{ color: 'blue' }}>Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Email SIGN IN */}
      <View style={{ flex: 2, margin: 20 }}>
        <Button
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
        >
          Click
        </Button>
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

        {/* <Text>{test}</Text> */}
        <Controller
          control={control}
          name='PasswordSignin'
          defaultValue=''
          rules={{
            required: {
              value: true,
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

        <Button
          style={{ marginTop: 10 }}
          mode='contained'
          onPress={handleSubmit(handleSignIn)}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
}
