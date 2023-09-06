import { View, Text, SectionList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMenu } from '../../javascript/menuList';
import { Card } from 'react-native-paper';

export default function MenuDaily() {
  const [MenuDaily, setMenuDaily] = useState([]);

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

  const oneMenuItem = MenuDaily.reduce((result, item) => {
	const menuItem = item.data[2]; // Assuming you want the third item in each "data" array
	if (menuItem) {
	  result[item.id] = menuItem; // Use "id" as the key
	}
	return result;
  }, {});

console.log('item', oneMenuItem)

  return (
    <View>
      <Text>Testing</Text>
      <Card>
        <Card.Title title={oneMenuItem.item_title} />
      </Card>
    </View>
  );
}
