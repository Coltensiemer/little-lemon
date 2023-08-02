import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, {useContext} from 'react';
import { TextInput, Button, Divider, Chip } from 'react-native-paper';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import Header from '../Atoms/Header';


interface signInInfo { 
	EmailSignin: string,
	PasswordSignin: string,
}

export default function UserSignIn({ navigation }) {

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
    <View style={{flex: 1}}>
	<Header /> 
	<View style={{flex: 1, justifyContent: 'flex-end', margin: 20}}>
	<Text style={{fontWeight:'bold', fontSize:30,  marginBottom: 10}}> Sign In</Text>
    {/* add link to SiGN NAV */}
	<View style={{flexDirection: 'row'}}>
     <Text >or</Text>
	 <TouchableOpacity   onPress={() => {
                  navigation.navigate('Sign Up');
                }}>
	 <Text style={{color: 'blue'}}>Sign Up </Text>
	 </TouchableOpacity>
	 </View>
	 </View>
      {/* Email SIGN IN */}
	  <View style={{flex: 2, margin: 20}}>
		<Button   onPress={() => {
                  navigation.navigate('HomeScreen');
                }}>Click</Button>
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
	 
      <Button style={{marginTop: 10}} mode='contained' onPress={handleSubmit(login)}>
        Sign In
      </Button>
	  </View>
    </View>
  );
}
