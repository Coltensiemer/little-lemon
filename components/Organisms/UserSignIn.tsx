import { View, Text } from 'react-native';
import React, {useContext} from 'react';
import { TextInput, Button, Divider, Chip } from 'react-native-paper';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { err } from 'react-native-svg/lib/typescript/xml';
import { G } from 'react-native-svg';
import { AuthContext } from '../../context/AuthContext';

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

//@ts-ignore
const {login} = useContext(AuthContext)

const handleSignIn = async (data: signInInfo) => { 

	try {
		const options = { 
			method: 'GET'
		}
		const response = await fetch('http://localhost:3100/users')

		
	} catch (error) {
		console.log('error handle Signin', error)
		
	}


}



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
      <Button mode='contained' onPress={handleSubmit(login)}>
        Sign In
      </Button>
    </View>
  );
}
