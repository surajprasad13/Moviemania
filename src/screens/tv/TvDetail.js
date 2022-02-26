import React, {useEffect} from 'react';

import {ScrollView, View, Text, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {poster, theme} from '../../constants';

import {font} from '../../constants';

import getColorTheme from '../../helpers/Theme';
import {tvDetail} from '../../redux/actions/tvAction';

const {width, height} = Dimensions.get('screen');

const TvDetail = ({route, tvDetail, detail}) => {
  const {item} = route.params;
  const {
    id,
    backdrop_path,
    first_air_date,
    name,
    popularity,
    poster_path,
    overview,
    vote_count,
  } = item;

  useEffect(() => {
    tvDetail(id);
  }, []);

  // const {
  //   backdrop_path,
  //   genres,
  //   homepage,
  //   number_of_episodes,
  //   number_of_seasons,
  //   seasons,
  //   vote_average,
  //   vote_count,
  // } = detail;

  const RenderDetail = () => (
    <View>
      <Text>Detail {detail.id}</Text>
    </View>
  );

  const theme = getColorTheme();
  return (
    <ScrollView
      bounces={false}
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <FastImage
        source={{uri: poster + poster_path}}
        resizeMode="cover"
        style={{height: 250, borderRadius: 10}}
      />
      <Text>Tv Detail</Text>
      <Text>{name}</Text>
      <Text style={{fontFamily: font.regular, color: theme.colors.text}}>
        {overview}
      </Text>

      {detail && <RenderDetail />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  detail: state.tv.detail,
});

export default connect(mapStateToProps, {tvDetail})(TvDetail);
