import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

//redux
import {fetchCastDetail} from '../redux/actions/movieInfoAction';
import {connect} from 'react-redux';
import {poster} from '../constants';
import getColorTheme from '../helpers/Theme';

const {width, height} = Dimensions.get('screen');

const CastDetail = ({route, fetchCastDetail, detail}) => {
  const theme = getColorTheme();

  const {id} = route.params;

  useEffect(() => {
    fetchCastDetail(id);
  }, []);

  if (detail == null) {
    return <ActivityIndicator size="large" color="red" />;
  }

  const {
    profile_path,
    gender,
    name,
    popularity,
    birthday,
    biography,
    place_of_birth,
    known_for_department,
  } = detail;

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: theme.colors.background}}>
      <FastImage
        onLoadStart={() => <ActivityIndicator size="large" color="red" />}
        source={{ uri: poster + profile_path }}
        resizeMode="contain"
        style={{width, height: 200}}
      />
      <Text style={{color: theme.colors.text}}>{name}</Text>
      <Text style={{color: theme.colors.text}}>{gender}</Text>
      <Text style={{color: theme.colors.text}}>{popularity}</Text>
      <Text style={{color: theme.colors.text}}>{birthday}</Text>
      <Text style={{color: theme.colors.text}}>{biography}</Text>
      <Text style={{color: theme.colors.text}}>{place_of_birth}</Text>
      <Text style={{color: theme.colors.text}}>{known_for_department}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  detail: state.detail.castdetail,
});

export default connect(mapStateToProps, {fetchCastDetail})(CastDetail);
