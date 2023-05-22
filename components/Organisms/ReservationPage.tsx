import { StyleSheet, Text, View } from 'react-native'
import {useEffect, useState} from 'react'
import FullName from '../Atoms/FullName'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Saveinput from '../Atoms/Saveinput'

export default function ReservationPage() {

	const [isName, setName] = useState("")
	const [customer, setCustomer] = useState([])

	const storeData = async (value) => {
		try {
		  await AsyncStorage.setItem('Name', JSON.stringify(value))
		  console.log("successfuly!!")
		//   console.log(customer)
		} catch (e) {
		  console.log(e)
		}
	  }

	  useEffect(() => { 
		storeData(customer)
	  })

console.log(isName)

//onclick function pass down to SaveInput for when state is saved

  return (
	<View>
	  <Text>ReservationPage</Text>
	  <FullName 
	  onchange={setName}
      style={null}
      placeholder={"Enter Full Name"}/> 
	  <Saveinput 
	//   can not pass null? 
	  onClick={null}
	  label={'Save Name'}
	  style={null}
	  styleText={null}/> 
	  <Text>{isName}</Text>
	</View>
  )
}

const styles = StyleSheet.create({})