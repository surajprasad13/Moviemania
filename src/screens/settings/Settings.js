import React from 'react';

import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem, Switch, SearchBar, Icon} from 'react-native-elements';

import {useSelector, useDispatch, connect} from 'react-redux';
import getColorTheme from '../../helpers/Theme';
import {changeTheme} from '../../redux/actions/themeAction';

const Settings = ({navigation, authenticated}) => {
  const data = [
    {
      title: 'Account',
      iconName: 'user',
      iconType: 'feather',
      onPress: () => null,
    },
    {
      title: 'Notifications',
      iconName: 'bell',
      iconType: 'evilicon',
      onPress: () => null,
    },
    {
      title: 'Appearance',
      iconName: 'eye',
      iconType: 'feather',
      onPress: () => null,
    },
    {
      title: 'Privacy and Policy',
      iconName: 'lock',
      iconType: 'evilicon',
      onPress: () => null,
    },
    {
      title: 'Terms and Conditions',
      iconName: 'document-text-outline',
      iconType: 'ionicon',
      onPress: () => null,
    },
    {
      title: 'Help and Support',
      iconName: 'headphones',
      iconType: 'feather',
      onPress: () => null,
    },
    {
      title: 'About',
      iconName: 'info',
      iconType: 'feather',
      onPress: () => null,
    },
  ];

  const theme = useSelector((state) => state.theme.theme);

  const dispatch = useDispatch();
  const themeColor = getColorTheme();

  return (
    <ScrollView
      bounces={false}
      style={[
        styles.container,
        {backgroundColor: themeColor.colors.background},
      ]}>
      <Text style={[{color: themeColor.colors.text}, styles.heading]}>
        Settings
      </Text>
      <SearchBar
        round
        showCancel={true}
        placeholder="Search Tv..."
        placeholderTextColor={themeColor.colors.text}
        containerStyle={{
          backgroundColor: themeColor.colors.background,
          borderTopColor: themeColor.colors.background,
          borderBottomColor: themeColor.colors.background,
        }}
        inputContainerStyle={{
          backgroundColor: themeColor.colors.background,
          borderWidth: 1,
          borderBottomWidth: 1,
          borderColor: themeColor.colors.text,
        }}
        inputStyle={{}}
      />
      {data.map(({title, iconName, iconType, onPress}, index) => {
        if (title == 'Account') {
          return (
            <ListItem
              onPress={() =>
                authenticated
                  ? navigation.navigate('Account')
                  : navigation.navigate('Login')
              }
              key={'Account'}
              containerStyle={{
                backgroundColor: themeColor.colors.background,
              }}>
              <Icon
                name={iconName}
                type="feather"
                color={themeColor.colors.text}
              />
              <ListItem.Content>
                <ListItem.Title style={{color: themeColor.colors.text}}>
                  Account
                </ListItem.Title>
              </ListItem.Content>

              <ListItem.Chevron />
            </ListItem>
          );
        } else if (title == 'Appearance') {
          return (
            <ListItem
              key={'Apearance'}
              containerStyle={{
                backgroundColor: themeColor.colors.background,
              }}>
              <Icon name="eye" type="feather" color={themeColor.colors.text} />
              <ListItem.Content>
                <ListItem.Title style={{color: themeColor.colors.text}}>
                  Change Theme
                </ListItem.Title>
              </ListItem.Content>
              <Switch
                value={theme}
                onValueChange={() => dispatch(changeTheme(!theme))}
              />
              <ListItem.Chevron />
            </ListItem>
          );
        } else {
          return (
            <ListItem
              onPress={() => onPress(navigation)}
              key={index}
              containerStyle={{backgroundColor: themeColor.colors.background}}>
              <Icon
                name={iconName}
                type={iconType}
                color={themeColor.colors.text}
              />
              <ListItem.Content>
                <ListItem.Title style={{color: themeColor.colors.text}}>
                  {title}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          );
        }
      })}
      <ListItem
        containerStyle={{backgroundColor: themeColor.colors.background}}>
        <Icon name="logout" type="materialicon" color="red" />
        <ListItem.Content>
          <ListItem.Title style={{color: 'red'}}>Logout</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(Settings);
