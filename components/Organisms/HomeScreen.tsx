import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../Atoms/Header';
import OnboardButton from '../Atoms/OnboardButton';
import FullName from '../Atoms/FullName';
import EmailInput from '../Atoms/EmailInput';
import PassWordInput from '../Atoms/PassWordInput';
import ReservationPage from './ReservationPage';

export default function HomeScreen({ navigate }) {
  return (
    <View>
      <Header />
  

      {/* <EmailInput /> */}
      {/* <PassWordInput /> */}


      <OnboardButton
        styleText={null}
        label={'Make a Reservation'}
        ScreenName={ReservationPage} // Going to Menu once setup
        //@ts-ignore
        styleContainer={null}
        style={{
          backgroundColor: 'yellow',
        }}
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
      <OnboardButton 
      styleText={null}
      label={"Check Reservations"}
      style={null}
      styleContainer={null}
      ScreenName={"WaitList"}
      /> 

<OnboardButton
        styleText={null}
        label={'Sign Up'}
        style={{
          backgroundColor: 'none',
        }}
        styleContainer={null}
        ScreenName={'FirstName'}
      />
    </View>
  );
}
