import { Map, List } from 'immutable';
import * as matchers from 'jest-immutable-matchers';

import {
  getUser,
  getUserIsMenuActive,
  getUserUsername,
  getUserFirstName,
  getUserLastName,
  getUserEmail,
  getUserAvatar,
} from '..';


describe('user selectors', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  describe('`getUser`', () => {
    it('gets user state', () => {
      const user = Map({
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
      });

      expect(
        getUser({ user })
      ).toEqualImmutable(user);
    });
  });

  describe('`getUserIsMenuActive`', () => {
    it('gets `isMenuActive`', () => {
      const state = Map({
        isMenuActive: true,
      });

      expect(
         getUserIsMenuActive.resultFunc(state)
      ).toBeTruthy();
    });
  });

  describe('`getUserUsername`', () => {
    it('gets `byId`', () => {
      const username = 'johndoe';
      const state = Map({ username });

      expect(
         getUserUsername.resultFunc(state)
      ).toEqualImmutable(username);
    });
  });

  describe('`getUserFirstName`', () => {
    it('gets `firstName`', () => {
      const firstName = 'John';
      const state = Map({ firstName });

      expect(
         getUserFirstName.resultFunc(state)
      ).toEqualImmutable(firstName);
    });
  });

  describe('`getUserLastName`', () => {
    it('gets `lastName`', () => {
      const lastName = 'Doe';
      const state = Map({ lastName });

      expect(
         getUserLastName.resultFunc(state)
      ).toEqualImmutable(lastName);
    });
  });

  describe('`getUserEmail`', () => {
    it('gets `email`', () => {
      const email = 'john@doe.com';
      const state = Map({ email });

      expect(
         getUserEmail.resultFunc(state)
      ).toEqualImmutable(email);
    });
  });

  describe('`getUserAvatar`', () => {
    it('gets `avatar`', () => {
      const avatar = 'johndoe.jpeg';
      const state = Map({ avatar });

      expect(
         getUserAvatar.resultFunc(state)
      ).toEqualImmutable(avatar);
    });
  });
});
