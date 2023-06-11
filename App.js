import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import HomeScreen from './components/Organisms/HomeScreen';
import SignUpFirstName from './components/Organisms/SignUpFirstName';
import SignUpEmail from './components/Organisms/SignUpEmail';
import Menulist from './components/Organisms/Menulist';
import ReservationPage from './components/Organisms/ReservationPage';
import Profile from './components/Organisms/Profile';
import { en, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en', en)

const Stack = createNativeStackNavigator( );


// Refer to React Paper to Theme APP
// const theme = { 
//   ...DefaultTheme,
//   myOwnPropert: true, 
//   colors: { 
//     myOwnColor: 'red', 
//   }
// }

function App() {
  return (
    <PaperProvider>
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
        <Stack.Screen name='Profile' component={Profile} /> 
        
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
