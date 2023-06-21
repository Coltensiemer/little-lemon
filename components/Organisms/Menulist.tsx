import { useEffect, useState } from 'react';
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Filter from '../Atoms/Filter';
import { CartIcon } from '../Atoms/CartIcon';
import { json } from 'express';
import { G } from 'react-native-svg';
import MenuHeaders from '../Atoms/MenuHeaders';




function editData(data) {
  const theData = data.reduce((acc, item) => {
    const { menu_title, item_title, price, id } = item;
    const existingSection = acc.find(
      (sections) => sections.title === menu_title
    );

    if (existingSection) {
      existingSection.data.push({ id, item_title, price });
    } else {
      acc.push({ title: menu_title, data: [{ id, item_title, price }] });
    }
    return acc;
  }, []);
  return theData;
}

export default function Menulist() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState<any>([]);
  


  const getMenu = async () => {
    try {
      const response = await fetch('http://localhost:3100/menu_items');
      const jsonData = await response.json();
      setMenu(editData(jsonData));
      setLoading(true);
    } catch (error) {
      console.log(`Error Message: ${error.Message}`);
    }
  };

 

  //rendering Data
  useEffect(() => {
    getMenu();
   
  }, []);

  const renderHeader = ({ section }) => {
    return (
      <View
        style={{
          margin: 10,
          padding: 5,
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{section.title}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemcontainer}>
        <View>
          <Text>{item.item_title}</Text>
          <Text style={{ fontStyle: 'italic' }}>${item.price}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <CartIcon />
          <Text style={{ fontSize: 10 }}>Add to Cart</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Filter />
      <MenuHeaders />
      {isLoading ? (
        <SectionList
          sections={menu}
          renderItem={renderItem}
          keyExtractor={({ id }) => id.toString()}
          renderSectionHeader={renderHeader}
        />
      ) : (
        <Text>Loading...</Text>
      )}
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
