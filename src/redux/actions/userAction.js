import moviemania from '../../api';
import {USER_PROFILE} from './types';

const getProfile = (session_id) => async (dispatch) => {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://api.themoviedb.org/3/account?api_key=ebb9d8d33069e66b288614ca42d87ad4&session_id=${session_id}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch({type: USER_PROFILE, payload: result});
      })
      .catch((error) => console.log('error', error));
  } catch (error) {
    throw error;
  }
};

export {getProfile};
