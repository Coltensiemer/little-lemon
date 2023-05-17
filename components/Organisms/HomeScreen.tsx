import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../Atoms/Header';
import OnboardButton from '../Atoms/OnboardButton';
import FirstName from '../Atoms/FirstName';
import EmailInput from '../Atoms/EmailInput';
import PassWordInput from '../Atoms/PassWordInput';

export default function HomeScreen({ navigate }) {
  return (
    <View>
      <Header />
      <EmailInput />
      <PassWordInput />
      <OnboardButton
        styleText={null}
        label={'Sign In'}
        ScreenName={null} // Going to Menu once setup
        //@ts-ignore
        styleContainer={null}
        style={{
          backgroundColor: 'yellow',
        }}
      />
      <OnboardButton
        styleText={null}
        label={'Sign Up'}
        style={{
          backgroundColor: 'white',
        }}
        styleContainer={null}
        ScreenName={'FirstName'}
      />

      <Text
        style={{
          alignSelf: 'center',
          marginTop: 50,
        }}
      >
        Just Browsing?
      </Text>
      <OnboardButton
        styleText={{
          color: 'yellow',
        
        }}
        label={'See the Menu'}
        style={{
          backgroundColor: 'black',
          color: 'yellow',
        }}
        styleContainer={{
          marginTop: 10,
        }}
        ScreenName={"Menulist"}
      />
    </View>
  );
}
