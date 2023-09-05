import { View, Text, SectionList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { getMenu } from '../../javascript/menuList'

export default function MenuDaily() {






  return (
	<View>
		<Text>Testing</Text>
		{/* <SectionList 
		sections={menuItem}
		renderItem={({item}) => (
			<View>
				<Text>{item}</Text>
			</View>
		)}
		keyExtractor={(item, index) => item + index}
		renderSectionHeader={({section: {title}}) => (
			<Text>{title}</Text>)}
		/>  */}
	</View>
  )
}
