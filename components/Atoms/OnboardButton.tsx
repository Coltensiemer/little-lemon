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


export default function OnboardButton({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
      style={styles.buttons}
       onPress={() => { 
        navigation.navigate("FirstName")
      }}>
        <Text>Get Started </Text> 
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
    backgroundColor: 'yellow',
    fontSize: 64,
    color: 'red',
  },
});
