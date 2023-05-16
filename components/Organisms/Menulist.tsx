import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Menulist() {
  const [isLoading, setLoading] = useState(false);

  const [isData, setData] = useState([]);

  const getMenu = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/littleLemonSimpleMenu.json'
      );
      const JsonData = await response.json();
      console.log(JsonData);
      setData(JsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const Item = ({ name, price }) => (
    <View>
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  );

    type Item = {
    id: number;
    name: string;
    price: number;
  }

  const renderItem = ({ item }) => (
    <Item name={item.name} price={item.price} />
  );

  return (
    <View>
      <Text>Menu</Text>
      <FlatList
        data={isData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} 
      />
      <Text>Bottom</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
