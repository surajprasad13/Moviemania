import React, {useEffect, useState} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {Card2, Loading} from '../../components';
import getColorTheme from '../../helpers/Theme';

import {fetchAction} from '../../redux/actions/movieAction';

const Action = ({action, fetchAction, navigation}) => {
  const theme = getColorTheme();
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    fetchAction(offset);
  }, []);

  const getData = () => {
    setOffset(offset + 1);
    fetchAction(offset + 1);
  };

  return (
    <FlatList
      contentContainerStyle={{backgroundColor: theme.colors.background}}
      scrollEventThrottle={1}
      data={action}
      renderItem={({item, index}) => {
        return <Card2 item={item} key={index} navigation={navigation} />;
      }}
      keyExtractor={(_, index) => index.toString()}
      onEndReached={getData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        action && <ActivityIndicator size="large" color={theme.colors.text} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  action: state.movie.actiondata,
});

export default connect(mapStateToProps, {fetchAction})(Action);
