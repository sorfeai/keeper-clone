import * as matchers from 'jest-immutable-matchers';
import { Map, List } from 'immutable';
import reducer from '..';

import {
  getNotifications,
  getNotificationById,
  getNotificationsAllIds,
} from '../../selectors';

import {
  NOTIFICATION_INFO,
  NOTIFICATION_ERROR,
} from '../../constants/types';

import {
  showNotification,
  hideNotification,
} from '../../actions';


describe('notifications reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('provides correct default state', () => {
    const state = reducer(undefined, { type: undefined });

    const expected =  Map({
      byId: Map(),
      allIds: List(),
    });

    expect(
      getNotifications(state)
    ).toEqualImmutable(expected);
  });

  describe('actions', () => {
    let defaultState;

    beforeEach(() => {
      const testData = [
        {
          id: 'one',
          type: NOTIFICATION_INFO,
          message: 'info message',
        },
        {
          id: 'two',
          type: NOTIFICATION_ERROR,
          message: 'error message',
        },
      ];

      defaultState = testData.reduce((state, notf) => (
        reducer(state, showNotification(notf))
      ), undefined);
    });

    it('`SHOW_NOTIFICATION`: adds notification to `allIds` and its id to `allIds`', () => {
      const id = 'three';
      const type = NOTIFICATION_INFO;
      const message = 'test message';

      const state = reducer(
        defaultState,
        showNotification({ id, type, message })
      );

      const notf = getNotificationById(id)(state);

      expect(notf.get('id')).toEqual(id);
      expect(notf.get('type')).toEqual(type);
      expect(notf.get('message')).toEqual(message);

      expect(
        getNotificationsAllIds(state).includes(id)
      ).toBeTruthy();
    });

    it('`HIDE_NOTIFICATION`: remove notification from `allIds` and its id from `allIds`', () => {
      const id = 'one';

      const state = reducer(
        defaultState,
        hideNotification(id)
      );

      expect(
        getNotificationById(id)(state)
      ).toBeUndefined();

      expect(
        getNotificationsAllIds(state).includes(id)
      ).toBeFalsy();
    });
  });
});
