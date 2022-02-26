import {
  FETCH_ACTION,
  FETCH_COMEDY,
  FETCH_DETAIL,
  FETCH_DISCOVER,
  FETCH_DRAMA,
  FETCH_LOVE,
  FETCH_MOVIE,
  FETCH_MOVIELIST,
  FETCH_TOPRATED,
  FETCH_TRENDING,
  FETCH_UPCOMING,
  LOADING,
  SEARCH_MOVIE,
} from '../actions/types';

const initial_state = {
  loading: false,
  error: '',
  trending: [],
  upcoming: [],
  top_rated: [],
  movielist: [],
  discover: [],
  actiondata: [],
  drama: [],
  comedy: [],
  love: [],
  search: [],
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true};
    case FETCH_TRENDING:
      return {...state, trending: action.payload, loading: false};
    case FETCH_UPCOMING:
      return {...state, upcoming: action.payload, loading: false};
    case FETCH_TOPRATED:
      return {...state, top_rated: action.payload, loading: false};
    case FETCH_MOVIELIST:
      return {...state, movielist: action.payload};
    case FETCH_DISCOVER:
      return {
        ...state,
        loading: false,
        discover: [...state.discover, ...action.payload],
      };
    case FETCH_ACTION:
      return {
        ...state,
        actiondata: [...state.actiondata, ...action.payload],
        loading: false,
      };
    case FETCH_DRAMA:
      return {
        ...state,
        drama: [...state.drama, ...action.payload],
        loading: false,
      };
    case FETCH_COMEDY:
      return {
        ...state,
        comedy: [...state.comedy, ...action.payload],
        loading: false,
      };
    case FETCH_LOVE:
      return {
        ...state,
        love: [...state.love, ...action.payload],
        loading: false,
      };

    case SEARCH_MOVIE:
      return {...state, search: action.payload};
    default:
      return state;
  }
};
