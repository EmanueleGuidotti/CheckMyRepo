import {AppRegistry} from 'react-native';
import WrappedApp from './WrappedApp'; // Wrapper
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => WrappedApp);