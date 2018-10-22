import { expectSaga, matchers } from 'redux-saga-test-plan';
import { watchClearTrash } from '../trash';
import { getNotesInTrash } from '../../selectors';

import {
  clearTrash,
  emptyTrash,
  deleteNotes,
} from '../../actions';


describe('trash sagas', () => {
  describe('CLEAR_TRASH', () => {
    it('dispatches deleteNotes(ids) and emptyTrash()', () => {
      const ids = [1, 2, 3];

      return expectSaga(watchClearTrash)
        .provide([
          [matchers.select.selector(getNotesInTrash), ids],
        ])
        .put(deleteNotes(ids))
        .put(emptyTrash())
        .dispatch(clearTrash())
        .run();
    });
  });
});
