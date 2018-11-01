import { createSelector } from 'reselect';


export const getUser = (state) => state.user;

export const getUserIsMenuActive = createSelector(
  getUser,
  (user) => user.get('isMenuActive')
);

export const getUserUsername = createSelector(
  getUser,
  (user) => user.get('username')
);

export const getUserFirstName = createSelector(
  getUser,
  (user) => user.get('firstName')
);

export const getUserLastName = createSelector(
  getUser,
  (user) => user.get('lastName')
);

export const getUserEmail = createSelector(
  getUser,
  (user) => user.get('email')
);

export const getUserAvatar = createSelector(
  getUser,
  (user) => user.get('avatar')
);
