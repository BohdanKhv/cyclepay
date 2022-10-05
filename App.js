import { StatusBar, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

import { COLORS } from './constants/theme';

import { Home, Search } from './screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
        <NavigationContainer>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.25)"
            translucent={true}
            barStyle="light-content"
          />
          <Stack.Navigator
            initialRouteName={"Home"}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{
                headerShown: false,
                // headerShown: true,
                // headerStyle: {
                //   backgroundColor: COLORS.textMain,
                // },
                // headerTintColor: COLORS.white,
                // headerTitleStyle: {
                //   fontWeight: '400',
                // }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App;