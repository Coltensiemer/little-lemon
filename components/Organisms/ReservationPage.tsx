import { StyleSheet, Text, View, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';
import { TextInput, Button } from 'react-native-paper';

const db = SQLite.openDatabase('mydatabase.db');

export default function ReservationPage() {
  // Fill out form
  //Adds First/last name to a database
  //adds email and data

  // 1. use Database - reservationsll
  //2. create tale - name, email, date
  // 3. submit reservations to into data base table
  const [isTextInput, setTextInput] = useState('');
  const [email, setEmail] = useState('');
  const [datePicker, setDatePicker] = useState('');
  const [timePicker, setTimePicker] = useState('');
  const [customer, setCustomer] = useState([]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const [text, setText] = useState('Empty');

  // submit reservation to database

  const postReservation = async () => {
    try {
      const body = {
        full_name: isTextInput,
        email: email,
        date: datePicker,
        time: timePicker
      };

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };

      fetch('http://localhost:3100/reservations', options)
        .then((response) => response.json())
        .then((response) => console.log(response));
    } catch (err) {
      console.log(err);
    }
    console.log('button was pressed');
  };

  // get ALL Reservations
  const getAllReservations = async () => {
    try {
      const response = await fetch('http://localhost:3100/reservations');
      const jsonData = await response.json();
      // console.log(jsonData);
      setCustomer(jsonData);
    } catch (err) {
      console.log(`There was an error: ${err}`);
    }
  };

  useEffect(() => {
    console.log(`Date is: ${datePicker}`);
    console.log(`Time is: ${timePicker}`);
  }, []);

  useEffect(() => {
    getAllReservations();
  }, [postReservation]);

  // Data and time Picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fdate =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate();

    let fTime =
      tempDate.getHours() +
      ':' +
      tempDate.getMinutes() +
      ':' +
      tempDate.getSeconds();
    // setText(fdate + '\n' + fTime);

    setTimePicker(fTime);
    setDatePicker(fdate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    // for iOS, add a button that closes the picker
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    console.log('showDate');
  };

  const showTimepicker = () => {
    showMode('time');
    console.log('showTime');
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        label='First and Last Name'
        value={isTextInput}
        onChangeText={(text) => setTextInput(text)}
      />
      <TextInput
        label='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

    <Button onPress={null} mode='outlined'>
        Show Date Picker
      </Button> 

      <Button onPress={showTimepicker} mode='outlined'>
        {' '}
        Show Time Picker
      </Button>
<View >
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode="date"
          is24Hour={true}
          display='default'
          onChange={onChange}
     
        />
      )}
         {show && (
        <DateTimePicker
          testID='dateTimePicker'
          mode={mode}
          value={date}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
</View>
      <Button mode='contained' onPress={postReservation}>
        Confirm Reservation'
      </Button>
      {customer.map((customer) => (
        <View style={{flexDirection: "row", justifyContent: "space-evenly"}} key={customer.reservation_id}>
          <Text>{customer.full_name}</Text>
          <View>
          <Text>{customer.date}</Text>
          <Text>{customer.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({

  mainContainer: { 
    flex: 1,
    justifyContent: "space-evenly",
    marginTop: 10
  }

});
