import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Reservations() {
  //@ts-ignore
  const { isUserData } = useContext(AuthContext);

  const [reservationData, setReservationData] = useState();

  //Function to get if reservations where made

  const getReservations = async () => {
    const email = isUserData?.isUserData?.email;
    const url = `http://localhost:3100/getreservation?email=${encodeURIComponent(
      email
    )}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      console.log('Response:', response);
      console.log('Data:', data);
    } catch (error) {
      console.log('Error with getReservation:', error);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);


  //Function componenet for reservations

function ReservationDisplay() { 

	return ( 
		<Text>Testing dispaly</Text>
	)
} 

  return (
    <View>
      <Text>Colten</Text>
	  <ReservationDisplay /> 
    </View>
  );
}

