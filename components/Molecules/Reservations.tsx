import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button, Divider, Text } from 'react-native-paper';
import { dateComparison } from './dateComparison/dateComparison';




export default function Reservations({ navigation }) {
  //@ts-ignore
  const { isUserData } = useContext(AuthContext);

  const [reservationData, setReservationData] = useState([]);

  console.log(reservationData.map((e) => e.date))

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

      setReservationData(data);
      console.log('Get Reservations Successful');
    } catch (error) {
      console.log('Error with getReservation:', error);
    }
  };

  useEffect(() => {
    getReservations();
  }, [isUserData.isUserData]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    //@ts-ignore
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  // Function componenet for reservations
  function ReservationDisplay({ reservation }) {
    return (
      <View style={{ padding: 10 }}>
        <Text>You have a Reservation for {reservation.group_total}</Text>
        <Text>Date: {formatDate(reservation.date)}</Text>
        <Text>Time: {reservation.time}</Text>
      </View>
    );
  }

  return (
    <View>
      <Divider bold={true} />
      {reservationData.length > 0 ? (
       reservationData.map((reservation, index) => (
          <ReservationDisplay key={index} reservation={reservation} />
        ))
      )
      : (
        <View>
          <Text>You have no current reservations</Text>
          <Button
            onPress={() => {
              navigation.navigate('Reservation');
            }}
          >
            Make a Reservation
          </Button>
        </View>
      )}
      <Divider bold={true} />
    </View>
  );
}
