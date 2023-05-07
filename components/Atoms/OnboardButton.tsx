import {
  View,
  Text,
  Button,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';


export default function OnboardButton({ navigation }) {
  return (
    <View style={styles.container}>
      <Button

        // @ts-ignore
        style={styles.buttons}
        title='Get Started'
        accessibilityLabel='Get Started with onboarding'
      />
    </View>
  );
}

type styles = {
  container: ViewStyle;
  buttons: ViewStyle | TextStyle;
};

const styles = StyleSheet.create<styles>({
  container: {
    backgroundColor: 'yellow',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    fontSize: 64,
    color: 'red',
  },
});
