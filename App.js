import * as React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Appearance
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  useTheme,
} from 'react-native-paper';
import HomeScreen from './components/Organisms/HomeScreen';
import Menulist from './components/Organisms/Menulist/Menulist';
import ReservationPage from './components/Organisms/ReservationPage';
import Profile from './components/Organisms/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserSignUp from './components/Organisms/UserSignUp';
import UserSignIn from './components/Organisms/UserSignIn';
import {
  AuthProvider,
  AuthContext,
  useAuthContext,
} from './context/AuthContext';
import Reservations from './components/Molecules/Reservations';
import {
  HomeIcon,
  MenuIcon,
  ReservationIcon,
  SettingsIcon,
} from './components/Atoms/Icons';
import Header from './components/Atoms/Header';
import { lightModeTheme, darkModeTheme } from './assets/Themes/themes';
import { G } from 'react-native-svg';


//Navigation
function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
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
  const { istoken } = React.useContext(AuthContext);
  const theme = useTheme();
  return istoken != null ? (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.onSecondary,
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.backdrop,
        tabBarItemStyle: {
          borderTopColor: theme.colors.secondary,
          borderWidth: 2,
        },
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
        tabBarItemStyle: {
          borderTopColor: theme.colors.secondary,
          borderWidth: 2,
        },
      }}
    >
      <Tab.Screen name='Sign In' component={UserSignIn} />
    </Tab.Navigator>
  );
}

function App() {
  const Stack = createNativeStackNavigator();

  const colorScheme = Appearance.getColorScheme();

  const colorPref = colorScheme === 'dark' ? false : true

  const { isUserData } = useAuthContext();
  
  return (
    <PaperProvider
      theme={ isUserData?.isUserData?.dark_mode || colorPref ? darkModeTheme : lightModeTheme}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerTitle: (prop) => <Header {...prop} />,
          }}
        >
          <Stack.Screen name='AppStacks' component={AppStack} />
          <Stack.Screen name='Sign In' component={UserSignIn} />
          <Stack.Screen name='Sign Up' component={UserSignUp} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Reservation' component={ReservationPage} />
          <Stack.Screen name='ReservationComponent' component={Reservations} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// wraps the app.js
export default function AppWrapper() {
  return (
    <AuthProvider>
      <App></App>
    </AuthProvider>
  );
}
