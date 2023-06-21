import { useEffect, useState } from 'react';
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native';

export default function MenuHeaders() {
  const [isHeaders, setHeaders] = useState<any>();

  const transformInfoToArray = (info) => {
	const transformedArray = info.map((item) => {
	  return {
		id: item.id,
		title: item.title,
	  };
	});
	return transformedArray;
  };

  const MenuHeaderGet = async () => {
    try {
      const response = await fetch('http://localhost:3100/menu');
      const jsonData = await response.json();
	  const transform = transformInfoToArray(jsonData)
      setHeaders(transform);
      console.log('menu headers', isHeaders);
    } catch (error) {
      console.log('You have an error when getting the menu header', { error });
    }
  };

  useEffect(() => {
    MenuHeaderGet();
    console.log(isHeaders);
  }, []);

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
      {isHeaders.map((header) => (
        <View key={header.id}>
          <Text>{header.title}</Text>
        </View>
      ))}
    </View>
  );
}
