import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Share,
} from 'react-native';

import {AirbnbRating, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {font, poster} from '../constants';
import {Card, Card3, Loading} from '../components';
import FastImage from 'react-native-fast-image';
import {WebView} from 'react-native-webview';
import {
  fetchCast,
  fetchDetail,
  fetchImages,
  fetchRecommend,
  fetchComments,
  fetchVideo,
} from '../redux/actions/movieInfoAction';
import getColorTheme from '../helpers/Theme';

import {ShareApi} from 'react-native-fbsdk';

import {CommonActions} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const MovieDetail = ({
  navigation,
  route,
  detail,
  cast,
  images,
  recommend,
  comments,
  video,
  fetchDetail,
  fetchCast,
  fetchRecommend,
  fetchComments,
  fetchVideo,
}) => {
  const theme = getColorTheme();
  const {id} = route.params;
  // console.log('movie id.....  ', id);
  useEffect(() => {
    fetchDetail(id);
    fetchCast(id);
    fetchImages(id);
    fetchRecommend(id);
    fetchComments(id);
    fetchVideo(id);
  }, []);

  const {title, backdrop_path, overview, genres, vote_average, vote_count} =
    detail;

  if (detail.length === 0) {
    return <Loading />;
  }

  const goBack = () => {
    navigation.dispatch((state) => {
      const routes = state.routes;
      return CommonActions.reset({
        index: 1,
        routes,
        ...CommonActions.goBack(),
      });
    });
  };

  return (
    <ScrollView
      nestedScrollEnabled
      scrollEventThrottle={1}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: theme.colors.background,
      }}>
      <FastImage
        source={{uri: poster + backdrop_path}}
        onLoadStart={() => <ActivityIndicator size="large" color="red" />}
        resizeMode="cover"
        style={{
          width,
          height: 250,
          borderRadius: 5,
        }}
      />
      <TouchableOpacity
        onPress={goBack}
        style={{
          backgroundColor: '#f3f3f3',
          marginLeft: 10,
          width: 30,
          height: 30,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 15,
          left: 10,
        }}>
        <Icon name="left" type="antdesign" size={20} />
      </TouchableOpacity>
      <View style={styles.section}>
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.text,
            fontFamily: font.obold,
          }}>
          {title}
        </Text>
        <View style={styles.section}>
          <Icon name="fire" type="fontisto" color="orange" />
          <Text
            style={{
              color: theme.colors.text,
              fontFamily: font.obold,
              marginLeft: 10,
            }}>
            Attention {vote_count}
          </Text>
        </View>
        <Icon name="share" type="font-awesome" color={theme.colors.text} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {genres.map(({name}, index) => (
          <View
            key={index}
            style={{
              margin: 10,
              backgroundColor: 'lightpink',
              padding: 7,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: theme.colors.text,
                fontFamily: font.obold,
              }}>
              {name}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
        }}>
        <AirbnbRating
          count={5}
          showRating={false}
          defaultRating={vote_average / 2}
          size={30}
        />
        <Text style={{fontSize: 25, fontFamily: font.obold, color: 'orange'}}>
          {vote_average}
        </Text>
      </View>
      <FlatList
        scrollEventThrottle={1}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <>
              <Text
                style={{color: theme.colors.text, fontFamily: font.regular}}>
                {item.backdrops.length}
              </Text>
              <FastImage
                source={{uri: poster + item.file_path}}
                style={{width: 100, height: 200}}
              />
            </>
          );
        }}
      />
      <FlatList
        data={cast}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          if (!item.profile_path) {
            return;
          }
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Castdetail', {id: item.id})}>
              <FastImage
                source={{uri: poster + item.profile_path}}
                resizeMode="contain"
                style={{
                  width: 110,
                  height: 160,
                  margin: 10,
                  borderRadius: 15,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />

      <View style={{padding: 10}}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: font.bold,
            color: theme.colors.text,
          }}>
          Movie introduction
        </Text>
        <Text style={{color: theme.colors.text, fontFamily: font.italic}}>
          {overview}
        </Text>
      </View>
      <View style={{padding: 10}}>
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.text,
            fontFamily: font.bold,
          }}>
          Recommendation
        </Text>
        <FlatList
          horizontal
          keyExtractor={(_, index) => index.toString()}
          data={recommend}
          renderItem={({item, index}) => (
            <Card item={item} key={index} navigation={navigation} />
          )}
        />
      </View>
      <View style={{padding: 10}}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 20,
            fontFamily: font.bold,
          }}>
          Trailers
        </Text>
        <FlatList
          horizontal
          pagingEnabled
          data={video}
          contentContainerStyle={{height: 200}}
          ListEmptyComponent={
            <Text style={{fontSize: 25, color: 'red'}}>Empty</Text>
          }
          renderItem={({item}) => {
            return (
              <View style={{flex: 1, width}}>
                <WebView
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{
                    uri: 'https://www.youtube.com/embed/' + item.key,
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={{padding: 10}}>
        <Text
          style={{
            color: theme.colors.text,
            fontFamily: font.bold,
            fontSize: 20,
          }}>
          Comments
        </Text>
        <FlatList
          data={comments}
          renderItem={({item, index}) => {
            return <Card3 item={item} key={index} />;
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 100,
    left: 100,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = (state) => ({
  detail: state.detail.detail,
  cast: state.detail.cast,
  images: state.detail.images,
  recommend: state.detail.recommend,
  comments: state.detail.comments,
  video: state.detail.video,
});

export default connect(mapStateToProps, {
  fetchDetail,
  fetchCast,
  fetchImages,
  fetchRecommend,
  fetchComments,
  fetchVideo,
})(MovieDetail);
