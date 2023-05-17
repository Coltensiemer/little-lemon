import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Menulist() {
  const [isLoading, setLoading] = useState(true);

  const [isData, setData] = useState();

  const getMenu = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json'
      );
      const JsonData = await response.json();
      // console.log(JsonData);
      setData(JsonData);
    } catch (error) {
      console.log(error);
    } finally { 
      setLoading(false)
    }
  };
console.log("first")
  console.log(isData)
  console.log("last")

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
        keyExtractor={({ id }, index) => id} 
      />
      <Text>Bottom</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
