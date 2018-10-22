import { put, fork, select, takeLatest } from 'redux-saga/effects';
import { updateNote, endEditingNote } from '../actions';
import { SAVE_EDITED_NOTE } from '../constants/types';

import {
  getEditNoteId,
  getEditNoteFormTitle,
  getEditNoteFormContent,
  getEditNoteFormErrors,
} from '../selectors';


const saveNote = function* () {
  const id = yield select(getEditNoteId);
  const title = yield select(getEditNoteFormTitle);
  const content = yield select(getEditNoteFormContent);
  const errors = yield select(getEditNoteFormErrors);

  if (!errors || errors === {}) {
    yield put(updateNote(id, { title, content }));
  }

  yield put(endEditingNote());
};


export const watchSave = function* () {
  yield takeLatest(SAVE_EDITED_NOTE, saveNote);
};


const forked = [
  fork(watchSave),
];

export default forked;
