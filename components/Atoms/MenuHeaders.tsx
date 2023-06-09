import { useEffect, useState } from 'react';
import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Chip } from 'react-native-paper';

export default function MenuHeaders({ onSelectHeader }) {
  const [isHeaders, setHeaders] = useState<any>();
  const [isSelectedId, setSelectedId] = useState<number[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [checkedState, setCheckedState] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handlePress = (id: any) => {
    if (isSelectedId.includes(id)) {
      setSelectedId((prev) => prev.filter((selectedId) => selectedId != id));
      const selectedHeader = isHeaders.find((header) => header.id === id);
      onSelectHeader(selectedHeader);

      setCheckedState((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
      
    } else {
      const selectedHeader = isHeaders.find((header) => header.id === id);
      setSelectedId((prev) => [...prev, id]);
      onSelectHeader(selectedHeader);
      setCheckedState((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    }
  };

  // useEffect(() =>  {
  //   console.log(isSelectedId)
  // },[handlePress])

  // Using for transforming PostSQL data into an array to store as state
  const transformInfoToArray = (info) => {
    const transformedArray = info.map((item) => {
      return {
        id: item.id,
        title: item.title,
      };
    });
    return transformedArray;
  };

  // Fetching the Menu Headers, transform into an array, and set in state
  const MenuHeaderGet = async () => {
    try {
      const response = await fetch('http://localhost:3100/menu');
      const jsonData = await response.json();
      const transform = transformInfoToArray(jsonData);
      setHeaders(transform);
      setLoading(true);
      // console.log('state:', isHeaders);
    } catch (error) {
      console.log('You have an error when getting the menu header', { error });
    }
  };

  useEffect(() => {
    MenuHeaderGet();
  }, []);


  // WHAT IS RENDERED
  return (
    <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
      {isLoading === true ? (
        isHeaders.map((header) => (
          <View
            key={header.id}
            style={{
              backgroundColor: isSelectedId.includes(header.id) ? 'gray' : null,
            }}
          >
            <TouchableOpacity onPress={() => handlePress(header.id)}>
              <Chip
                mode={checkedState[header.id] ? 'flat' : 'outlined'}
           
              >
                {header.title}
              </Chip>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
