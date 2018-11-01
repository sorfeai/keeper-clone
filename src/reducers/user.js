import { Map } from 'immutable';

import {
  SET_USER,
  TOGGLE_USER_MENU,
} from '../constants/types';


const defaultState = Map({
  isMenuActive: false,
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  avatar: null,
});


const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_USER_MENU:
      return state.update('isMenuActive', (active) => !active);
    case SET_USER: {
      const {
        username,
        firstName,
        lastName,
        email,
        avatar,
      } = action.payload;

      return state
        .set('username', username)
        .set('firstName', firstName)
        .set('lastName', lastName)
        .set('email', email)
        .set('avatar', avatar);
    }
    default:
      return state;
  }
};


export default appReducer;
