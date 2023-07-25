import { View, Text } from 'react-native';
import React from 'react';
import { TextInput, Button, Divider, Chip } from 'react-native-paper';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { err } from 'react-native-svg/lib/typescript/xml';
import { G } from 'react-native-svg';

interface signInInfo { 
	EmailSignin: string,
	PasswordSignin: string,
}

export default function UserSignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();

const signInForm = watch('EmailSignin')

const handleSignIn = (data: signInInfo) => { 
console.log('sign in works', data)

}

console.log(signInForm)

  return (
    <View>
      {/* Email SIGN IN */}
      <Controller
        control={control}
        name='EmailSignin'
        defaultValue=''
        rules={{
          required: {
            value: true,
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
      <Button mode='contained' onPress={handleSubmit(handleSignIn)}>
        Sign In
      </Button>
    </View>
  );
}
