import uuid from 'small-uuid';
import { List } from 'immutable';
import { put, select, takeLatest, fork, } from 'redux-saga/effects';
import { isValid } from 'redux-form';
import { getFormValue } from '../selectors';
import { createNote } from '../actions';
import { NEW_NOTE } from '../constants/types';


const handleNewNote = function* () {
  const valid = yield select(isValid('createNote'));

  console.log(valid);

  const id = uuid.create();
  const title = yield select(getFormValue('createNote', 'title'));
  const content = yield select(getFormValue('createNote', 'content'));
  const tags = List();

  if (valid) {
    yield put(createNote({ id, title, content, tags }));
  }
};


const watchNewNote = function* () {
  yield takeLatest(NEW_NOTE, handleNewNote);
};


const forked = [
  fork(watchNewNote),
];


export default forked;
