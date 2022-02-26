import {
  FETCH_TV_POPULAR,
  FETCH_TV_TOPRATED,
  SEARCH_TV,
  TV_DETAIL,
} from './types';

import moviemania from '../../api';

const fetchTvPopular = () => async (dispatch) => {
  try {
    const response = await moviemania.get('tv/popular');
    dispatch({type: FETCH_TV_POPULAR, payload: response.data.results});
  } catch (error) {
    throw error;
  }
};

const fetchTvToprated = () => async (dispatch) => {
  try {
    const response = await moviemania.get('tv/top_rated');
    dispatch({type: FETCH_TV_TOPRATED, payload: response.data.results});
  } catch (error) {
    throw error;
  }
};

const tvDetail = (id) => async (dispatch) => {
  try {
    const response = await moviemania.get(`tv/${id}`);
    dispatch({type: TV_DETAIL, payload: response.data});
  } catch (error) {
    throw error;
  }
};

const searchTv = (query) => async (dispatch) => {
  try {
    const response = await moviemania.get('search/tv', {
      params: {
        query,
      },
    });

    dispatch({type: SEARCH_TV, payload: response.data.results});
  } catch (error) {
    throw error;
  }
};

export {fetchTvPopular, fetchTvToprated, searchTv, tvDetail};
