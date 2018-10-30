import { Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { PAGE_HOME } from '../../constants/types';

import {
  getApp,
  getAppCurrentPage,
  getAppIsMainMenuActive,
  getAppIsFeedViewGrid,
  getAppIsSearchingNotes,
  getAppRefreshStatus,
  getAppMaxColumns,
  getAppUser,
} from '..';


describe('app selectors', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  describe('`getApp`', () => {
    it('gets app state', () => {
      const app = Map({ isFeedViewGrid: true });

      expect(
        getApp({ app })
      ).toEqualImmutable(app);
    });
  });

  describe('`getAppCurrentPage`', () => {
    it('gets `currentPage`', () => {
      const state = Map({ currentPage: PAGE_HOME });

      expect(
        getAppCurrentPage.resultFunc(state)
      ).toBe(PAGE_HOME);
    });
  });

  describe('`getAppIsMainMenuActive`', () => {
    it('gets `isMainMenuActive`', () => {
      const state = Map({ isMainMenuActive: true });

      expect(
        getAppIsMainMenuActive.resultFunc(state)
      ).toBe(true);
    });
  });

  describe('`getAppIsFeedViewGrid`', () => {
    it('gets `isFeedViewGrid`', () => {
      const state = Map({ isFeedViewGrid: true });

      expect(
        getAppIsFeedViewGrid.resultFunc(state)
      ).toBe(true);
    });
  });

  describe('`getAppIsSearchingNotes`', () => {
    it('gets `isSearchingNotes`', () => {
      const state = Map({ isSearchingNotes: true });

      expect(
        getAppIsSearchingNotes.resultFunc(state)
      ).toBe(true);
    });
  });

  describe('`getAppRefreshStatus`', () => {
    it('gets `refreshStatus`', () => {
      const refreshStatus = 'FETCHING';
      const state = Map({ refreshStatus });

      expect(
        getAppRefreshStatus.resultFunc(state)
      ).toBe(refreshStatus);
    });
  });

  describe('`getAppMaxColumns`', () => {
    it('gets `maxColumns`', () => {
      const maxColumns = 3;
      const state = Map({ maxColumns });

      expect(
        getAppMaxColumns.resultFunc(state)
      ).toBe(maxColumns);
    });
  });

  describe('`getAppUser`', () => {
    it('gets `user`', () => {
      const user = Map({
        name: 'John Doe',
        email: 'john@doe.com',
      });
      const state = Map({ user });

      expect(
        getAppUser.resultFunc(state)
      ).toBeImmutableMap(user);
    });
  });
});
