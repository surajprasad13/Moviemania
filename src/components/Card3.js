import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';

import {font, poster, theme} from '../constants';
import getColorTheme from '../helpers/Theme';

const Card3 = ({item}) => {
  const theme = getColorTheme();

  const {author, author_details, content, created_at} = item;

  const renderContent = (title) => {
    if (title.length > 150) {
      return title.substring(0, 150) + '...';
    }
    return title;
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Avatar
          rounded
          source={{uri: poster + author_details.avatar_path}}
          renderPlaceholderContent={() => (
            <Image
              source={require('../assets/images/alt.png')}
              resizeMode="center"
              style={{
                backgroundColor: theme.colors.secondary,
                width: 30,
                height: 30,
              }}
            />
          )}
        />
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: font.medium,
            marginLeft: 10,
          }}>
          {author}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: font.regular,
            margin: 5,
          }}>
          {renderContent(content)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Card3;
