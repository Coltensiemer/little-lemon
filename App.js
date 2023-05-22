import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Organisms/HomeScreen';
import SignUpFirstName from './components/Organisms/SignUpFirstName';
import SignUpEmail from './components/Organisms/SignUpEmail';
import Menulist from './components/Organisms/Menulist';
import ReservationPage from './components/Organisms/ReservationPage';

const Stack = createNativeStackNavigator( );

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'My home',
            headerStyle: {
              backgroundColor: 'yellow',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name='Email' component={SignUpEmail} /> 
        <Stack.Screen name='FirstName' component={SignUpFirstName} /> 
        <Stack.Screen name='Menulist' component={Menulist} /> 
        <Stack.Screen name='ReservationPage' component={ReservationPage} /> 
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
