import { useEffect, useState } from 'react';
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Menulist() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // const getMenu = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json'
  //     );
  //     const json = await response.json();
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const convertStringtoJson = () => {
    const values = `[
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
  ]`;

    // converting string into an object
    const result = JSON.parse(values);
    //storing the results -now an object - in to State.
    setData(result);
  };

  useEffect(() => {
    convertStringtoJson();
  }, []);


    const sections = data.reduce((result, item) => { 
          const section = result.find(sec => sec.title === item.category.title)
            
          // checking if section equals section. If so adds 'item' into the section
            if (section) { 
              section.data.push(item)
            }
            else 
            { 
              // if section DOES NOT make, creates a new array 
              result.push({
                title: item.category.title,
                data: [item]
              })
            }
            return result
            
    }, [])

  console.log(sections)


  const Item = ({ name, price }: { name: string; price: string }) => (
    <View style={styles.itemcontainer}>
      <Text>{name}</Text>
      <Text>${price}</Text>
    </View>
  );

  const renderHeader = ({section}) => { 
    <Text>{section.title}</Text>
  }

  const renderItem = ({ item }) => (
    <Item name={item.title} price={item.price} />
  );



  return (
    <SafeAreaView style={styles.container}>
      <Text>ViewMenu</Text>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        keyExtractor={({ id }) => id} 
        //@ts-ignore
        renderSectionHeader={renderHeader}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4CE14',
  },
  itemcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
