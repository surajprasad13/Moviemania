import React, {useRef} from 'react';
import {Text, Linking} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
//import messaging from '@react-native-firebase/messaging';

//screens
import Splash from '../screens/Splash';
import Welcome from '../screens/Welcome';
import MainNavigator from './MainNavigator';
import {Loading} from '../components';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const linking = {
    prefixes: ['moviemania://', 'https://moviemania-4e83c.web.app'],
    config: {
      screens: {
        Splash: 'splash',
        Welcome: 'welcome',
        Main: {
          path: 'main',
          screens: {
            HomeStack: {
              screens: {
                Detail: 'detail/:id',
              },
            },
            Discover: {
              path: 'discover',
              screens: {
                Detail: 'detail/:id',
              },
            },
            Cast: 'casts',
            Settings: {
              path: 'setting',
              screens: {
                Account: 'account',
              },
            },
          },
        },
      },
    },

    // async getInitialURL() {
    //   const url = await Linking.getInitialURL();

    //   if (url != null) {
    //     console.log('initial url-----------', url);
    //     return url;
    //   }
    //   const message = await messaging().getInitialNotification();

    //   return message?.data?.link;
    // },
    // subscribe(listener) {
    //   const onReceiveURL = (url) => listener(url);

    //   Linking.addEventListener('url', onReceiveURL);

    //   const unsubscribeNotification = messaging().onNotificationOpenedApp(
    //     (message) => {
    //       console.log('On notification opened app in running');
    //       const url = message?.data?.link;
    //       if (url) {
    //         console.log(listener(url), '------------------------------');
    //         listener(url);
    //       }
    //     },
    //   );
    //   return () => {
    //     Linking.removeEventListener('url', onReceiveURL);
    //     unsubscribeNotification();
    //   };
    // },
  };

  return (
    <NavigationContainer linking={linking} fallback={<Loading />}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Main">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
