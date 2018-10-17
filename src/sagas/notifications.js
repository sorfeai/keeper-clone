import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { getNotesInTrash } from '../selectors';
import { notesMovedToTrashMessage, notesDeletedMessage } from '../messages';

import {
  MOVE_NOTES_TO_TRASH,
  NOTIFICATION_INFO,
  DELETE_NOTES,
} from '../constants/types';

import {
  showNotification,
  restoreNotesFromTrash,
  deleteNotes,
} from '../actions';


/**
* moved to trash
*/
const notifyMovedToTrash = function* (action) {
  const { ids } = action.payload;
  const notesCount = ids.size ? ids.size : ids.length;

  yield put(showNotification(
    NOTIFICATION_INFO,
    notesMovedToTrashMessage.format({ notesCount }),
    // FIXME: get rid of store.dispatch
    // () => store.dispatch(
    //   restoreNotesFromTrash(action.payload.ids)
    // )
  ));
};

const watchMoveNotesToTrash = function* () {
  yield takeLatest(MOVE_NOTES_TO_TRASH, notifyMovedToTrash);
};


/**
* deleted forever
*/
const notifyNotesDeleted = function* (action) {
  const { ids } = action.payload;
  const notesCount = ids.size ? ids.size : ids.length;

  yield put(showNotification(
    NOTIFICATION_INFO,
    notesDeletedMessage.format({ notesCount })
  ));
};

const watchDeleteNotes = function* () {
  yield takeLatest(DELETE_NOTES, notifyNotesDeleted);
};


/**
* export forked
*/
const forked = [
  fork(watchMoveNotesToTrash),
  fork(watchDeleteNotes),
];

export default forked;
