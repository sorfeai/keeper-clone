import * as matchers from 'jest-immutable-matchers';
import { Map } from 'immutable';
import commonReducer from '../common';

import {
  PAGE_HOME,
  PAGE_TRASH,
  REFRESH_IN_PROGRESS,
} from '../../constants/types';

import {
  setPage,
  toggleFeedView,
  startRefresh,
  updateSearchQuery,
  enterSearchMode,
  exitSearchMode,
  toggleMainMenu,
} from '../../actions';


describe('common reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('provides correct default state', () => {
    const defaultState = commonReducer(undefined, { type: undefined });
    const expectedState =  Map({
      currentPage: PAGE_HOME,
      mainMenuActive: false,
      feedViewIsGrid: true,
      searching: false,
      searchQuery: '',
      refreshStatus: null,
      user: Map(),
    });

    expect(defaultState).toEqualImmutable(expectedState);
  });

  describe('actions', () => {
    it('`SET_PAGE`: sets `currentPage` to provided one', () => {
      const state = commonReducer(undefined, setPage(PAGE_TRASH));
      expect(state.get('currentPage')).toBe(PAGE_TRASH);
    });

    it('`TOGGLE_FEED_VIEW`: toggles `feedViewIsGrid`', () => {
      const state = commonReducer(undefined, toggleFeedView());
      // as default as true
      expect(state.get('feedViewIsGrid')).toBe(false);
    });

    it('`START_REFRESH`: sets `refreshStatus` to `REFRESH_IN_PROGRESS`', () => {
      const state = commonReducer(undefined, startRefresh());
      expect(state.get('refreshStatus')).toBe(REFRESH_IN_PROGRESS);
    });

    it('`ENTER_SEARCH_MODE`: sets `searching` to true', () => {
      const state = commonReducer(undefined, enterSearchMode());
      expect(state.get('searching')).toBe(true);
    });

    it('`EXIT_SEARCH_MODE`: sets `searching` to false', () => {
      const state = commonReducer(undefined, exitSearchMode());
      expect(state.get('searching')).toBe(false);
    });

    it('`UPDATE_SEARCH_QUERY`: sets `searchQuery` to provided value', () => {
      const val = 'test string';
      const state = commonReducer(undefined, updateSearchQuery(val));
      expect(state.get('searchQuery')).toEqual(val);
    });

    it('`TOGGLE_MAIN_MENU`: toggles `mainMenuActive`', () => {
      const state = commonReducer(undefined, toggleMainMenu());
      expect(state.get('mainMenuActive')).toBe(true);
    });
  });
});
