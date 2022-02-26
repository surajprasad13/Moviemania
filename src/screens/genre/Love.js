import React, {memo, useEffect, useState} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Card2} from '../../components';
import getColorTheme from '../../helpers/Theme';

import {fetchLove} from '../../redux/actions/movieAction';

const Love = ({love, fetchLove, navigation}) => {
  const theme = getColorTheme();
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    fetchLove(offset + 1);
  }, [offset]);

  const getData = () => {
    setOffset(offset + 1);
    fetchLove(offset + 1);
  };

  return (
    <FlatList
      contentContainerStyle={{backgroundColor: theme.colors.background}}
      data={love}
      renderItem={({item, index}) => {
        return <Card2 item={item} key={index} navigation={navigation} />;
      }}
      keyExtractor={(_, index) => index.toString()}
      onEndReached={getData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        love && <ActivityIndicator size="large" color={theme.colors.text} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  love: state.movie.love,
});

export default connect(mapStateToProps, {fetchLove})(memo(Love));
