import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import { Home, Search, Settings, About } from './screens';
import { LoadScreen } from './components';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadScreen/>} persistor={persistor}>
        <NavigationContainer>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.25)"
            translucent={true}
            barStyle="light-content"
          />
          <Stack.Navigator
            initialRouteName={"Home"}
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'vertical',
              animation: 'fade_from_bottom',
              presentation: 'card',
              orientation: 'portrait',
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="Search"
              component={Search}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
            />
            <Stack.Screen
              name="About"
              component={About}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App;