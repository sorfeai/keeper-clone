import { Map } from 'immutable';

import {
  PAGE_HOME,
  SET_PAGE,
  TOGGLE_FEED_VIEW,
  START_REFRESH,
  REFRESH_IN_PROGRESS,
  ENTER_SEARCH_MODE,
  EXIT_SEARCH_MODE,
  TOGGLE_MAIN_MENU,
  SET_MAX_COLUMNS,
} from '../constants/types';


const defaultState = Map({
  currentPage: PAGE_HOME,
  isMainMenuActive: false,
  isFeedViewGrid: true,
  isSearchingNotes: false,
  refreshStatus: null,
  maxColumns: 3,
  user: Map({
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    avatar: null,
  }),
});


const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return state.set('currentPage', action.payload.page);
    case TOGGLE_FEED_VIEW:
      return state.update('isFeedViewGrid', (grid) => !grid);
    case START_REFRESH:
      return state.set('refreshStatus', REFRESH_IN_PROGRESS);
    case ENTER_SEARCH_MODE:
      return state.set('isSearchingNotes', true);
    case EXIT_SEARCH_MODE:
      return state.set('isSearchingNotes', false);
    case TOGGLE_MAIN_MENU:
      return state.update('isMainMenuActive', (active) => !active);
    case SET_MAX_COLUMNS:
      return state.set('maxColumns', action.payload.maxColumns);
    default:
      return state;
  }
};


export default appReducer;
