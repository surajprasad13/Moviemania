import {USER_LOADING, USER_PROFILE} from '../actions/types';

const initial_state = {
  profile: null,
  loading: false,
  error: '',
  message: '',
  list: null,
  watchlist: null,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {...state, loading: true};
    case USER_PROFILE:
      return {...state, profile: action.payload};
    default:
      return state;
  }
};
