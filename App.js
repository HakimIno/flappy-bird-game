import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p'
import { Kanit_500Medium, Kanit_700Bold, Kanit_400Regular } from '@expo-google-fonts/kanit'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MenuScreen from './src/screens/MenuScreen';
import { NotificationProvider } from './src/context/NotificationContext';
import LegalScreen from './src/screens/LegalScreen';
// import registerNNPushToken from 'native-notify';

const Stack = createNativeStackNavigator();


const App = () => {
  // registerNNPushToken(22901, 'ZCqNb9xyQiAaMpesX8TAUo');
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
    Kanit_500Medium,
    Kanit_700Bold,
    Kanit_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NotificationProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              name="Game"
              component={GameScreen}
            />
            <Stack.Screen
              name="Menu"
              component={MenuScreen}
            />
            <Stack.Screen
              name='Legal'
              component={LegalScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NotificationProvider>
    </Provider>
  );
};

export default App;
