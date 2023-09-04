import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { getMenu } from '../../javascript/menuList'

export default function MenuDaily() {

	const [menuItem, setmenuItem] = useState([])

	useEffect(() => { 
		getMenu(setmenuItem)
	},[])

	console.log(menuItem)

  return (
	<View>
		<Text>Testing</Text>
        {/* {menuItem.map((item) => (
          <Text key={item.id}>{item.}</Text>
        ))} */}
    
	</View>
  )
}
