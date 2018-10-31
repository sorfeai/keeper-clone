import { List } from 'immutable';
import { expectSaga, matchers } from 'redux-saga-test-plan';
import { watchToggleSelect } from '../select';
import { getNotesSelectedIds } from '../../selectors';

import {
  toggleSelectMode,
  toggleSelectNote,
  selectNote,
  deselectNote,
} from '../../actions';


describe('select sagas', () => {
  describe('TOGGLE_SELECT_NOTE', () => {
    it('sets to true if note isn\'t selected', () => {
      const id = 1;
      const selectedIds = List.of(2, 3);

      return expectSaga(watchToggleSelect)
        .provide([
          [matchers.select.selector(getNotesSelectedIds), selectedIds],
        ])
        .put(selectNote(id))
        .dispatch(toggleSelectNote(id))
        .run();
    });

    it('sets to false if note is selected', () => {
      const id = 1;
      const selectedIds = List.of(1, 2, 3);

      return expectSaga(watchToggleSelect)
        .provide([
          [matchers.select.selector(getNotesSelectedIds), selectedIds],
        ])
        .put(deselectNote(id))
        .dispatch(toggleSelectNote(id))
        .run();
    });

    it('dispatches toggleSelectMode() if it\'s the first note to select', () => {
      const id = 1;
      const selectedIds = List();

      return expectSaga(watchToggleSelect)
        .provide([
          [matchers.select.selector(getNotesSelectedIds), selectedIds],
        ])
        .put(toggleSelectMode())
        .dispatch(toggleSelectNote(id))
        .run();
    });

    it('dispatches toggleSelectMode() if it\'s the last note to deselect', () => {
      const id = 1;
      const selectedIds = List.of(1);

      return expectSaga(watchToggleSelect)
        .provide([
          [matchers.select.selector(getNotesSelectedIds), selectedIds],
        ])
        .put(toggleSelectMode())
        .dispatch(toggleSelectNote(id))
        .run();
    });
  });
});
