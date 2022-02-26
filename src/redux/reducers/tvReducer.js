import {
  FETCH_TV_POPULAR,
  FETCH_TV_TOPRATED,
  SEARCH_TV,
  TV_DETAIL,
} from '../actions/types';

const initial_state = {
  popular: [],
  toprated: [],
  search: [],
  detail: null,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_TV_POPULAR:
      return {...state, popular: action.payload};
    case FETCH_TV_TOPRATED:
      return {...state, toprated: action.payload};
    case SEARCH_TV:
      return {...state, search: action.payload};
    case TV_DETAIL:
      return {...state, detail: action.payload};
    default:
      return state;
  }
};
