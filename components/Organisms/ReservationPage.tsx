import {
  Animated,
  StyleSheet,
  View,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
  useReducer,
} from 'react';
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
  Text,
  ProgressBar,
  Chip,
} from 'react-native-paper';
import Header from '../Atoms/Header';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { Motion } from '@legendapp/motion';
import { AuthContext } from '../../context/AuthContext';
import {
  ReservationState,
  ReservationReducer,
  ReducerAction,
} from '../../context/ReservationReducer';
import { formatTime, formatDate } from '../../javascript/time_date';

export default function ReservationPage({ navigation }) {
  const INITAL_STATE: ReservationState = {
    partySize: null,
    date: '',
    time: '',
    isVisibleTime: false,
    isVisibleDate: false,
  };

  const [state, dispatch] = useReducer(ReservationReducer, INITAL_STATE);

  //@ts-ignore
  const { isUserData } = useContext(AuthContext);
  const theme = useTheme();

  // input data that is store in state

  const [isProgress, setProgress] = useState<number>();
  const [isProgressColor, setProgressColor] = useState<string>('red');

  // Date and time date that is stored in state
  const [time, setTime] = useState<any>(undefined);
  const [date, setDate] = useState<any>(undefined);

  // conditional rendering booleans
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const [visibleTime, setVisibleTime] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);

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
    reset,
    watch,
  } = useForm({
    defaultValues: {
      isPartySize: '',
      date: '',
      time: '',
    },
  });

  const watchAllFields = watch();

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
      setVisibleModal(true);
      const formData = {
        full_name:
          isUserData?.isUserData?.first_name +
          ' ' +
          isUserData?.isUserData?.last_name,
        email: isUserData?.isUserData?.email,
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

  // MODAL FUNCTION for render
  function renderFormData() {
    const data = getValues();
    const date = formatDate(data.date?.date);
    return (
      <View>
        <Text>Full Name: {data.firstName}</Text>
        <Text>Email: {data.isEmail}</Text>
        <Text>Date: {date}</Text>
        <Text>
          Time: {data.time?.hours}:{data.time?.minutes}
        </Text>
        <Text>Party Size: {data.isPartySize}</Text>
      </View>
    );
  }

  function renderTimeData() {
    const data = getValues();
    return (
      <View>
        <Text>
          Time:{data.time?.hours}:{data.time?.minutes}
        </Text>
      </View>
    );
  }

  function renderDateData() {
    const data = getValues();

    const date = formatDate(data.date?.date);
    return (
      <View>
        <Text>Date: {date}</Text>
      </View>
    );
  }

  // PROGRESS BAR
  const progressBar = () => {
    // Collects Values from React Form
    const inputValues = getValues(['isPartySize']);
    const timeValues = getValues('time');
    const dateValues = getValues('date');

    // Filter for lengths
    const dateProgress = Object.values(dateValues).filter(
      (values) => values
    ).length;
    const timeProgress =
      Object.values(timeValues).filter((values) => values).length / 2;
    const inputProgress = Object.values(inputValues).filter(
      (values) => values?.trim() != ''
    ).length;

    const progressResults = (timeProgress + inputProgress + dateProgress) / 3;

    setProgress(progressResults);

    if (isProgress === 1) {
      setProgressColor('green');
    } else {
      setProgressColor('red');
    }
  };

  useEffect(() => {
    progressBar();

    const getTime = getValues('time');

    if (Object.keys(getTime).length > 1) {
      setVisibleTime(true);
    }

    const getDate = getValues('date');
    if (Object.keys(getDate) && Object.keys(getDate).length > 0) {
      setVisibleDate(true);
    }
  }, [watchAllFields]);

  const restReservations = () => {
    reset({ isPartySize: '', date: '', time: '' });
    setVisibleDate(false);
    setVisibleTime(false);
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontWeight: '300', fontSize: 24, paddingBottom: 10 }}>
          {' '}
          Enter Party Amount
        </Text>
        <View>
          <Controller
            name='isPartySize'
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
                onChangeText={(number) => onChange(number)}
                value={value}
                mode='outlined'
                textAlign='center'
                keyboardType='number-pad'
                maxLength={2}
                error={!!errors.isPartySize}
                style={{ width: 75, alignSelf: 'center', paddingLeft: 10 }}
              />
            )}
          />

          <Text
            style={
              errors.isPartySize ? { color: 'black' } : { color: 'transparent' }
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
            flexDirection: 'row',
          }}
        >
          <Controller
            name='date'
            rules={{
              required: {
                value: true,
                message: 'Date is required',
              },
            }}
            control={control}
            render={({ field: { onChange } }) => (
              <Motion.View animate={{ x: visibleDate ? -25 : 30 }}>
                <Button
                  icon='calendar-month'
                  onPress={() => setOpen(true)}
                  uppercase={false}
                  mode='outlined'
                  textColor={errors.date ? 'red' : null}
                  style={[
                    {
                      height: 50,
                      justifyContent: 'center',
                      alignContent: 'center',
                      paddingLeft: 15,
                    },
                    visibleDate ? { width: 1 } : { width: 250 },
                  ]}
                >
                  {visibleDate ? null : 'Pick a Date'}
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
              </Motion.View>
            )}
          />
          <Motion.View animate={{ x: visibleDate ? -45 : 100 }}>
            <Chip
              mode='outlined'
              elevated={true}
              style={[
                { height: 50, paddingTop: 15 },
                visibleDate ? { width: 200 } : { width: 10 },
              ]}
            >
              {renderDateData()}
            </Chip>
          </Motion.View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Controller
            name='time'
            rules={{
              required: {
                value: true,
                message: 'Date is required',
              },
            }}
            control={control}
            render={({ field: { onChange } }) => (
              <Motion.View animate={{ x: visibleTime ? -75 : 0 }}>
                <Button
                  icon='clock'
                  onPress={() => setVisible(true)}
                  uppercase={false}
                  mode='outlined'
                  style={[
                    { height: 50, justifyContent: 'center', paddingLeft: 15 },
                    visibleTime ? { width: 1 } : { width: 250 },
                  ]}
                  textColor={errors.time ? 'red' : null}
                >
                  {visibleTime ? null : 'Pick a Time'}
                </Button>
                <TimePickerModal
                  visible={visible}
                  onDismiss={onDismiss}
                  label='Select a Time'
                  use24HourClock={false}
                  onConfirm={(data) => {
                    onChange(data);
                    setVisible(false);
                  }}
                  hours={12}
                  minutes={14}
                />
              </Motion.View>
            )}
          ></Controller>
          <Motion.View animate={{ x: visibleTime ? 0 : 100 }}>
            <Chip
              mode='outlined'
              elevated={true}
              style={[
                { height: 50, alignItems: 'center', paddingTop: 10 },
                visibleTime ? { width: 200 } : { width: 10 },
              ]}
            >
              {renderTimeData()}
            </Chip>
          </Motion.View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flex: 1,
            margin: 10,
          }}
        ></View>
        <Button onPress={restReservations}>Reset</Button>
        <ProgressBar
          color={isProgressColor}
          progress={isProgress}
          style={{ margin: 10 }}
        />

        {/* RESERVATION CONFIRMATION MODAL */}
        <Portal>
          <Modal
            visible={visibleModal}
            onDismiss={() => setVisibleModal(false)}
            contentContainerStyle={{
              backgroundColor: theme.colors.background,
              padding: 20,
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              RESERVATION CONFIRMED
            </Text>
            <Divider bold={true} style={{ margin: 10 }} />
            {renderFormData()}
            <Divider bold={true} style={{ margin: 10 }} />
            <Button
              onPress={() => {
                navigation.navigate('HomeScreen');
                setVisibleModal(false);
                restReservations();
              }}
            >
              Back to Home Screen
            </Button>
          </Modal>
        </Portal>

        {/* Submit BUTTON */}
        <View style={{ flex: 2, justifyContent: 'center', padding: 10 }}>
          <Button mode='contained' onPress={handleSubmit(submitForm)}>
            Confirm Reservation
          </Button>
        </View>
      </View>
    </View>
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
