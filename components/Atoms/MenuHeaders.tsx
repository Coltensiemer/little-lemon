import { useEffect, useState } from 'react';
import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import * as SQLite from 'expo-sqlite';



export default function MenuHeaders() {
  const [isHeaders, setHeaders] = useState<any>();
  const [isHeadersStoreage, setHeadersStorage] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false);


  function openDatabase() {
    if (Platform.OS === 'web') {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase('db.db');
    return db;
  }
  const db = openDatabase();

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
      console.log('state:', isHeaders);
    } catch (error) {
      console.log('You have an error when getting the menu header', { error });
    }
  };

  const createTable = (para: any) => {
      if (para.length <= 0) {
        db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS menuheader (id INTEGER PRIMARY KEY NOT NULL, title TEXT);'
          );
  
          tx.executeSql('DELETE FROM menuheader;'); // Deletes all records from the table
  
          // isHeaders.forEach((header) => {
          //   tx.executeSql('INSERT INTO menuheader (id, title) VALUES (?, ?)', [
          //     header.id,
          //     header.title,
          //   ]);
          // });
        });
      }
      else { 
        return null
      }

    // return null; // Default return statement outside the useEffect hook
  };

  useEffect(() => {
    MenuHeaderGet();
    // createTable(isHeaders)
  }, []);



  // WHAT IS RENDERED
  return (
    <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
      {isLoading === true ? (
        isHeaders.map((header) => (
          <View key={header.id}>
            <Text style={{ padding: 10 }}>{header.title}</Text>
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
