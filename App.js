import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './store/store';
import { Provider } from 'react-redux';

import { COLORS } from './constants/theme';

import { Home, Search } from './screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          backgroundColor="rgba(0,0,0,0.25)"
          translucent={true}
          barStyle="light-content"
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            backgroundColor: "f4511e",
          }}
          initialRouteName={"Home"}
        >
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Search"
            component={Search}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;