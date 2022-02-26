import React, {memo, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TextInput, View, Text} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';

import {Card2} from '../components';

//redux
import {searchMovie} from '../redux/actions/movieAction';
import {connect} from 'react-redux';
import getColorTheme from '../helpers/Theme';

const Search = ({searchMovie, search, navigation}) => {
  const [value, setValue] = useState('');
  const theme = getColorTheme();

  useEffect(() => {
    //searchMovie('');
  }, [searchMovie, search]);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <SearchBar
        round
        showCancel={true}
        placeholder="Search Movie title here..."
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
        onSubmitEditing={(event) => searchMovie(event.nativeEvent.text)}
      />
      <FlatList
        data={search}
        renderItem={({item, index}) => (
          <Card2 item={item} key={index} navigation={navigation} />
        )}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: theme.colors.text}}>0 Movies found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    margin: 10,
    borderRadius: 10,
    paddingLeft: 20,
  },
});

const mapStateToProps = (state) => ({
  search: state.movie.search,
});

export default connect(mapStateToProps, {searchMovie})(memo(Search));
