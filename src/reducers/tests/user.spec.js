import * as matchers from 'jest-immutable-matchers';
import { Map } from 'immutable';
import userReducer from '../user';
import { getUser } from '../../selectors';

import {
  setUser,
  toggleUserMenu,
} from '../../actions';


describe('user reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it.only('provides correct default state', () => {
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
        const user = Map({
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          avatar: 'johndoe.jpeg',
        });

        const state = userReducer(undefined, setUser(user));
        console.log(state);

        expect(getUser(state)).toEqualImmutable(user);
      });
    });

    // describe('toggleUserMenu()', () => {
    //   it('toggles `isMenuActive`', () => {
    //     const state = userReducer(undefined, toggleUserMenu());
    //
    //     expect(getUser(state)).toEqualImmutable(user);
    //   });
    // });
  });
});
