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
import { useForm, Controller, useFormState } from 'react-hook-form';

const db = SQLite.openDatabase('mydatabase.db');

export default function ReservationPage() {
  const theme = useTheme();

  // input data that is store in state
  const [isName, setName] = useState<string>('');
  const [isEmail, setisEmail] = useState<string>('');
  const [isPartyNumber, setPartyNumber] = useState<any>();

  // Date and time date that is stored in state
  const [time, setTime] = useState<any>(undefined);
  const [date, setDate] = useState<any>(undefined);

  // conditional rendering booleans
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  // State to retreve and store customers reservations made
  const [customer, setCustomer] = useState<any>();

  


  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  // Form Validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log('errors', errors)

  // Confirm single DATE PICKER
  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      console.log(params.date);
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
        full_name: isName,
        isEmail: isEmail,
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

  // Fake onsubmit

  const onSubmitform = (d: any) => {
    try {
      console.log({ isEmail, isName, d });
      
    } catch (error) {

      console.log('error on form', error.message)
    }
 
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
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.mainContainer]}>
        <Header />
        <View
          style={{ height: 250, padding: 10, justifyContent: 'space-evenly' }}
        >
          <Controller
            control={control}
            
            name='firstName'
            defaultValue=""
            rules={{
              required: { 
                value: true, 
                message: 'Name is required'
              }, 
              
            }}
             render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode='outlined'
                label='First and Last Name'
                error={!!errors.firstName}
                onChangeText={(text) => (onChange(text))}
                // onBlur={onBlur}
              />
            )}
          />
          {errors.firstName && <Text>This is required.</Text>}

          <Controller
            control={control}
            name='isEmail'
            defaultValue=""
            rules={{
              required: { 
                value: true, 
                message: 'Email is required'
              },
              pattern: { 
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email is invalid'
              }
              
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode='outlined'
                textContentType='emailAddress'
                label='Email'
                error={!!errors.isEmail}
                // value={isEmail}
                onChangeText={(text) => onChange(text)}
                // style={{null}}
              />
            )}
      
          />
          {errors.isEmail && <Text>This is required.</Text>}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text> Enter Party Amount</Text>
          <View>
          <Controller 
          name='isPartySize'
          defaultValue=""
          rules={{
            required: { 
              value: true, 
              message: 'Email is required'
            },
            pattern: { 
              value: /^[0-9]+$/,
              message: 'Email is invalid'
            }
            
          }}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onChangeText={(number: any) => setPartyNumber(number)}
            mode='outlined'
            textAlign='center'
            keyboardType='number-pad'
            maxLength={2}
            error={!!errors.isPartySize}
            style={{ width: 50, alignSelf: 'center' }}
            />
  )}
          />

{errors.isPartySize && <Text>This is required.</Text>}
</View>
      
          
        </View>
        <View style={{ flex: 1, height: 100, justifyContent: 'space-between' }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Button
              onPress={() => setOpen(true)}
              uppercase={false}
              mode='outlined'
              style={{ width: 250 }}
            >
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
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Button
              onPress={() => setVisible(true)}
              uppercase={false}
              mode='outlined'
              style={{ width: 250 }}
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

        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
          <Button mode='contained' onPress={handleSubmit(onSubmitform)}>
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
  dataTexts: {
    flex: 1,
    padding: 5,
    alignSelf: 'flex-start',
  },
});

// set time picker
