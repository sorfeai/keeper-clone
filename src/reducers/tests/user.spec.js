import * as matchers from 'jest-immutable-matchers';
import { Map } from 'immutable';
import reducer from '..';
import userReducer from '../user';

import {
  getUser,
  getUserIsMenuActive,
} from '../../selectors';

import {
  setUser,
  toggleUserMenu,
} from '../../actions';


describe('user reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('provides correct default state', () => {
    const state = userReducer(undefined, { type: undefined });

    const expected = Map({
      isMenuActive: false,
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      avatar: null,
    });

    expect(state).toEqualImmutable(expected);
  });

  describe('actions', () => {
    describe('setUser(userData)', () => {
      it('sets fields to corresponding provided', () => {
        const user = {
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          avatar: 'johndoe.jpeg',
        };
        const state = reducer(undefined, setUser(user));

        expect(
          getUser(state).isSuperset(user)
        ).toBeTruthy();
      });
    });

    describe('toggleUserMenu()', () => {
      it('toggles `isMenuActive`', () => {
        const state = reducer(undefined, toggleUserMenu());
        expect(getUserIsMenuActive(state)).toBeTruthy();
      });
    });
  });
});
