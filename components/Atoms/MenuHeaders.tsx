import { useEffect, useState } from 'react';
import { FlatList, SectionList, StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('databaseSQL');

export default function MenuHeaders() {
  const [isHeaders, setHeaders] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false)


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
      setLoading(true)
    } catch (error) {
      console.log('You have an error when getting the menu header', { error });
    }
  };

  useEffect(() => {
    MenuHeaderGet();
    console.log('the MenuHeader Fetch:', isHeaders);
  }, []);

  useEffect(() => { 
    db.transaction((tx) => { 
      tx.executeSql('CREATE TABLE IF NOT EXISTS menuList (id INTEGER PRIMARY KEY NOT NULL, name TEXT);')
    })

    db.transaction((tx) => { 
      tx.executeSql('INSERT INTO menuList (id, name) VALUES (?, ?)', [], (tx, results) =>  {
        isHeaders.forEach((header) => { 
          tx.executeSql('INSERT INTO menuList (id, name) VALUES (?, ?)', [header.id, header.title]);
        })
    })
  })

  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM menuList', [], (tx, result) => {
      const rows = result.rows;
      for (let i = 0; i < rows.length; i++) {
        const item = rows.item(i);
      
        console.log('SQLlite search:', item);
      }
    });
  });

  
}); 

  return (
    <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
    {isLoading === true ? (
      isHeaders.map((header) => (
        <View key={header.id}>
          <Text style={{padding: 10}}>{header.title}</Text>
        </View>
      ))
    ) : (
      <Text>Loading...</Text>
    )}
  </View>
  );
}
