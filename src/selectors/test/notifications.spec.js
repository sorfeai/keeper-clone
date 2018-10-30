import { Map, List } from 'immutable';
import * as matchers from 'jest-immutable-matchers';

import {
  getNotifications,
  getNotificationsById,
  getNotificationById,
  getNotificationsAllIds,
} from '..';


describe('notifications selectors', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  describe('`getNotes`', () => {
    it('gets notes state', () => {
      const notifications = Map({
        byId: Map(),
        allIds: List(),
      });

      expect(
        getNotifications({ notifications })
      ).toEqualImmutable(notifications);
    });
  });

  describe('`getNotificationsById`', () => {
    it('gets `byId`', () => {
      const byId = Map({
        one: Map({ title: 'test' }),
      });
      const state = Map({ byId });

      expect(
        getNotificationsById.resultFunc(state)
      ).toEqualImmutable(byId);
    });
  });

  describe('`getNotificationById`', () => {
    it('gets notification from `byId`', () => {
      const id = 'one';
      const notification = Map({ id, message: 'test' });
      const state = Map({ [id]: notification });

      expect(
        getNotificationById(id).resultFunc(state)
      ).toEqualImmutable(notification);
    });
  });

  describe('`getNotificationsAllIds`', () => {
    it('gets `allIds`', () => {
      const allIds = List(['one', 'two']);
      const state = Map({ allIds });

      expect(
        getNotificationsAllIds.resultFunc(state)
      ).toEqualImmutable(allIds);
    });
  });
});
