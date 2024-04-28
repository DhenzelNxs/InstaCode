import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from './screens/Feed';
import {Text, View} from 'react-native';

function IconFeed() {
  return <Icon name="home" size={30} color="#000" />;
}
function IconAdd() {
  return <Icon name="camera" size={25} color="#000" />;
}
function IconProfile() {
  return <Icon name="user" size={25} color="#000" />;
}

const MenuRoutes = {
  Feed: {
    name: 'Feed',
    component: Feed,
    options: {
      title: 'Feed',
      tabBarIcon: IconFeed,
    },
  },
  Add: {
    name: 'AddPhoto',
    component: Feed,
    options: {
      title: 'Add Picture',
      tabBarIcon: IconAdd,
    },
  },
  Profile: {
    name: 'Profile',
    component: Feed,
    options: {
      title: 'Profile',
      tabBarIcon: IconProfile,
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
