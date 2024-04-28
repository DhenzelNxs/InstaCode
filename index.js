/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Feed from './src/screens/Feed';
import Routes from './src/Navigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Routes);
