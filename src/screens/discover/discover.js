import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Card2, Loading} from '../../components';

import {fetchDiscover} from '../../redux/actions/movieAction';

const Discover = ({discover, loading, fetchDiscover, navigation}) => {
  useEffect(() => {
    fetchDiscover();
  }, []);

  return (
    <View>
      <Text>Discover</Text>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={discover}
          renderItem={({item, index}) => {
            return <Card2 item={item} key={index} navigation={navigation} />;
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  discover: state.movie.discover,
  loading: state.movie.loading,
});

export default connect(mapStateToProps, {fetchDiscover})(Discover);
