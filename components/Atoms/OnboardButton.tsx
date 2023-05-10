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


export default function OnboardButton({ navigation, label, style }) {
  return (
    <View style={styles.container}>
      <Pressable
      style={[styles.buttons, style]}
       onPress={() => { 
        navigation.navigate("FirstName") 
        }}>
        <Text>{label}</Text> 
      </Pressable>
    </View>
  );
}

type styles = {
  container: ViewStyle;
  buttons: ViewStyle | TextStyle;
};

const styles = StyleSheet.create<styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttons: {
    borderRadius:20, 
    height:50, 
    width:300, 
    
    alignSelf:"center",
  
    fontSize: 64,
    color: 'red',
  },
});
