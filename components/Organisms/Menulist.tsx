import { useEffect, useState } from 'react';
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Filter from '../Atoms/Filter';

const values = [
  {
    id: 1,
    title: 'Spinach Artichoke Dip',
    price: '10',
    category: {
      title: 'Appetizers',
    },
  },
  {
    id: 2,
    title: 'Hummus',
    price: '10',
    category: {
      title: 'Appetizers',
    },
  },
  {
    id: 3,
    title: 'Fried Calamari Rings',
    price: '5',
    category: {
      title: 'Appetizers',
    },
  },
  {
    id: 4,
    title: 'Fried Mushroom',
    price: '12',
    category: {
      title: 'Appetizers',
    },
  },
  {
    id: 5,
    title: 'Greek',
    price: '7',
    category: {
      title: 'Salads',
    },
  },
  {
    id: 6,
    title: 'Caesar',
    price: '7',
    category: {
      title: 'Salads',
    },
  },
  {
    id: 7,
    title: 'Tuna Salad',
    price: '10',
    category: {
      title: 'Salads',
    },
  },
  {
    id: 8,
    title: 'Grilled Chicken Salad',
    price: '12',
    category: {
      title: 'Salads',
    },
  },
  {
    id: 9,
    title: 'Water',
    price: '3',
    category: {
      title: 'Beverages',
    },
  },
  {
    id: 10,
    title: 'Coke',
    price: '3',
    category: {
      title: 'Beverages',
    },
  },
  {
    id: 11,
    title: 'Beer',
    price: '7',
    category: {
      title: 'Beverages',
    },
  },
  {
    id: 12,
    title: 'Iced Tea',
    price: '3',
    category: {
      title: 'Beverages',
    },
  },
];


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


  //rendering Data
  useEffect(() => {
    setData(values);
  }, []);

  //Grouping the Data by Category.title
  const groupData = values.reduce((acc, value) => {
    const category = value.category.title;

    // if not apart of category.title, make not category
    if (!acc[category]) {
      acc[category] = [];
    }

    //if apart of category.title, push items into category
    acc[category].push(value);

    return acc;
  }, {});

  // converting GroupData to sections
  const sections = Object.keys(groupData).map((category) => ({
    title: category,
    data: groupData[category],
  }));

  const renderHeader = ({ section }) => {
    return (
      <View>
        <Text>{section.title}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemcontainer}>
        <Text>{item.title}</Text>
        <Text>${item.price}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Filter />
      <SectionList
        sections={sections}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
        renderSectionHeader={renderHeader}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
  },
  itemcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
