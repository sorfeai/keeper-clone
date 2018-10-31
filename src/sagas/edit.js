import { put, fork, select, takeLatest } from 'redux-saga/effects';
import { updateNote, endEditingNote } from '../actions';
import { SAVE_EDITED_NOTE } from '../constants/types';

import {
  getNotesEditingId,
  getFormValue,
  getFormErrors,
} from '../selectors';


const saveNote = function* () {
  const id = yield select(getNotesEditingId);

  const title = yield select(
    getFormValue('editNote', 'title')
  );
  const content = yield select(
    getFormValue('editNote', 'content')
  );
  const errors = yield select(
    getFormErrors('editNote')
  );

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
