import { Map } from 'immutable';
import { SET_USER } from '../constants/types';


const defaultState = Map({
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  avatar: null,
});


const appReducer = (state = defaultState, action) => {
  switch (action.type) {
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
