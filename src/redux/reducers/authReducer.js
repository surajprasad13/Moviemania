import {TapGestureHandler} from 'react-native-gesture-handler';
import {CREATE_SESSION, REQUEST_TOKEN} from '../actions/types';

const initial_state = {
  requestToken: '',
  sessionId: '',
  error: '',
  loading: false,
  authenticated: false,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case REQUEST_TOKEN:
      return {...state, requestToken: action.payload};
    case CREATE_SESSION:
      return {...state, sessionId: action.payload, authenticated: true};
    default:
      return state;
  }
};
