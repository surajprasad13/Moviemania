import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import {Card, Card2, Title} from '../../components';

//redux
import {fetchTvPopular, fetchTvToprated} from '../../redux/actions/tvAction';
import {connect, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {poster} from '../../constants';
import {font} from '../../constants';

import getColorTheme from '../../helpers/Theme';
import {SearchBar, Icon} from 'react-native-elements';
import {searchTv} from '../../redux/actions/tvAction';

const Tv = ({
  navigation,
  fetchTvPopular,
  fetchTvToprated,
  popular,
  toprated,
  searchTv,
  search,
}) => {
  const ref = useRef(null);
  const [value, setValue] = useState('');

  const theme = getColorTheme();

  useEffect(() => {
    fetchTvPopular();
    fetchTvToprated();
  }, [searchTv]);

  const onSubmit = (event) => {
    const text = event.nativeEvent.text;
    if (text == '') {
      return;
    } else {
      searchTv(text);
    }
  };

  return (
    <ScrollView
      bounces={false}
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 25,
          fontFamily: font.bold,
          color: theme.colors.text,
        }}>
        Tv
      </Text>
      <SearchBar
        ref={ref}
        round
        showCancel={true}
        placeholder="Search Tv..."
        autoCapitalize="none"
        placeholderTextColor={theme.colors.text}
        containerStyle={{
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.background,
          borderBottomColor: theme.colors.background,
        }}
        inputContainerStyle={{
          backgroundColor: theme.colors.background,
          borderWidth: 1,
          borderBottomWidth: 1,
          borderColor: theme.colors.text,
        }}
        inputStyle={{
          color: theme.colors.text,
        }}
        value={value}
        onChangeText={(text) => setValue(text)}
        onSubmitEditing={onSubmit}
      />
      {value !== '' ? (
        <FlatList
          data={search}
          numColumns={2}
          renderItem={({item}) => {
            if (item.poster_path) {
              return (
                <TouchableOpacity
                  style={{flex: 1, margin: 10}}
                  onPress={() => navigation.navigate('Tvdetail', {item})}>
                  <FastImage
                    source={{uri: poster + item.poster_path}}
                    resizeMode="contain"
                    style={{
                      width: 180,
                      height: 250,
                      borderRadius: 15,
                      flex: 1,
                      alignItems: 'center',
                    }}
                  />
                </TouchableOpacity>
              );
            }
          }}
          ListEmptyComponent={
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: theme.colors.text}}>0 results found</Text>
            </View>
          }
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <>
          <Title navigation={navigation}>Popular</Title>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popular}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Tvdetail', {item})}>
                  <FastImage
                    source={{uri: poster + item.poster_path}}
                    resizeMode="contain"
                    style={{width: 180, height: 250, borderRadius: 15}}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
          <Title navigation={navigation}>Top Rated</Title>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={toprated}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Tvdetail', {item})}>
                  <FastImage
                    source={{uri: poster + item.poster_path}}
                    resizeMode="contain"
                    style={{width: 180, height: 250, borderRadius: 15}}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  popular: state.tv.popular,
  toprated: state.tv.toprated,
  search: state.tv.search,
});

export default connect(mapStateToProps, {
  fetchTvPopular,
  fetchTvToprated,
  searchTv,
})(Tv);
