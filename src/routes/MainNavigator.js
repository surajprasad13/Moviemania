import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//screens
import Home from '../screens/Home';
import Search from '../screens/Search';
import Cast from '../screens/Cast';
import Tv from '../screens/tv/Tv';
import Settings from '../screens/settings/Settings';

const Bottom = createBottomTabNavigator();

import {MyTabBar} from '../components';
import MovieDetail from '../screens/MovieDetail';

const Stack = createStackNavigator();

import Genre from '../screens/genre/Genre';
import Trending from '../screens/Trending';
import Upcoming from '../screens/Upcoming';
import Toprated from '../screens/Toprated';
import CastDetail from '../screens/CastDetail';
import TvDetail from '../screens/tv/TvDetail';
import Login from '../screens/Login';
import Account from '../screens/account/Account';

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      keyboardHandlingEnabled>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Trending" component={Trending} />
      <Stack.Screen name="Upcoming" component={Upcoming} />
      <Stack.Screen name="Top Rated" component={Toprated} />
      <Stack.Screen name="Detail" component={MovieDetail} options={{}} />
      <Stack.Screen name="Castdetail" component={CastDetail} />
    </Stack.Navigator>
  );
}

function DiscoverStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Discover" component={Genre} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={MovieDetail} />
      <Stack.Screen name="Castdetail" component={CastDetail} />
    </Stack.Navigator>
  );
}

function TvStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tv" component={Tv} />
      <Stack.Screen name="Tvdetail" component={TvDetail} />
    </Stack.Navigator>
  );
}

function SettingStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Setting" component={Settings} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Bottom.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      <Bottom.Screen name="Home" component={HomeStack} />
      <Bottom.Screen name="Discover" component={DiscoverStack} />
      <Bottom.Screen name="Cast" component={TvStack} />
      <Bottom.Screen name="Settings" component={SettingStack} />
    </Bottom.Navigator>
  );
}
