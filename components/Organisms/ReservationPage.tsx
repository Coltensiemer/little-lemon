import { StyleSheet, Text, View, Platform} from 'react-native';
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
  const [customer, setCustomer] = useState([]);

  const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty')


  // get ALL

  const getAllReservations = async () => { 
try { 
  const response = await fetch("http://localhost:3100/reservations")
  const json = await response.json(); 

  setCustomer(json)
}
catch (err) { 
  console.log(err)
}
  }


  // useEffect(() => { 
  //   getAllReservations()
  // })


  // Data and time Picker 
  
	const onChange = (event, selectedDate) => {
	  const currentDate = selectedDate || date;
	  setShow(Platform.OS === 'ios');
	  setDate(currentDate);

    let tempDate = new Date(currentDate)
    let fdate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    let fTime = 'Hours ' + tempDate.getHours() + ' | minutes' +  tempDate.getMinutes(); 
    setText(fdate + '\n' + fTime)

    console.log(fdate + fTime)
	};
  
	const showMode = (currentMode) => { 
		setShow(true);
		// for iOS, add a button that closes the picker
	  setMode(currentMode);
	};
  
	const showDatepicker = () => {
	  showMode('date');
    console.log("showDate")
	};
  
	const showTimepicker = () => {
	  showMode('time');
    console.log("showTime")
	};

  return (
    <View>
      <TextInput
        label='First and Last Name'
        value={isTextInput}
        onChangeText={(text) => setTextInput(text)}
      />
      <TextInput
        label='Email'
        value={isTextInput}
        onChangeText={(text) => setTextInput(text)}
      />


<Button onPress={showDatepicker} mode='outlined'>Show Date Picker</Button>

<Button onPress={showTimepicker} mode='outlined'> Show Time Picker</Button> 
		<Text>{text}</Text>
		{show && (
		  <DateTimePicker
			testID="dateTimePicker"
			value={date}
      //@ts-ignore
      mode={mode}
			is24Hour={true}
      display='default'
			onChange={onChange}
		  />
		)}


      <Button
        mode='contained'
        onPress={() => console.log('Confirm Reservation')}
      >
        Confirm Reservation'
      </Button>
      {customer.map((customer) => (
        <Text>{customer}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
