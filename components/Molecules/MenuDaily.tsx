import { View, Text, SectionList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMenu } from '../../javascript/menuList';
import { Card, useTheme } from 'react-native-paper';
import CardCover from 'react-native-paper/lib/typescript/src/components/Card/CardCover';

export default function MenuDaily() {
  const [MenuDaily, setMenuDaily] = useState([]);
  const theme = useTheme()

  useEffect(() => {
    const fetchMenu = () => {
      try {
        getMenu(setMenuDaily);
      } catch (error) {
        console.log('Error getting menu in MenuDaily', getMenu);
      }
    };
    fetchMenu();
  }, []);

  
  const oneItem = MenuDaily[0]?.data[0]
  const price = "$" + oneItem?.price

  return (
	<View style={{padding: 25}}>
		<Text style={{fontSize: 24, padding: 10, color: theme.colors.inversePrimary}}>Food of the Day!</Text>
    <View style={{borderWidth: 1, padding: 5, borderColor: theme.colors.inversePrimary }}>
      <Card>
        <Card.Title title={oneItem?.item_title} subtitle={price}/>
		<Card.Cover source={oneItem?.image} /> 
      </Card>
    </View>
	</View>
  );
}
