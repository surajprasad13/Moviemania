import React, {useEffect} from 'react';
import {
  StatusBar,
  Image,
  Animated,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {fetchToprated} from '../redux/actions/movieAction';
import {connect} from 'react-redux';
import {poster} from '../constants';
const {width} = Dimensions.get('screen');

const imageW = width * 0.7;
const imageH = imageW * 1.54;

const Toprated = ({toprated, fetchToprated}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchToprated();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {toprated.map(({poster_path}, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              source={{uri: poster + poster_path}}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  opacity,
                },
              ]}
              blurRadius={5}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={toprated}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View
              style={{width, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: poster + item.poster_path}}
                style={{
                  width: imageW,
                  height: imageH,
                  borderRadius: 16,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  toprated: state.movie.top_rated,
});

export default connect(mapStateToProps, {fetchToprated})(Toprated);
