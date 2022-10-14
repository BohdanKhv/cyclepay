/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Notify from './notification';

AppRegistry.registerComponent(appName, () => {
    Notify();
    return App;
});