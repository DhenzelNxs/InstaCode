import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';
import Splash from './screens/Splash';
import { colors } from './GlobalStyle/Style';

const Stack = createStackNavigator();

function LoginOrProfileRoute() {
  return (
    <Stack.Navigator 
    detachInactiveScreens={false}
    initialRouteName='Login' 
    screenOptions={{
      headerStyle:{
        backgroundColor: colors.backgroundHeaderColor
        },
        headerTintColor: colors.loadingColor
        }}>
      <Stack.Screen {...MenuRoutes.Login} />
      <Stack.Screen {...MenuRoutes.Profile}/>
      <Stack.Screen {...MenuRoutes.Register} />
    </Stack.Navigator>
  );
}

function SplashToRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        detachInactiveScreens={false}
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Stack.Screen {...MenuRoutes.Splash} />
        <Stack.Screen name="Routes" component={Routes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MenuRoutes = {
  Feed: {
    id: Math.random(),
    name: 'Feed',
    component: Feed,
    options: {
      title: 'Feed',
      tabBarIcon: ({color}) => <Icon name="home" size={30} color={color} />,
      tabBarActiveTintColor: '#19F28B'
    },
  },
  Add: {
    id: Math.random(),
    name: 'AddPhoto',
    component: AddPhoto,
    options: {
      title: 'Add Picture',
      tabBarIcon: ({color}) => <Icon name="plus-square" size={25} color={color} />,
      tabBarActiveTintColor: '#19F28B'
    },
  },
  Profile: {
    id: Math.random(),
    name: 'Profile',
    component: Profile,
    options: {
      title: 'Profile',
      tabBarIcon: ({color}) => <Icon name="user" size={25} color={color} />,
      headerShown: false,
      tabBarActiveTintColor: '#19F28B',
    },
  },
  Login: {
    id: Math.random(),
    name: 'Auth',
    component: Login,
    options: {
      title: 'Login',
      tabBarIcon: ({color}) => <Icon name="user" size={25} color={color} />,
      headerShown: false,
      tabBarActiveTintColor: '#19F28B'
    },
  },
  Register: {
    id: Math.random(),
    name: 'Register',
    component: Register,
    options: {
      title: 'Registrar',
      tabBarIcon: ({color}) => <Icon name="user" size={25} color={color} />,
      tabBarActiveTintColor: '#19F28B'
    },
  },
  Splash: {
    id: Math.random(),
    name: 'Splash',
    component: Splash,
  },
};

const MenuConfig = {
  initialRouteName: 'Feed',
  screenOptions: {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle:{
      backgroundColor: colors.backgroundHeaderColor
    }
  },
};

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <Tab.Navigator {...MenuConfig} detachInactiveScreens={false}>
      <Tab.Screen {...MenuRoutes.Feed} />
      <Tab.Screen {...MenuRoutes.Add} />
      <Tab.Screen
        name="loginorprofile"
        component={LoginOrProfileRoute}
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => <Icon name="user" size={25} color={color} />,
          tabBarActiveTintColor: '#19F28B'
        }}
      />
    </Tab.Navigator>
  );
}

export default SplashToRoutes;
