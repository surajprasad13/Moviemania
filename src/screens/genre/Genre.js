import React, {useEffect} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import All from './All';
import Action from './Action';
import Drama from './Drama';
import Comedy from './Comedy';
import Love from './Love';
import {connect} from 'react-redux';

import {fetchMovielist} from '../../redux/actions/movieAction';
import {Dimensions, Text, View, StyleSheet, TextInput,ActivityIndicator} from 'react-native';

import {Button, Icon} from 'react-native-elements';
import {Header} from '../../components';
import getColorTheme from '../../helpers/Theme';
import {font} from '../../constants';

const Top = createMaterialTopTabNavigator();
const {width} = Dimensions.get('window');

const Genre = ({fetchMovielist, navigation}) => {
  const theme = getColorTheme();

  useEffect(() => {
    fetchMovielist();
  }, []);
  return (
    <>
      <Header navigation={navigation} />
      <Top.Navigator
        swipeEnabled
        tabBarOptions={{
          labelStyle: {fontFamily: font.obold, color: theme.colors.text},
          style: {backgroundColor: theme.colors.background},
          allowFontScaling: true,
          scrollEnabled: true,
          activeTintColor: theme.colors.text,
          indicatorStyle: {backgroundColor: 'red'},
        }}>
        <Top.Screen name="All" component={All} />
        <Top.Screen name="Action" component={Action} />
        <Top.Screen name="Drama" component={Drama} />
        <Top.Screen name="Comedy" component={Comedy} />
        <Top.Screen name="Love" component={Love} />
      </Top.Navigator>
    </>
  );
};

const mapStateToProps = (state) => ({
  movielist: state.movie.movielist,
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default connect(mapStateToProps, {fetchMovielist})(Genre);
