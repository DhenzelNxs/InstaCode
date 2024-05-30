/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import storeConfig from './src/store/storeConfig';

import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.18.188:5000/api';

const store = storeConfig();
function Redux() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Redux);
