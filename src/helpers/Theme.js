import {useColorScheme} from 'react-native';

import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {theme as colorScheme} from '../constants';

const Getdata = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('theme');
    const data = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(data);
  } catch (e) {
    // error reading value
  }
};

export default function getColorTheme() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scheme = useColorScheme();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useSelector(state => state.theme.theme);
  const colors = theme ? colorScheme.dark : colorScheme[scheme];
  return colors;
}
