import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import FullName from '../Atoms/FullName';
import * as SQLite from 'expo-sqlite';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Saveinput from '../Atoms/Saveinput';

const db = SQLite.openDatabase('mydatabase.db');



export default function ReservationPage() {
  const [isTextInput, setTextInput] = useState('');
  const [customer, setCustomer] = useState([]);

//   useEffect(() => { 
// 	(async () => { 
// 		try { 
// 		const customer =	await AsyncStorage.getItem('customer')
// 		setCustomer(customer === null ? [] : JSON.parse(customer))
// 		}
// 		catch (e) { 
// 			console.log(e)
// 		}
// 	})()
//   }, [])


  useEffect(() => {

      
		db.transaction((tx) => { 
			tx.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL')
		})
		db.transaction((tx)=> { 
			tx.executeSql('SELECT * from users', [], (_, { rows }) => {
				const result = rows._array;
				setCustomer(result)
			})
		})
  }, []);


console.log('fir')
console.log(customer)

  return (
    <View>
      
      <FullName
	  	value={isTextInput}
        onchange={(data: string) => setTextInput(data)}
        style={null}
        placeholder={'Enter Full Name'}
      />
      <Saveinput
        onClick={() => {
          setCustomer([...customer, isTextInput]);
		  db.transaction((tx) => { 
			tx.executeSql('INSERT INTO users (name) values(?)', [isTextInput])
		  })
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
