import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Menulist() {
  const [isLoading, setLoading] = useState(false);

  const [isMenu, setMenu] = useState(['']);

  const getMenu = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/littleLemonSimpleMenu.json'
      );
      const JsonData = await response.json();
      console.log(JsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <View>
      <Text>Menulist</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
