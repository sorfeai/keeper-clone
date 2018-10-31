import { expectSaga, matchers } from 'redux-saga-test-plan';
import { watchSave } from '../edit';
import { getNotesEditingId } from '../../selectors';

import {
  saveEditedNote,
  updateNote,
  endEditingNote,
} from '../../actions';


describe('edit sagas', () => {
  describe('SAVE_EDITED_NOTE', () => {
    it('dispatches updateNote(id, data) and endEditingNote() if no errors', () => {
      const id = 0;
      const title = 'note title';
      const content = 'note content';

      // providing state cause can't target
      // curried selectors with match
      const state = {
        form: {
          editNote: {
            values: {
              title,
              content,
            },
            syncErrors: undefined,
          },
        },
      };

      return expectSaga(watchSave)
        .withState(state)
        .provide([
          [matchers.select.selector(getNotesEditingId), id],
        ])
        .put(updateNote(id, { title, content }))
        .put(endEditingNote())
        .dispatch(saveEditedNote())
        .run();
    });
  });

  it('dispatches only endEditingNote() if errors', () => {
    const id = 0;
    const title = '';
    const content = 'note content';

    const state = {
      form: {
        editNote: {
          values: {
            title,
            content,
          },
          syncErrors: undefined,
        },
      },
    };

    return expectSaga(watchSave)
      .withState(state)
      .provide([
        [matchers.select.selector(getNotesEditingId), id],
      ])
      .put(endEditingNote())
      .dispatch(saveEditedNote())
      .run();
  });
});
