import * as matchers from 'jest-immutable-matchers';
import { Map } from 'immutable';
import rootReducer from '..';
import appReducer from '../app';

import {
  PAGE_HOME,
  PAGE_TRASH,
  REFRESH_IN_PROGRESS,
} from '../../constants/types';

import {
  getAppCurrentPage,
  getAppIsMainMenuActive,
  getAppIsFeedViewGrid,
  getAppIsSearchingNotes,
  getAppRefreshStatus,
  getAppMaxColumns,
} from '../../selectors';

import {
  setPage,
  toggleFeedView,
  startRefresh,
  enterSearchMode,
  exitSearchMode,
  toggleMainMenu,
  setMaxColumns,
} from '../../actions';


describe('app reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('provides correct default state', () => {
    const defaultState = appReducer(
      undefined,
      { type: undefined }
    );

    const expectedState =  Map({
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

    expect(defaultState).toEqualImmutable(expectedState);
  });

  describe('actions', () => {
    it('`SET_PAGE`: sets `currentPage` to provided one', () => {
      const state = rootReducer(
        undefined,
        setPage(PAGE_TRASH)
      );
      const val = getAppCurrentPage(state);

      expect(val).toBe(PAGE_TRASH);
    });

    it('`TOGGLE_FEED_VIEW`: toggles `isFeedViewGrid`', () => {
      const state = rootReducer(
        undefined,
        toggleFeedView()
      );
      const val = getAppIsFeedViewGrid(state);

      expect(val).toBe(false);
    });

    it('`START_REFRESH`: sets `refreshStatus` to `REFRESH_IN_PROGRESS`', () => {
      const state = rootReducer(
        undefined,
        startRefresh()
      );
      const val = getAppRefreshStatus(state);

      expect(val).toBe(REFRESH_IN_PROGRESS);
    });

    it('`ENTER_SEARCH_MODE`: sets `searching` to true', () => {
      const state = rootReducer(
        undefined,
        enterSearchMode()
      );
      const val = getAppIsSearchingNotes(state);

      expect(val).toBe(true);
    });

    it('`EXIT_SEARCH_MODE`: sets `searching` to false', () => {
      const state = rootReducer(
        undefined,
        exitSearchMode()
      );
      const val = getAppIsSearchingNotes(state);

      expect(val).toBe(false);
    });

    it('`TOGGLE_MAIN_MENU`: toggles `mainMenuActive`', () => {
      const state = rootReducer(undefined, toggleMainMenu());
      const val = getAppIsMainMenuActive(state);

      expect(val).toBe(true);
    });

    it('`SET_MAX_COLUMNS`: sets `maxColumns` to provided', () => {
      const columns = 2;
      const state = rootReducer(
        undefined,
        setMaxColumns(columns)
      );
      const val = getAppMaxColumns(state);

      expect(val).toBe(columns);
    });
  });
});
