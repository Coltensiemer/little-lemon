import {
  Animated,
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
import { useForm, Controller, useFormState, set } from 'react-hook-form';
import EmailInput from '../Atoms/EmailInput';

const db = SQLite.openDatabase('mydatabase.db');

type FormValues = {
  full_name: string;
  email: string;
  date: string;
  time: string;
  group_total: string;
};

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
    getValues,
  } = useForm();

  // console.log('errors', errors)

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

  const submitForm = async (data: any) => {

    const datas  = getValues()

    console.log(datas)
    try {
      const formData = {

        full_name: data.firstName,
        email: data.isEmail,
        time: formatTime({ hours: data.time.hours, minutes: data.time.minutes }),
        date: data.date.date, // Since using date Picker, date is set as an object inside of data.date
        group_total: data.isPartySize
      };
  
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      };
  
      const response = await fetch('http://localhost:3100/reservations', options);
      const responseData = await response.json();
  
      console.log('Response:', responseData);
      console.log('POST request succeeded');
    } catch (error) {
      console.log('Error:', error);
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

  function formatTime({ hours, minutes }) {
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}:00`;
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
            defaultValue=''
            rules={{
              required: {
                value: true,
                message: 'Name is required',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode='outlined'
                label='First and Last Name'
                error={!!errors.firstName}
                onChangeText={(text) => onChange(text)}
                // onBlur={onBlur}
              />
            )}
          />
          <Text
            style={
              errors.firstName ? { color: 'black' } : { color: 'transparent' }
            }
          >
            This is required.
          </Text>

          <Controller
            control={control}
            name='isEmail'
            defaultValue=''
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email is invalid',
              },
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
          <Text
            style={
              errors.isEmail ? { color: 'black' } : { color: 'transparent' }
            }
          >
            This is required.
          </Text>
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
              defaultValue=''
              rules={{
                required: {
                  value: true,
                  message: 'Party is required',
                },
                pattern: {
                  value: /^\d{1,2}$/,
                  message: 'Party Number is invalid',
                },
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={(number: any) => onChange(number)}
                  mode='outlined'
                  textAlign='center'
                  keyboardType='number-pad'
                  maxLength={2}
                  error={!!errors.isPartySize}
                  style={{ width: 75, alignSelf: 'center', marginBottom: 10 }}
                />
              )}
            />

            <Text
              style={
                errors.isPartySize
                  ? { color: 'black' }
                  : { color: 'transparent' }
              }
            >
              This is required.
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, height: 300, justifyContent: 'space-around' }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Controller
              name='date'
              defaultValue=''
              rules={{
                required: {
                  value: false,
                  message: 'Date is required',
                },
                // pattern: {
                //   value: /^[0-9]+$/,
                //   message: 'Date is invalid',
                // },
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Button
                    onPress={() => setOpen(true)}
                    uppercase={false}
                    mode='outlined'
                    textColor={errors.date ? 'red' : null}
                    style={{ width: 250, height: 50 }}
                  >
                    Pick single date
                  </Button>
                  <DatePickerModal
                    locale='en'
                    mode='single'
                    visible={open}
                    onDismiss={onDismissSingle}
                    date={date}
                    onConfirm={data => {
                      onChange(data);
                      setOpen(false);
                    }}
                  />
                </View>
              )}
              
            />
           
          </View>

          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Controller
              name='time'
              defaultValue=''
              rules={{
                required: {
                  value: false,
                  message: 'Date is required',
                },
                // pattern: {
                //   value: /^[0-9]+$/,
                //   message: 'Date is invalid',
                // },
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View >
                <Button
                  onPress={() => setVisible(true)}
                  uppercase={false}
                  mode='outlined'
                  style={{ width: 250, height: 50 }}
                  textColor={errors.time ? 'red' : null}
                >
                  Pick time
                </Button>
                <TimePickerModal
              visible={visible}
              onDismiss={onDismiss}
              onConfirm={data => { 
                onChange(data)
              setVisible(false)
              }}
              hours={12}
              minutes={14}
            />
          </View>
              )}  
              /> 
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flex: 1,
            margin: 10,
          }}
        >
          <Text>{date ? formatDate(date) : null}</Text>
          <Text> {time}</Text>
        </View>

        <Divider bold={true} />

        {/* Submit BUTTON */}
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
          <Button mode='contained' onPress={handleSubmit(submitForm)}>
            Confirm Reservation
          </Button>
        </View>

      
      </View>
      </View>
    </ScrollView>
)
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
