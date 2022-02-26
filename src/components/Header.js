import React from 'react';
import {StyleSheet, View, Text, TextInput, Dimensions} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import getColorTheme from '../helpers/Theme';

const {width} = Dimensions.get('window');

const Header = ({navigation}) => {
  const theme = getColorTheme();

  return (
    <View style={{backgroundColor: theme.colors.background}}>
      <View style={{margin: 10}}>
        <Text style={{color: theme.colors.text}}>
          What movie are you looking
        </Text>
        <Text style={{fontWeight: 'bold', color: theme.colors.text}}>
          forward to seeing ?
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View
          style={{
            borderRadius: 10,
            width: width * 0.7,
            backgroundColor: '#f2f2f2',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="search" type="evilicon" />
          <TextInput
            placeholder="Search"
            style={{width: '90%'}}
            onFocus={() => navigation.navigate('Search')}
          />
        </View>
        <Button
          title="+33"
          buttonStyle={{backgroundColor: 'red'}}
          titleStyle={{color: 'white'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Header;
