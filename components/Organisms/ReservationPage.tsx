import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { en, registerTranslation } from 'react-native-paper-dates';
registerTranslation('en', en);
import * as SQLite from 'expo-sqlite';
import { TextInput, Button, Divider, useTheme } from 'react-native-paper';
import Header from '../Atoms/Header';
import {useForm, Controller } from 'react-hook-form'

const db = SQLite.openDatabase('mydatabase.db');





export default function ReservationPage() {

  const theme = useTheme()

  // input data that is store in state
  const [isTextInput, setTextInput] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isPartyNumber, setPartyNumber] = useState<any>()

 // Date and time date that is stored in state 
  const [time, setTime] = useState<any>(undefined);
  const [date, setDate] = useState<any>(undefined);

  // conditional rendering booleans 
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  // State to retreve and store customers reservations made 
  const [customer, setCustomer] = useState<any>()
  

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  // Confirm single DATE PICKER
  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      console.log(params.date)
    },
    [setOpen, setDate]
  );

  // Confirm TIME
  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setTime(`${hours}:${minutes}:00`);
      console.log({ hours, minutes });
    },
    [setVisible]
  );

  // submit reservation to database
  const postReservation = async () => {
    try {
      const body = {
        full_name: isTextInput,
        email: email,
        date: date,
        time: time,
        group_total: isPartyNumber,
      };

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };

      fetch('http://localhost:3100/reservations', options).then((response) =>
        response.json()
      );
      // .then((response) => console.log(response));
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

  // Formates the date that is rendered
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    //@ts-ignore
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  // UPdates RESERVATIONS after each submit
  // useEffect(() => {
  //   getAllReservations();
  // }, [postReservation]);

  return (
    <ScrollView style={{flex: 1}}>
    <View style={[styles.mainContainer, ]}>
      <Header /> 
      <View style={{ height: 250, padding: 10, justifyContent: 'space-evenly'}}>
      <TextInput
        mode='outlined'
        label='First and Last Name'
        value={isTextInput}
        onChangeText={(text) => setTextInput(text)}
      />
      <TextInput
        mode='outlined'
        label='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      </View>
      <View style={{flex: 1, justifyContent: 'space-around',flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <Text> Enter Party Amount</Text>
            <TextInput 
            onChangeText={(number: any) => setPartyNumber(number)}
            mode="outlined"
            textAlign='center'
            keyboardType='number-pad'
            maxLength={2}
            style={{width:50, alignSelf:'center',}}
            /> 
      </View>
      <View style={{ flex: 1, height: 100, justifyContent: 'space-between',}}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={() => setOpen(true)} uppercase={false} mode='outlined' style={{width: 250}}>
          Pick single date
        </Button>
        <DatePickerModal
          locale='en'
          mode='single'
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
          <Text>{date ? formatDate(date) : null}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          onPress={() => setVisible(true)}
          uppercase={false}
          mode='outlined'
          style={{width: 250,}}
        >
          Pick time
        </Button>
      
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
        />
          <Text> {time}</Text>
      </View>
      </View>
  
      <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
      <Button mode='contained' onPress={postReservation}>
        Confirm Reservation
      </Button>
      </View>
      {/* <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
        <Text>Customer</Text>
        <Text>Date and Time</Text>
      </View> */}
      {/* <FlatList
        data={customer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{ flexDirection: 'row', }}
          >
            <Text style={styles.dataTexts}>{item.full_name}</Text>
            <Divider bold={true} horizontalInset={true}/>
            <Text style={styles.dataTexts}>{formatDate(item.date)}</Text>
            <Text style={styles.dataTexts}>{item.time}</Text>
          </View>
        )}
      /> */}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
  },
  dataTexts:  {
    flex: 1,
    padding: 5,
    alignSelf: 'flex-start'
  }
});

// set time picker
