import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {font} from '../constants';
import getColorTheme from '../helpers/Theme';

const Title = ({children, navigation}) => {
  const theme = getColorTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {color: theme.colors.text, fontFamily: font.obold},
        ]}>
        {children}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate(children)}>
        <Text style={{color: theme.colors.text, fontFamily: font.italic}}>
          See All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default Title;
