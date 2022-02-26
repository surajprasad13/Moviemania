import _ from 'lodash';
import {
  FETCH_CAST,
  FETCH_CAST_DETAIL,
  FETCH_COMMENTS,
  FETCH_DETAIL,
  FETCH_IMAGES,
  FETCH_RECOMMEND,
  FETCH_VIDEO,
} from './types';

import moviemania from '../../api';

const fetchDetail = (id) =>
  _.memoize(async (dispatch) => {
    try {
      const response = await moviemania.get(`movie/${id}`);
      dispatch({type: FETCH_DETAIL, payload: response.data});
    } catch (e) {
      console.log(e);
    }
  });

const fetchCast = (id) =>
  _.memoize(async (dispatch) => {
    try {
      const response = await moviemania.get(`movie/${id}/credits`);
      dispatch({type: FETCH_CAST, payload: response.data.cast});
    } catch (e) {
      console.log(e);
    }
  });

const fetchCastDetail = (id) => async (dispatch) => {
  try {
    const response = await moviemania.get(`person/${id}`);
    dispatch({type: FETCH_CAST_DETAIL, payload: response.data});
  } catch (error) {
    throw error;
  }
};

const fetchImages = (id) =>
  _.memoize(async (dispatch) => {
    try {
      const response = await moviemania.get(`movie/${id}/images`);
      dispatch({type: FETCH_IMAGES, payload: response.data.backdrops});
    } catch (e) {
      console.log(e);
    }
  });

const fetchRecommend = (id) =>
  _.memoize(async (dispatch) => {
    try {
      const response = await moviemania.get(`movie/${id}/recommendations`);
      dispatch({type: FETCH_RECOMMEND, payload: response.data.results});
    } catch (e) {
      console.log(e);
    }
  });

const fetchComments = (id) =>
  _.memoize(async (dispatch) => {
    try {
      const response = await moviemania.get(`movie/${id}/reviews`);
      dispatch({type: FETCH_COMMENTS, payload: response.data.results});
    } catch (e) {
      console.log(e);
    }
  });

const fetchVideo = (id) => async (dispatch) => {
  try {
    const response = await moviemania.get(`movie/${id}/videos`);
    dispatch({type: FETCH_VIDEO, payload: response.data.results});
  } catch (error) {
    throw error;
  }
};

export {
  fetchDetail,
  fetchCast,
  fetchCastDetail,
  fetchImages,
  fetchRecommend,
  fetchComments,
  fetchVideo,
};
