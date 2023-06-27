import { useEffect, useState, useRef } from 'react';
import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Filter from '../Atoms/Filter';
import { CartIcon } from '../Atoms/CartIcon';
import MenuHeaders from '../Atoms/MenuHeaders';
import Header from '../Atoms/Header';

// function to edit data into array for State to be reneder in FlatList

function editData(data) {
  const theData = data.reduce((acc, item) => {
    const { menu_id, menu_title, item_title, price, id } = item;
    const existingSection = acc.find((section) => section.title === menu_title);

    if (existingSection) {
      existingSection.data.push({ id, menu_id, item_title, price });
    } else {
      acc.push({
        id: menu_id,
        title: menu_title,
        data: [{ id, menu_id, item_title, price }],
      });
    }

    return acc;
  }, []);

  return theData;
}

export default function Menulist() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);
  //Store selected header ID from MENUHEADERS
  const [selectedHeader, setSelectedHeader] = useState([]);
  //Where API Fetch of menu is stored
  const [menu, setMenu] = useState<any>([]);

  const handleHeaderSelection = (header: any) => {
    setIsOpen(false)
    if (selectedHeader.includes(header)) {
     
      setSelectedHeader((prev) => prev.filter((head) => head != header));
    
    } else {

      setSelectedHeader((prev) => [...prev, header]);
    }
  };

  // useEffect(() => {
  //   console.log('next item');
  //   console.log('header', selectedHeader);
  // }, [selectedHeader]);

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

  // useEffect(() => { 
  //   setIsOpen(false)
  // }, [selectedHeader])

  const renderHeader = ({ section }) => {
    const theHeader = selectedHeader.find((header) => header.id === section.id) || isOpen === true;
    const isSelectedId = theHeader;

    return isSelectedId ? (
      <TouchableOpacity>
        <View
          style={[
            {
              margin: 10,
              padding: 5,
              borderBottomWidth: 1,
              borderBottomColor: 'grey',
            },
            isSelectedId
              ? { backgroundColor: '#D3D3D3' }
              : { backgroundColor: null },
          ]}
        >
          <Text style={{ fontWeight: 'bold' }}>{section.title}</Text>
        </View>
      </TouchableOpacity>
    ) : null 
  };

  const renderItem = ({ item }) => {
    const theItem = selectedHeader.find((items) => items.id === item.menu_id) || isOpen === true;

    return theItem ? (
      <View
        style={[
          styles.itemcontainer,
          theItem ? { backgroundColor: '#D3D3D3' } : null,
        ]}
      >
        <View>
          <Text>{item.item_title}</Text>
          <Text style={{ fontStyle: 'italic' }}>${item.price}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <CartIcon />
          <Text style={{ fontSize: 10 }}>Add to Cart</Text>
        </View>
      </View>
    ) : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Filter />
      <Text>
        Selected Child IDs:{' '}
        {selectedHeader.map((header) => header.id).join(', ')}
      </Text>
      <MenuHeaders onSelectHeader={handleHeaderSelection} />
      {isLoading ? (
        <SectionList
          sections={menu}
          renderItem={renderItem}
          keyExtractor={({ id }) => id.toString()}
          renderSectionHeader={renderHeader}
          extraData={isOpen}
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
