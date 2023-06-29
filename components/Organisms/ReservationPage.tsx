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

const db = SQLite.openDatabase('mydatabase.db');





export default function ReservationPage() {

  const theme = useTheme()

  const [isTextInput, setTextInput] = useState('');
  const [email, setEmail] = useState('');
  const [customer, setCustomer] = useState([]);

  const [visible, setVisible] = useState(false);

  const [time, setTime] = useState(undefined);
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  

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
  useEffect(() => {
    getAllReservations();
  }, [postReservation]);

  return (
    <View style={[styles.mainContainer, ]}>
      <Header /> 
      <View style={{ height: 250, padding: 10, justifyContent: 'space-evenly'}}>
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
      </View>
      <View style={{  height: 100, justifyContent: 'space-between',}}>
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
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
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
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
      <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
        <Text>Customer</Text>
        <Text>Date and Time</Text>
      </View>
      <FlatList
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
      />
    </View>
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
