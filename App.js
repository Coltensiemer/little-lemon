
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Page/HomeScreen';
import FirstName from './components/Atoms/FirstName';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FirstName'>
        <Stack.Screen name="Home" component={HomeScreen} options={{title:"Home"}} />
        <Stack.Screen name="FirstName" component={FirstName} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;