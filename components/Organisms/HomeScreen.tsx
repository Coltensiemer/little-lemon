import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Atoms/Header';
import OnboardButton from '../Atoms/OnboardButton';
import ReservationPage from './ReservationPage';
import { fetchUserData } from '../../assets/Database.js/reservationData';
import { useIsFocused } from '@react-navigation/native';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [showData, setData] = useState([]);

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
      <View style={{flex:2, justifyContent: 'center'}}>
      <Button
        mode={'contained'}
        compact={true}
        //@ts-ignore
        onPress={() => navigation.navigate('ReservationPage')}
        style={{width: 250, alignSelf: 'center'}}
        
        
      >
        Make A reservation Reservations
      </Button>

      <Text
        style={{
          alignSelf: 'center',
          marginTop: 50,
        }}
      >
        Just Browsing?
      </Text>
      <Button
        mode={'contained-tonal'}
        compact={true}
        style={{width: 250, alignSelf: 'center'}}
        //@ts-ignore
        onPress={() => navigation.navigate('Menulist')}
      >
        View Menu
      </Button>
      </View>

      {/* <OnboardButton
        styleText={null}
        label={'Check Reservations'}
        style={null}
        styleContainer={null}
        ScreenName={'WaitList'}
      /> */}
<View style={{flex:1}}>
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
    </View>
  );
}
