import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {getProfile} from '../../redux/actions/userAction';

const Account = ({profile, loading, getProfile, sessionId}) => {
  useEffect(() => {
    getProfile(sessionId);
  }, []);

  console.log(sessionId);
  return (
    <View>
      <Text>Account</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
  sessionId: state.auth.sessionId,
});

export default connect(mapStateToProps, {getProfile})(Account);
