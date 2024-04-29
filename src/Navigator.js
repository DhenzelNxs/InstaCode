import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';

const MenuRoutes = {
  Feed: {
    name: 'Feed',
    component: Feed,
    options: {
      title: 'Feed',
      tabBarIcon: ({color}) => <Icon name="home" size={30} color={color} />,
    },
  },
  Add: {
    name: 'AddPhoto',
    component: AddPhoto,
    options: {
      title: 'Add Picture',
      tabBarIcon: ({color}) => <Icon name="camera" size={25} color={color} />,
    },
  },
  Profile: {
    name: 'Profile',
    component: Feed,
    options: {
      title: 'Profile',
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
      <Tab.Navigator {...MenuConfig}>
        <Tab.Screen {...MenuRoutes.Feed} />
        <Tab.Screen {...MenuRoutes.Add} />
        <Tab.Screen {...MenuRoutes.Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
