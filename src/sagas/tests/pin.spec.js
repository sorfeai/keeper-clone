import { List } from 'immutable';
import { expectSaga, matchers } from 'redux-saga-test-plan';
import { watchTogglePin } from '../pin';
import { getPinnedIds } from '../../selectors';

import {
  togglePinNotes,
  pinNotes,
  unpinNotes,
} from '../../actions';


describe('pin sagas', () => {
  describe('TOGGLE_PIN_NOTES', () => {
    it('dispatches pinNotes() if unpinned prevail', () => {
      const pinnedIds = List.of(1, 2, 3);
      const ids = [3, 4, 5];

      return expectSaga(watchTogglePin)
        .provide([
          [matchers.select.selector(getPinnedIds), pinnedIds],
        ])
        .put(pinNotes(ids))
        .dispatch(togglePinNotes(ids))
        .run();
    });
  });

  describe('TOGGLE_PIN_NOTES', () => {
    it('dispatches unpinNotes() if pinned prevail', () => {
      const pinnedIds = List.of(1, 2, 3);
      const ids = [2, 3, 4];

      return expectSaga(watchTogglePin)
        .provide([
          [matchers.select.selector(getPinnedIds), pinnedIds],
        ])
        .put(unpinNotes(ids))
        .dispatch(togglePinNotes(ids))
        .run();
    });
  });

  describe('TOGGLE_PIN_NOTES', () => {
    it('dispatches pinNotes() if pinned and unpinned are equal', () => {
      const pinnedIds = List.of(1, 2, 3);
      const ids = [3, 4];

      return expectSaga(watchTogglePin)
        .provide([
          [matchers.select.selector(getPinnedIds), pinnedIds],
        ])
        .put(pinNotes(ids))
        .dispatch(togglePinNotes(ids))
        .run();
    });
  });
});
