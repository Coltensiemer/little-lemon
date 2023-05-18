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
console.log("firstasdfadf")
  console.log(isData)
  console.log("lastasdfsd")

  useEffect(() => {
    getMenu();
  }, []);


 const values = {
	"menu": [
		{
			"id": 1,
			"title": "Spinach Artichoke Dip",
			"price": "10",
			"category": {
				"title": "Appetizers"
			}
		},
		{
			"id": 2,
			"title": "Hummus",
			"price": "10",
			"category": {
				"title": "Appetizers"
			}
		},
		{
			"id": 3,
			"title": "Fried Calamari Rings",
			"price": "5",
			"category": {
				"title": "Appetizers"
			}
		},
		{
			"id": 4,
			"title": "Fried Mushroom",
			"price": "12",
			"category": {
				"title": "Appetizers"
			}
		},
		{
			"id": 5,
			"title": "Greek",
			"price": "7",
			"category": {
				"title": "Salads"
			}
		},
		{
			"id": 6,
			"title": "Caesar",
			"price": "7",
			"category": {
				"title": "Salads"
			}
		},
		{
			"id": 7,
			"title": "Tuna Salad",
			"price": "10",
			"category": {
				"title": "Salads"
			}
		},
		{
			"id": 8,
			"title": "Grilled Chicken Salad",
			"price": "12",
			"category": {
				"title": "Salads"
			}
		},
		{
			"id": 9,
			"title": "Water",
			"price": "3",
			"category": {
				"title": "Beverages"
			}
		},
		{
			"id": 10,
			"title": "Coke",
			"price": "3",
			"category": {
				"title": "Beverages"
			}
		},
		{
			"id": 11,
			"title": "Beer",
			"price": "7",
			"category": {
				"title": "Beverages"
			}
		},
		{
			"id": 12,
			"title": "Iced Tea",
			"price": "3",
			"category": {
				"title": "Beverages"
			}
		}
	]
}

  const Item = ({ name, price }) => (
    <View>
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  );

    type Item = {
    id: number;
    title: string;
    price: number;
  }

  const renderItem = ({ item }) => (
    <Item name={item.object.title} price={item.Object.price} />
  );

  return (
    <View>
      <Text> ViewMenu</Text>
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
