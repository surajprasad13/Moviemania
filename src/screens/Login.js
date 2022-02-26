import React, {useEffect, useRef} from 'react';

import {Dimensions} from 'react-native';

//redux
import {createSession, requestToken} from '../redux/actions/authAction';
import {connect} from 'react-redux';
import WebView from 'react-native-webview';

const {width} = Dimensions.get('screen');

const Login = ({
  token,
  requestToken,
  createSession,
  navigation,
  authenticated,
}) => {
  const movie = useRef();
  useEffect(async () => {
    requestToken();
  }, []);

  const onChange = (data) => {
    var str = data.url;
    var pattern = new RegExp('allow');
    var res = pattern.test(str);
    if (res) {
      createSession(token);
      navigation.navigate('Account');
    }
  };

  return (
    <WebView
      ref={movie}
      source={{
        uri: `https://www.themoviedb.org/authenticate/${token}`,
      }}
      style={{width, height: width}}
      onNavigationStateChange={onChange}
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.requestToken,
  sessionId: state.auth.sessionId,
  loading: state.auth.loading,
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, {requestToken, createSession})(Login);
