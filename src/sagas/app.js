import times from 'lodash/times';
import { put, fork, takeLatest, select, all } from 'redux-saga/effects';
import { getNotesById } from '../selectors';
import { mockNote } from '../testUtils';
import { INIT_APP } from '../constants/types';

import {
  createNote,
  formatNotesForFeed,
} from '../actions';


const handleInitApp = function* () {
  // filler data
  yield all(times(6).map(
    (id) => put(createNote(mockNote(id)))
  ));

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
