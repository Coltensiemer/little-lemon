import { useEffect, useState, useRef, useDebugValue } from 'react';
import {
  FlatList,
  SectionList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CartIcon } from '../../Atoms/Icons';
import MenuHeaders from '../../Atoms/MenuHeaders';
import Header from '../../Atoms/Header';
import { ThemeProvider, useTheme, Text } from 'react-native-paper';
import { useAuthContext } from '../../../context/AuthContext';
import { getMenu } from '../../../javascript/menuList';

// function to edit data into array for State to be reneder in FlatList

export default function Menulist() {
  const theme = useTheme();

  //@ts-ignore

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);
  //Store selected header ID from MENUHEADERS
  const [selectedHeader, setSelectedHeader] = useState([]);
  //Where API Fetch of menu is stored
  const [menu, setMenu] = useState<any>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        getMenu(setMenu);
        setLoading(true);
      } catch (error) {
        console.log('There was an error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

  const handleHeaderSelection = (header: any) => {
    setIsOpen(false);
    if (selectedHeader.includes(header)) {
      setSelectedHeader((prev) => prev.filter((head) => head != header));
    } else {
      setSelectedHeader((prev) => [...prev, header]);
    }
  };

  //Render Menu is sections are closed
  useEffect(() => {
    selectedHeader.length <= 0 ? setIsOpen(true) : setIsOpen(false);
  }, [selectedHeader]);

  const renderHeader = ({ section }) => {
    const theHeader =
      selectedHeader.find((header) => header.id === section.id) ||
      isOpen === true;
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
              backgroundColor: theme.colors.secondaryContainer,
            },
          ]}
        >
          <Text style={{ fontWeight: 'bold' }}>{section.title}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };

  const renderItem = ({ item }) => {
    const theItem =
      selectedHeader.find((items) => items.id === item.menu_id) ||
      isOpen === true;

    return theItem ? (
      <View style={[styles.itemcontainer]}>
        <View>
          <Text>{item.item_title}</Text>
          <Text style={{ fontStyle: 'italic' }}>${item.price}</Text>
        </View>
        <Image source={item.image} style={{ width: 100, height: 50 }} />
      </View>
    ) : null;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <MenuHeaders onSelectHeader={handleHeaderSelection} />
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
  },
  itemcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
