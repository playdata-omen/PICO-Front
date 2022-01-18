// action type
import { getUser, registerPhotographer, registerUser } from '../api/Auth';
import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_PHTOGRAPHER_SUCCESS } from './type';

// action creator
// simply creates an action
// function returning action
export const auth_actions = {
  login: () => ({ type: LOGIN }),
  logout: () => ({ type: LOGOUT }),
  fetchUserRequest: () => ({ type: FETCH_USER_REQUEST }),
  fetchUserSuccess: (user) => ({ type: FETCH_USER_SUCCESS, payload: user }),
  fetchUserFailure: (err) => ({ type: FETCH_USER_FAILURE, payload: err }),
  fetchPhotographerSuccess: (photographer) => ({
    type: FETCH_PHTOGRAPHER_SUCCESS,
    payload: photographer,
  }),

  // action creator
  fetchUser: getUser,

  registerUser: registerUser,
  registerPhotographer: registerPhotographer,
};
