import {CREATE_SESSION, REQUEST_TOKEN} from './types';

import moviemania from '../../api';

const requestToken = () => async (dispatch) => {
  try {
    const response = await moviemania.get('authentication/token/new');
    dispatch({type: REQUEST_TOKEN, payload: response.data.request_token});
  } catch (error) {
    throw error;
  }
};

const createSession = (token) => async (dispatch) => {
  try {
    const response = await moviemania.post('authentication/session/new', {
      request_token: token,
    });

    dispatch({type: CREATE_SESSION, payload: response.data.session_id});
  } catch (error) {
    throw error;
  }
};

export {requestToken, createSession};
