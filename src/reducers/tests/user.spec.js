import * as matchers from 'jest-immutable-matchers';
import { Map } from 'immutable';
import userReducer from '../user';
import { setUser } from '../../actions';
import { getUser } from '../../selectors';


describe('user reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it.only('provides correct default state', () => {
    const state = userReducer(undefined, { type: undefined });

    const expected = Map({
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      avatar: null,
    });

    expect(state).toEqualImmutable(expected);
  });

  describe('actions', () => {
    describe('SET_USER', () => {
      it('sets fields to corresponding provided', () => {
        const user = Map({
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          avatar: 'johndoe.jpeg',
        });

        const state = userReducer(undefined, setUser(user));

        expect(getUser(state)).toEqualImmutable(user);
      });
    });
  });
});
