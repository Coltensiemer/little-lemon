import { View, Text, SectionList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { getMenu } from '../../javascript/menuList'
import { Card } from 'react-native-paper'

export default function MenuDaily() {

	const [MenuDaily, setMenuDaily] = useState()

useEffect(() => { 
const fetchMenu = () => { 
	try {
		getMenu(setMenuDaily)
	} catch (error) {
		console.log("Error getting menu in MenuDaily", getMenu)
	}
}
fetchMenu()
},[])




  return (
	<View>
		<Text>Testing</Text>
		<Card>
			<Card.Title  title="title"/> 
		</Card>

	</View>
  )
}
