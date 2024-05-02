/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import Routes from './src/Navigator';
import {name as appName} from './app.json';

import storeConfig from './src/store/storeConfig';

const store = storeConfig();
function Redux() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Redux);
