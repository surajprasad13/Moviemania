import {
  FETCH_CAST,
  FETCH_CAST_DETAIL,
  FETCH_COMMENTS,
  FETCH_DETAIL,
  FETCH_IMAGES,
  FETCH_RECOMMEND,
  FETCH_VIDEO,
} from '../actions/types';

const initial_state = {
  loading: false,
  detail: [],
  images: [],
  cast: [],
  recommend: [],
  comments: [],
  video: [],
  castdetail: null,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case FETCH_DETAIL:
      return {...state, detail: action.payload};
    case FETCH_IMAGES:
      return {...state, images: action.payload};
    case FETCH_CAST:
      return {...state, cast: action.payload};
    case FETCH_RECOMMEND:
      return {...state, recommend: action.payload};
    case FETCH_COMMENTS:
      return {...state, comments: action.payload};
    case FETCH_CAST_DETAIL:
      return {...state, castdetail: action.payload};
    case FETCH_VIDEO:
      return {...state, video: action.payload};
    default:
      return state;
  }
};
