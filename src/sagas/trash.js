import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { emptyTrash, deleteNotes } from '../actions';
import { getTrashNotesIds } from '../selectors';
import { CLEAR_TRASH } from '../constants/types';


const delNotes = function* () {
  const notesInTrash = yield select(getTrashNotesIds);

  yield put(deleteNotes(notesInTrash));
  yield put(emptyTrash());
};

export const watchClearTrash = function* () {
  yield takeLatest(CLEAR_TRASH, delNotes);
};


const forked = [
  fork(watchClearTrash),
];

export default forked;
