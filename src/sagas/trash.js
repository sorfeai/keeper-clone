import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { emptyTrash, deleteNotes } from '../actions';
import { getNotesInTrash } from '../selectors';
import { CLEAR_TRASH } from '../constants/types';


/**
* clear thrash
*/
const delNotes = function* () {
  const notesInTrash = yield select(getNotesInTrash);

  yield put(deleteNotes(notesInTrash));
  yield put(emptyTrash());
};

const watchClearTrash = function* () {
  yield takeLatest(CLEAR_TRASH, delNotes);
};


/**
* export forked
*/
const forked = [
  fork(watchClearTrash),
];

export default forked;
