import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Icon, AirbnbRating} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

//components
import {font, poster} from '../constants';
import getColorTheme from '../helpers/Theme';

const {width} = Dimensions.get('window');

const Card2 = ({item, navigation}) => {
  const theme = getColorTheme();

  const {
    id,
    title,
    poster_path,
    overview,
    vote_count,
    release_date,
    vote_average,
  } = item;

  const renderTitle = (title) => {
    if (title.length >= 100) {
      return title.substring(0, 100) + '...';
    }
    return title;
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Detail', {id, vote_count})}>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View>
          {poster_path === null ? (
            <FastImage
              source={require('../assets/images/alt.png')}
              resizeMode="contain"
              style={{
                width: 150,
                height: 200,
                borderRadius: 10,
                backgroundColor: '#66ccff',
              }}
            />
          ) : (
            <FastImage
              source={{uri: poster + poster_path}}
              resizeMode="cover"
              style={{
                width: 150,
                height: 200,
                borderRadius: 10,
                backgroundColor: '#66ccff',
              }}
            />
          )}
        </View>
        <View
          style={{
            width: width * 0.5,
            marginLeft: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{fontSize: 16, fontWeight: '800', color: theme.colors.text}}>
            {title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'justify',
              color: theme.colors.text,
              fontFamily: font.italic,
            }}>
            {renderTitle(overview)}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="fire" type="simple-line-icon" color="orange" />
            <Text style={{color: theme.colors.text, fontFamily: font.oregular}}>
              Attention {vote_count}
            </Text>
          </View>
          <Text style={{color: theme.colors.text, fontFamily: font.oregular}}>
            Release-Date-{release_date}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AirbnbRating
              count={5}
              showRating={false}
              defaultRating={vote_average / 2}
              size={20}
            />
            <Text
              style={{
                color: 'orange',
                fontSize: 22,
                marginLeft: 10,
                fontFamily: font.medium,
              }}>
              {vote_average}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    width: width * 0.95,
    alignContent: 'center',
    marginTop: 15,
  },
});

export default Card2;
