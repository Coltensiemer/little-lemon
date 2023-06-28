import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Atoms/Header';
import OnboardButton from '../Atoms/OnboardButton';
import ReservationPage from './ReservationPage';
import { fetchUserData } from '../../assets/Database.js/reservationData';
import { useIsFocused } from '@react-navigation/native';
import { Button,useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const theme = useTheme()

const isFocused = useIsFocused()

const [showData, setData] = useState([])


useEffect(() => { 
  if (isFocused) {
  fetchUserData((data)=> { 
    setData(data)
  })
} 
}, [isFocused])



const reservationAmount =(data) => { 
  const length = data.length
  return length
}


  return (
    <View style={{backgroundColor: theme.colors.background}}>
      <Header />

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
        ScreenName={'Menulist'}
      />
      <OnboardButton
        styleText={null}
        label={'Check Reservations'}
        style={null}
        styleContainer={null}
        ScreenName={'WaitList'}
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
      <OnboardButton
        styleText={null}
        label={'Profile'}
        style={{
          backgroundColor: 'none',
        }}
        styleContainer={null}
        ScreenName={'Profile'}

      />
      

      <Text>Current Reservations: {reservationAmount(showData)} </Text>
    
    </View>
  );
}
