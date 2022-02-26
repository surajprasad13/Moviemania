import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {fetchTrending} from '../redux/actions/movieAction';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const IMAGE_SIZE = 80;
const SPACING = 10;

import {poster} from '../constants';
import {Loading} from '../components';

const Trending = ({trending, fetchTrending}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef();
  const downRef = useRef();

  useEffect(() => {
    fetchTrending();
  }, []);

  if (trending.length === 0) {
    return <Loading />;
  }

  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      downRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    }
  };

  return (
    <View>
      <FlatList
        ref={topRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / width),
          );
        }}
        data={trending}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: poster + item.backdrop_path}}
                resizeMode="cover"
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={downRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trending}
        keyExtractor={(_, index) => index.toString()}
        style={{position: 'absolute', bottom: IMAGE_SIZE}}
        contentContainerStyle={{paddingHorizontal: SPACING}}
        renderItem={({item, index}) => {
          return (
            <View>
              <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
                <Image
                  source={{uri: poster + item.poster_path}}
                  resizeMode="contain"
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 12,
                    marginRight: SPACING,
                    borderWidth: 2,
                    borderColor: activeIndex === index ? '#fff' : 'transparent',
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  trending: state.movie.trending,
});

export default connect(mapStateToProps, {fetchTrending})(Trending);
