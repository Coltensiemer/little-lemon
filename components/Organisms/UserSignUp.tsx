import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useForm, Controller, useFormState } from 'react-hook-form';

interface userData {
  firstName: string
  lastName: string
  Email: string
  Password1: string 
}

export default function UserSignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();



  const password1 = watch('Password1');


  const handleSignIn = async (data: userData) => {
  console.log(data)
    try { 
      const formatData = { 
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.Email,
        password: data.Password1
      }

      const options = { 
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(formatData)
      }

      const response = await fetch( 
        'http://localhost:3100/users', options
      )

      const responseData = await response.json(); 
      console.log('POST request successful')
    }
    catch (error) {
     console.log('Error:', error)
    }
  };

  return (
    <View style={null}>
      <Title style={null}>User Sign Up</Title>
      {/* FIRST NAME INPUT */}
      <Controller
        name='firstName'
        defaultValue=''
        rules={{
          required: {
            value: true,
            message: 'First Name is required',
          },
        }}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label='First Name'
            error={!!errors.firstName}
            onChangeText={(text) => onChange(text)}
            style={null}
            mode='outlined'
          />
        )}
      />
      {/* Last Name INPUT */}
      <Controller
        name='lastName'
        defaultValue=''
        rules={{
          required: {
            value: true,
            message: 'Last name is required',
          },
        }}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label='Last Name'
            error={!!errors.lastName}
            onChangeText={(text) => onChange(text)}
            style={null}
            mode='outlined'
          />
        )}
      />
        <Controller
            control={control}
            name='Email'
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
        error={!!errors.Email}
        onChangeText={(text) => onChange(text)}
        style={null}
        mode='outlined'
      />
      )}
      />

{/* PASSWORD INPUT  */}
<View>
  <Text> Minimum eight characters, at least one letter and one number:</Text>
</View>
<Controller
            control={control}
            name='Password1'
            defaultValue=''
            rules={{
              required: {
                value: true,
                message: 'Password is required',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Password is invalid',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        label='Password'
        error={!!errors.Password1}
        onChangeText={(text) => onChange(text)}
        // secureTextEntry
        style={null}
        mode='outlined'
      />
      )}
      />
<Controller
            control={control}
            name='Password2'
            defaultValue=''
            rules={{
              required: {
                value: true,
                message: 'Password is required',
              },
             validate: (value) => value === password1
            }}
            render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        label='Confirm Password'
        error={!!errors.Password2}
        onChangeText={(text) => onChange(text)}
        secureTextEntry
        style={null}
        mode='outlined'
      />
      )}
      />
      
      <Button mode='contained' onPress={handleSubmit(handleSignIn)} style={null}>
        Sign Up
      </Button>
    </View>
  );
}
