import { put, fork, select, takeLatest } from 'redux-saga/effects';
import { updateNote, endEditingNote } from '../actions';
import { SAVE_EDITED_NOTE } from '../constants/types';

import {
  getEditNoteId,
  getEditNoteFormTitle,
  getEditNoteFormContent,
} from '../selectors';


const saveNote = function* () {
  const id = yield select(getEditNoteId);
  const title = yield select(getEditNoteFormTitle);
  const content = yield select(getEditNoteFormContent);

  yield put(updateNote(id, { title, content }));
  yield put(endEditingNote());
};


const watchSave = function* () {
  yield takeLatest(SAVE_EDITED_NOTE, saveNote);
};


const forked = [
  fork(watchSave),
];

export default forked;
