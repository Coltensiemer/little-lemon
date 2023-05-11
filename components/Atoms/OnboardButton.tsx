import {
  View,
  Text,
  Button,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


type OnboardButton = {
  label: string; 
  style?: ViewStyle | TextStyle;
  ScreenName: string; 
}

export default function OnboardButton({ label, style, ScreenName }) {
  const navigation = useNavigation();

  

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.buttons, style]}
     
        onPress={() => navigation.navigate(ScreenName)}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </View>
  );
}

type styles = {
  container: ViewStyle;
  buttons: ViewStyle | TextStyle;
  text: ViewStyle | TextStyle;
};

const styles = StyleSheet.create<styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    borderRadius: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 64,
    color: 'red',
  },
  text: {},
});
