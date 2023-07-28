import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Atoms/Header';
import { fetchUserData } from '../../assets/Database.js/reservationData';
import { useIsFocused } from '@react-navigation/native';
import { Button, useTheme } from 'react-native-paper';









export default function HomeScreen({navigation}) {
  const theme = useTheme();
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
     
     
    </View>
  );
}
