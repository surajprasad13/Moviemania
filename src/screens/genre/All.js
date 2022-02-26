import React, {memo, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Card2} from '../../components';
import getColorTheme from '../../helpers/Theme';

import {fetchDiscover} from '../../redux/actions/movieAction';

const All = ({discover, fetchDiscover, navigation}) => {
  const theme = getColorTheme();
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    fetchDiscover(offset);
  }, [offset]);

  const getData = () => {
    setOffset(offset + 1);
    fetchDiscover(offset + 1);
  };

  return (
    <FlatList
      contentContainerStyle={{backgroundColor: theme.colors.background}}
      scrollEventThrottle={1}
      data={discover}
      renderItem={({item, index}) => {
        return <Card2 item={item} key={index} navigation={navigation} />;
      }}
      keyExtractor={(_, index) => index.toString()}
      onEndReached={getData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        discover && <ActivityIndicator size="large" color={theme.colors.text} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  discover: state.movie.discover,
  loading: state.movie.loading,
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default connect(mapStateToProps, {fetchDiscover})(memo(All));
