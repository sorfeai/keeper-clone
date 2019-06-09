import times from 'lodash/times';
import { put, fork, takeLatest, select, all } from 'redux-saga/effects';
import { getNotesById } from '../selectors';
import { mockNote } from '../testUtils';
import { INIT_APP } from '../constants/types';

import {
  createNote,
  moveNotesToTrash,
  formatNotesForFeed,
  addTagsToNote,
} from '../actions';


const handleInitApp = function* () {
  // filler data
  yield all(times(6).map(
    (id) => put(createNote(mockNote(id)))
  ));

  yield put(moveNotesToTrash(['1', '2']));
  yield put(addTagsToNote('4', ['test-1', 'test-2']));

  const data = yield select(getNotesById);
  yield put(formatNotesForFeed(data));
};


export const watchInitApp = function* () {
  yield takeLatest(INIT_APP, handleInitApp);
};


const forked = [
  fork(watchInitApp),
];

export default forked;
