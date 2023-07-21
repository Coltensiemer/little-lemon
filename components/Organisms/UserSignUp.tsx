import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';

export default function UserSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle the sign-in logic here
    console.log('Signing in with:', email, password);
  };

  return (
    <View style={null}>
      <Title style={null}>User Sign In</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={null}
        mode="outlined"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={null}
        mode="outlined"
      />

      <Button mode="contained" onPress={handleSignIn} style={null}>
        Sign In
      </Button>
    </View>
  );
};


