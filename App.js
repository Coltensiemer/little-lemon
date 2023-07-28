import * as React  from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
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
import UserSignUp from './components/Organisms/UserSignUp'; 
import UserSignIn from './components/Organisms/UserSignIn';


import { AuthProvider, AuthContext } from './context/AuthContext';
//Navigation



function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator();
  return (

 
    <HomeStack.Navigator>
      <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
      <HomeStack.Screen name='Reservations' component={ReservationPage} />
      <HomeStack.Screen name='UserSignUp' component={UserSignUp} /> 
      <HomeStack.Screen name='UserSignIn' component={UserSignIn} /> 
    </HomeStack.Navigator>
   

  );
}

function signIN() { 
  console.log('signed in')
}
// User does not have token
function AuthStack() { 
  const Tab = createBottomTabNavigator();
  return ( 
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Home' component={HomeStackScreen} />
      <Tab.Screen name="Sign In" component={UserSignIn} />
  </Tab.Navigator>
  )
}


// If User has Token
function AppStack() { 
  const Tab = createBottomTabNavigator();
  return ( 
    <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name='Home' component={HomeStackScreen} />
    <Tab.Screen name='Menu' component={Menulist} /> 
    <Tab.Screen name='Reservation' component={ReservationPage} /> 
    <Tab.Screen name='Profile' component={Profile} />
  </Tab.Navigator>
  )

}

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    primary: '#004478',
    onPrimary: '#ffffff',
    primaryContainer: '#9ddfff',
    onPrimaryContainer: '#001625',
    secondary: '#3f506b',
    onSecondary: '#ffffff',
    secondaryContainer: '#bbd4f5',
    onSecondaryContainer: '#041a24',
    tertiary: '#47654a',
    onTertiary: '#ffffff',
    tertiaryContainer: '#c4ebcc',
    onTertiaryContainer: '#092107',
    error: 'red',
    onError: '#ffffff',
    errorContainer: '#d6adff',
    onErrorContainer: '#000241',
    background: '#fffbff',
    onBackground: '#161b1e',
    surface: '#fffbff',
    onSurface: '#161b1e',
    surfaceVariant: '#cfede1',
    onSurfaceVariant: '#39464d',
    outline: '#67767f',
    outlineVariant: 'rgb(180, 197, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(42, 189, 248)',
    inverseOnSurface: 'rgb(231, 239, 248)',
    inversePrimary: 'rgb(42, 189, 248)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(242, 243, 248)',
      level2: 'rgb(235, 238, 244)',
      level3: 'rgb(227, 233, 240)',
      level4: 'rgb(224, 232, 239)',
      level5: 'rgb(219, 228, 236)',
    },
    surfaceDisabled: 'rgba(22, 27, 30, 0.12)',
    onSurfaceDisabled: 'rgba(38, 27, 30, 0.38)',
    backdrop: 'rgba(36, 48, 54, 0.4)',
  },
};



export default function App() {


  const {isLoading, isToken} = React.useContext(AuthContext)

 

  return (
 <AuthProvider>
    <NavigationContainer>
     <PaperProvider theme={theme}>
  {isToken !== null ? <AppStack /> : <AuthStack />}
      </PaperProvider>
    </NavigationContainer>
    </AuthProvider>

  );
}

