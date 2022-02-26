import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import {poster} from '../constants';

const Card = ({item, navigation}) => {
  const {poster_path, id, vote_count} = item;
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Detail', {id, vote_count})}>
      <FastImage
        source={{uri: poster + poster_path}}
        resizeMode="contain"
        style={styles.image}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 250,
    borderRadius: 15,
  },
});

export default Card;
