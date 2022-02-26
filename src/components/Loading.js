import React from 'react';
import {Dimensions} from 'react-native';

import getColorTheme from '../helpers/Theme';

import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window');

const Loading = () => {
  const theme = getColorTheme();

  return (
    <LottieView
      source={require('../assets/animation/loading.json')}
      autoPlay
      loop
      style={{backgroundColor: theme.colors.background}}
    />
  );
};

export default Loading;
