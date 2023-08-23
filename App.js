import * as React from 'react';
import { View, Text, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  useTheme
} from 'react-native-paper';
import HomeScreen from './components/Organisms/HomeScreen';
import Menulist from './components/Organisms/Menulist/Menulist';
import ReservationPage from './components/Organisms/ReservationPage';
import Profile from './components/Organisms/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserSignUp from './components/Organisms/UserSignUp';
import UserSignIn from './components/Organisms/UserSignIn';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Reservations from './components/Molecules/Reservations';
import {
  HomeIcon,
  MenuIcon,
  ReservationIcon,
  SettingsIcon,
} from './components/Atoms/Icons';
import Header from './components/Atoms/Header';



//Themes
const lightModeTheme = {
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
    blue: 'blue',
  },
};
const darkModeTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  dark: true, // Indicate that this is a dark mode theme
  colors: {
    primary: '#1763b3', // Adjusted primary color for dark mode
    onPrimary: '#ffffff',
    primaryContainer: '#325a6e',
    onPrimaryContainer: '#ffffff',
    secondary: '#4f638e', // Adjusted secondary color for dark mode
    onSecondary: '#ffffff',
    secondaryContainer: '#738fa5',
    onSecondaryContainer: '#ffffff',
    tertiary: '#5f7d63', // Adjusted tertiary color for dark mode
    onTertiary: '#ffffff',
    tertiaryContainer: '#89a581',
    onTertiaryContainer: '#ffffff',
    error: 'red',
    onError: '#ffffff',
    errorContainer: '#a33c3c',
    onErrorContainer: '#ffffff',
    background: '#161b1e', // Adjusted background color for dark mode
    onBackground: '#ffffff',
    surface: '#1e2427', // Adjusted surface color for dark mode
    onSurface: '#ffffff',
    surfaceVariant: '#39464d',
    onSurfaceVariant: '#ffffff',
    outline: '#67767f',
    outlineVariant: 'rgb(180, 197, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(42, 189, 248)',
    inverseOnSurface: 'rgb(231, 239, 248)',
    inversePrimary: 'rgb(42, 189, 248)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(22, 27, 30)',
      level2: 'rgb(29, 35, 39)',
      level3: 'rgb(36, 42, 46)',
      level4: 'rgb(40, 47, 51)',
      level5: 'rgb(45, 52, 56)',
    },
    surfaceDisabled: 'rgba(255, 255, 255, 0.12)',
    onSurfaceDisabled: 'rgba(255, 255, 255, 0.38)',
    backdrop: 'rgba(0, 0, 0, 0.4)',
    blue: 'blue',
  },
};





//Navigation
function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
      <HomeStack.Screen name='Reservations' component={ReservationPage} />
      <HomeStack.Screen name='UserSignUp' component={UserSignUp} />
      <HomeStack.Screen name='UserSignIn' component={UserSignIn} />
      <HomeStack.Screen name='ReservationComponent' component={Reservations} />
      <HomeStack.Screen name='Reservation' component={ReservationPage} />
    </HomeStack.Navigator>
  );
}

// If User has Token or DOES NOT have TOKEN
function AppStack() {
  const Tab = createBottomTabNavigator();
  const { isLoading, isToken } = React.useContext(AuthContext);
  const theme = useTheme()
  return isToken != null ? (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.onSecondary,
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.backdrop,
        tabBarItemStyle: { borderTopColor: theme.colors.secondary, borderWidth: 2}
      
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <HomeIcon
                color={focused ? theme.colors.blue : theme.colors.primary}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Menu'
        component={Menulist}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MenuIcon
                color={focused ? theme.colors.blue : theme.colors.primary}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Reservation'
        component={ReservationPage}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <ReservationIcon
                color={focused ? theme.colors.blue : theme.colors.primary}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <SettingsIcon
                color={focused ? theme.colors.blue : theme.colors.primary}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.onSecondary,
        tabBarInactiveTintColor: theme.colors.onSecondary,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarItemStyle: { borderTopColor: theme.colors.secondary, borderWidth: 2,}
      
      
      }}
    >
      <Tab.Screen name='Sign In' component={UserSignIn} />
    </Tab.Navigator>
  );
}

// const useThemeUpdate = ({childern}) =>  { 
//   const { isLoading, isToken, UserSettings } = React.useContext(AuthContext);

//   //Allows to read if darkmode is set for safe
//   const darkModeIndicator = UserSettings?.darkmode ?? false;

//   console.log('dark', UserSettings,)
  
//   const [darkMode, setDarkMode] = React.useState(darkModeIndicator)

//   const switchTheme = darkMode ? darkModeTheme : lightModeTheme;  

//   return ( 
//     <ThemeContext.Provider value={switchTheme}>
//       {childern}
//     </ThemeContext.Provider>
//   )

// }

// function updateTheme() { 
//     const {  UserSettings, isLoading } = React.useContext(AuthContext);


//     // React.useEffect(() => { 
//     //   if (!isLoading) { 
//     //     const calculateTheme = updateTheme()
//     //   }
//     // }, [isLoading])


//   const darkModeIndicator = UserSettings?.darkmode ?? false;

//   console.log('settings', UserSettings)
//  const [darkMode, setDarkMode] = React.useState(darkModeIndicator)
//   const switchTheme = darkMode ? darkModeTheme :  lightModeTheme  
   
//  return switchTheme; 
// }





export default function App() {
  const Stack = createNativeStackNavigator();

// const theme = updateTheme()

  return (
    <AuthProvider>
    <PaperProvider theme={lightModeTheme}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
      headerShown: true,
    headerTitle: (prop) => <Header {...prop} />}
      } >
        <Stack.Screen
          name='AppStacks'
          component={AppStack}
          
        />
        <Stack.Screen name='Sign In' component={UserSignIn} />
        <Stack.Screen name='Sign Up' component={UserSignUp} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Reservation' component={ReservationPage} />
        <Stack.Screen
          name='ReservationComponent'
          component={Reservations}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
    </AuthProvider>
    
  );
}
