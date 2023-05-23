import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import FullName from '../Atoms/FullName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Saveinput from '../Atoms/Saveinput';

export default function ReservationPage() {
  const [isTextInput, setTextInput] = useState('');
  const [customer, setCustomer] = useState([]);

  useEffect(() => { 
	(async () => { 
		try { 
		const customer =	await AsyncStorage.getItem('customer')
		setCustomer(customer === null ? [] : JSON.parse(customer))
		}
		catch (e) { 
			console.log(e)
		}
	})()
  }, [])

  
  useEffect(() => {
 (async () => {
      try {
        await AsyncStorage.setItem('customer', JSON.stringify(customer));
      } catch (e) {
        console.log(e);
      }
    })()
  }, [customer]);


console.log('fir')
console.log(customer)

  return (
    <View>
      <Text>ReservationPage</Text>
      <FullName
	  	value={isTextInput}
        onchange={(data: string) => setTextInput(data)}
        style={null}
        placeholder={'Enter Full Name'}
      />
      <Saveinput
        //   can not pass null?
        onClick={() => {
          setCustomer([...customer, isTextInput]);
          setTextInput('');
        }}
        label={'Save Name'}
        style={null}
        styleText={null}
      />
      {customer.map((customer) => (
        <Text >{customer}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
