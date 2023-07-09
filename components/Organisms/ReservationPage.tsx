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
import {
  TextInput,
  Button,
  Divider,
  useTheme,
  Portal,
  Modal,
  Surface,
  ProgressBar
} from 'react-native-paper';
import Header from '../Atoms/Header';
import { useForm, Controller, useFormState, set } from 'react-hook-form';
import EmailInput from '../Atoms/EmailInput';
import { SafeAreaView } from 'react-native-safe-area-context';

const db = SQLite.openDatabase('mydatabase.db');

type FormValues = {
  full_name: string;
  email: string;
  date: string;
  time: string;
  group_total: string;
};

export default function ReservationPage({navigation}) {
  const theme = useTheme();

  // input data that is store in state
  const [isName, setName] = useState<string>('');
  const [isEmail, setisEmail] = useState<string>('');
  const [isPartyNumber, setPartyNumber] = useState<any>();
  const [isProgress, setProgress] = useState<number>()
  const [isProgressColor, setProgressColor] = useState<string>('red')

  // Date and time date that is stored in state
  const [time, setTime] = useState<any>(undefined);
  const [date, setDate] = useState<any>(undefined);

  // conditional rendering booleans
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState(false);

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
    try {
      setVisibleModal(true)
      const formData = {
        full_name: data.firstName,
        email: data.isEmail,
        time: formatTime({
          hours: data.time.hours,
          minutes: data.time.minutes,
        }), // Formats into a date and time
        date: data.date.date, // Since using date Picker, date is set as an object inside of data.date
        group_total: data.isPartySize,
      };

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      };

      const response = await fetch(
        'http://localhost:3100/reservations',
        options
      );
      const responseData = await response.json();
      console.log('POST request succeeded');
     
    
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // get ALL Reservations
  // const getAllReservations = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3100/reservations');
  //     const jsonData = await response.json();
  //     // console.log(jsonData);
  //     setCustomer(jsonData);
  //   } catch (err) {
  //     console.log(`There was an error: ${err}`);
  //   }
  // };

  // // Formates the date that is rendered
  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const options = { month: 'long', day: 'numeric', year: 'numeric' };
  //   //@ts-ignore
  //   const formattedDate = date.toLocaleDateString('en-US', options);
  //   return formattedDate;
  // }

  function formatTime({ hours, minutes }) {
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}:00`;
  }

  function renderFormData() {
    const data = getValues();

    // console.log('data', data);

    return (
      <View>
        <Text>Full Name: {data.firstName}</Text>
        <Text>Email: {data.isEmail}</Text>
        <Text>
          Time: {data.time?.hours}:{data.time?.minutes}
        </Text>
        <Text>Party Size: {data.isPartySize}</Text>
      </View>
    );
  }

  const progressBar = () => { 

    const inputValues = getValues(['firstName', 'isEmail', 'isPartySize'])
    const timeValues = getValues('time')
    const dateValues = getValues('date')

    const dateProgress = Object.values(dateValues).filter((values) => values).length
    const timeProgress = Object.values(timeValues).filter((values) => values).length / 2
    const inputProgress = Object.values(inputValues).filter((values) => values?.trim() != '').length

    const progressResults = (timeProgress + inputProgress + dateProgress) / 5;

    setProgress(progressResults)

    if (isProgress === 1) { 
      setProgressColor('green')
    }

// console.log('values', inputValues)
// console.log('time test', timeValues)
// console.log('date', dateProgress)
// console.log('time', timeProgress)


  }

const data = getValues()
  useEffect(() => {
    progressBar()
    // console.log(data)
  }, [submitForm]);


 
  // UPdates RESERVATIONS after each submit
  // useEffect(() => {
  //   getAllReservations();
  // }, [postReservation]);

  return (
   
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.mainContainer]}>
        <Header />
        <ProgressBar color={isProgressColor} progress={isProgress} style={{margin: 10}}/>
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
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{fontWeight: '300'}}> Enter Party Amount</Text>
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

        <View style={{ flex: 1, height: 250, justifyContent: 'space-around' }}>
          <View
            style={{
              paddingBottom: 20,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Controller
              name='date'
              defaultValue=''
              rules={{
                required: {
                  value: true,
                  message: 'Date is required',
                },
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
             
                  <Button
                    onPress={() => setOpen(true)}
                    uppercase={false}
                    mode='outlined'
                    textColor={errors.date ? 'red' : null}
                    style={{ width: 250, height: 40 }}
                  >
                    Pick single date
                  </Button>
               
                  <DatePickerModal
                    locale='en'
                    mode='single'
                    visible={open}
    
                    onDismiss={onDismissSingle}
                    date={date}
                    onConfirm={(data) => {
                      onChange(data);
                      setOpen(false);
                    }}
                  />
                </View>
              )}
            />
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Controller
              name='time'
              defaultValue=''
              rules={{
                required: {
                  value: true,
                  message: 'Date is required',
                },
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Button
                    onPress={() => setVisible(true)}
                    uppercase={false}
                    mode='outlined'
                    style={{ width: 250, height: 40 }}
                    textColor={errors.time ? 'red' : null}
                  >
                    Pick time
                  </Button>
                  <TimePickerModal
                    visible={visible}
                    onDismiss={onDismiss}
                    label='Select a Date'
                    use24HourClock={false}
                    onConfirm={(data) => {
                      onChange(data);
                      setVisible(false);
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
          ></View>

          {/* RESERVATION CONFIRMATION MODAL */}
          <Portal>
            <Modal
              visible={visibleModal}
              onDismiss={() => setVisibleModal(false)}
              
              contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 10 }}
            >
              <Text style={{fontSize: 24,fontWeight: 'bold'}}>RESERVATION CONFIRMED</Text>
              <Divider bold={true} style={{margin: 10}}/> 
              {renderFormData()}
              <Divider bold={true} style={{margin: 10}}/> 
              <Button onPress={() => {navigation.navigate('HomeScreen')}}>Back to Home Screen</Button>
            </Modal>
        
          </Portal>

        

          <Divider bold={true} />

          {/* Submit BUTTON */}
          <View style={{ flex: 2, justifyContent: 'center', padding: 10 }}>
            <Button
              mode='contained'
              onPress={
                handleSubmit(submitForm)}
            >
              Confirm Reservation
            </Button>
          </View>
        </View>
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
