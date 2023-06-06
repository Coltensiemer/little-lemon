import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function datePicker() {
	const [date, setDate] = useState(new Date(1598051730000));
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
  
	const onChange = (event, selectedDate) => {
	  const currentDate = selectedDate;
	  setShow(false);
	  setDate(currentDate);
	};
  
	const showMode = (currentMode) => {
	  if (Platform.OS === 'android') {
		setShow(false);
		// for iOS, add a button that closes the picker
	  }
	  setMode(currentMode);
	};
  
	const showDatepicker = () => {
	  showMode('date');
	};
  
	const showTimepicker = () => {
	  showMode('time');
	};
  
	return (
	  <View>
		<Button onPress={showDatepicker} title="Show date picker!" />
		<Button onPress={showTimepicker} title="Show time picker!" />
		<Text>selected: {date.toLocaleString()}</Text>
		{show && (
		  <DateTimePicker
			testID="dateTimePicker"
			value={date}
			is24Hour={true}
			onChange={onChange}
		  />
		)}
	  </View>
	);
  };


