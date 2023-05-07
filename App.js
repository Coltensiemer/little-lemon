import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OnboardButton from './components/Templates/Organisms/Molecules/Atoms/OnboardButton';

export default function App() {
  return (
    <View style={styles.container}>
      <OnboardButton /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
