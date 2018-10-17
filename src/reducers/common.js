import uuid from 'small-uuid';
import { fromJS, List, Map } from 'immutable';

import {
  PAGE_HOME,
  SET_PAGE,
  TOGGLE_FEED_VIEW,
  START_REFRESH,
  REFRESH_IN_PROGRESS,
  UPDATE_SEARCH_QUERY,
  ENTER_SEARCH_MODE,
  EXIT_SEARCH_MODE,
  TOGGLE_MAIN_MENU,
  UPDATE_NOTE,
  DELETE_NOTES,
} from '../constants/types';


/**
* default state
*/
const defaultState = fromJS({
  currentPage: PAGE_HOME,
  mainMenuActive: false,
  feedViewIsGrid: true,
  searching: false,
  searchQuery: '',
  refreshStatus: null,
  user: {
    username: '@aisorfe',
    firstName: 'Nikita',
    lastName: 'Belousov',
    email: 'seriouscat1001@gmail.com',
    avatar: 'user-avatar.jpg',
  },
});


/**
* reducer
*/
const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return state.set('currentPage', action.payload.page);
    case TOGGLE_FEED_VIEW:
      return state.update('feedViewIsGrid', (grid) => !grid);
    case START_REFRESH:
      return state.set('refreshStatus', REFRESH_IN_PROGRESS);
    case ENTER_SEARCH_MODE:
      return state.set('searching', true);
    case EXIT_SEARCH_MODE:
      return state.set('searching', false);
    case UPDATE_SEARCH_QUERY:
      return state.set('searchQuery', action.payload.val);
    case TOGGLE_MAIN_MENU:
      return state.update('mainMenuActive', (active) => !active);
    default:
      return state;
  }
};


export default commonReducer;
