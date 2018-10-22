import { expectSaga, matchers } from 'redux-saga-test-plan';
import { watchSave } from '../edit';

import {
  saveEditedNote,
  updateNote,
  endEditingNote,
} from '../../actions';

import {
  getEditNoteId,
  getEditNoteFormTitle,
  getEditNoteFormContent,
  getEditNoteFormErrors,
} from '../../selectors';


describe('pin sagas', () => {
  describe('SAVE_EDITED_NOTE', () => {
    it('dispatches updateNote(id, data) and endEditingNote() if no errors', () => {
      const id = 0;
      const title = 'note title';
      const content = 'note content';
      const errors = null;

      return expectSaga(watchSave)
        .provide([
          [matchers.select.selector(getEditNoteId), id],
          [matchers.select.selector(getEditNoteFormTitle), title],
          [matchers.select.selector(getEditNoteFormContent), content],
          [matchers.select.selector(getEditNoteFormErrors), errors],
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
    const errors = { title: 'missing' };

    return expectSaga(watchSave)
      .provide([
        [matchers.select.selector(getEditNoteId), id],
        [matchers.select.selector(getEditNoteFormTitle), title],
        [matchers.select.selector(getEditNoteFormContent), content],
        [matchers.select.selector(getEditNoteFormErrors), errors],
      ])
      .put(endEditingNote())
      .dispatch(saveEditedNote())
      .run();
  });
});
