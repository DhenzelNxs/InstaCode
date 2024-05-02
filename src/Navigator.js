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

const Stack = createStackNavigator();

function LoginOrProfileRoute() {
  return (
    <Stack.Navigator detachInactiveScreens={false} initialRouteName="Auth">
      <Stack.Screen {...MenuRoutes.Profile} />
      <Stack.Screen {...MenuRoutes.Login} />
      <Stack.Screen {...MenuRoutes.Register} />
    </Stack.Navigator>
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
    },
  },
  Add: {
    id: Math.random(),
    name: 'AddPhoto',
    component: AddPhoto,
    options: {
      title: 'Add Picture',
      tabBarIcon: ({color}) => <Icon name="camera" size={25} color={color} />,
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
    },
  },
  Register: {
    id: Math.random(),
    name: 'Register',
    component: Register,
    options: {
      title: 'Register',
      tabBarIcon: ({color}) => <Icon name="user" size={25} color={color} />,
    },
  },
};

const MenuConfig = {
  initialRouteName: 'Feed',
  screenOptions: {
    headerShown: false,
    tabBarShowLabel: false,
  },
};

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator {...MenuConfig} detachInactiveScreens={false}>
        <Tab.Screen {...MenuRoutes.Feed} />
        <Tab.Screen {...MenuRoutes.Add} />
        <Tab.Screen
          name="loginorprofile"
          component={LoginOrProfileRoute}
          options={{
            title: 'Profile',
            tabBarIcon: ({color}) => (
              <Icon name="user" size={25} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
