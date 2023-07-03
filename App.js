import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import HomeScreen from './components/Organisms/HomeScreen';
import SignUpFirstName from './components/Organisms/SignUpFirstName';
import SignUpEmail from './components/Organisms/SignUpEmail';
import Menulist from './components/Organisms/Menulist/Menulist';
import ReservationPage from './components/Organisms/ReservationPage';
import Profile from './components/Organisms/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Navigation



function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator();
  return (

    <HomeStack.Navigator>
      <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
      <HomeStack.Screen name='Reservations' component={ReservationPage} />
    </HomeStack.Navigator>

  );
}

const theme = {
  ...DefaultTheme,
  myOwnPropert: true,
  colors: {
    primary: '#785a00',
    onPrimary: '#ffffff',
    primaryContainer: '#ffdf9d',
    onPrimaryContainer: '#251a00',
    secondary: '#6b5d3f',
    onSecondary: '#ffffff',
    secondaryContainer: '#f5e0bb',
    onSecondaryContainer: '#241a04',
    tertiary: '#4a6547',
    onTertiary: '#ffffff',
    tertiaryContainer: '#ccebc4',
    onTertiaryContainer: '#072109',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    background: '#fffbff',
    onBackground: '#1e1b16',
    surface: '#fffbff',
    onSurface: '#1e1b16',
    surfaceVariant: '#ede1cf',
    onSurfaceVariant: '#4d4639',
    outline: '#7f7667',
    outlineVariant: 'rgb(208, 197, 180)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(52, 48, 42)',
    inverseOnSurface: 'rgb(248, 239, 231)',
    inversePrimary: 'rgb(248, 189, 42)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(248, 243, 242)',
      level2: 'rgb(244, 238, 235)',
      level3: 'rgb(240, 233, 227)',
      level4: 'rgb(239, 232, 224)',
      level5: 'rgb(236, 228, 219)',
    },
    surfaceDisabled: 'rgba(30, 27, 22, 0.12)',
    onSurfaceDisabled: 'rgba(30, 27, 22, 0.38)',
    backdrop: 'rgba(54, 48, 36, 0.4)',
  },
};



export default function App() {
  const Tab = createBottomTabNavigator();

  return (

    <NavigationContainer>
     <PaperProvider theme={theme}>
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen name='Home' component={HomeStackScreen} />
        <Tab.Screen name='Menu' component={Menulist} /> 
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>

  );
}

