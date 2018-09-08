import { put, fork, takeLatest, select } from 'redux-saga/effects'

import { store } from '..'
import { getNotesInTrash } from '../selectors'
import { movedToTrashMessage, trashClearedMessage } from '../messages'

import {
  MOVE_NOTES_TO_TRASH,
  NOTIFICATION_INFO,
  DELETE_NOTES
} from '../constants/types'

import {
  showNotification,
  restoreNotesFromTrash,
  deleteNotes
} from '../actions'


function* notifyMoveToTrash(action) {
  yield put(showNotification(
    NOTIFICATION_INFO,
    movedToTrashMessage.format({
      notesCount: action.payload.ids.size
    }),
    () => store.dispatch(
      restoreNotesFromTrash(action.payload.ids)
    )
  ))
}

function* notifyClearTrash() {
  const notesInTrash = yield select(getNotesInTrash)

  yield put(showNotification(
    NOTIFICATION_INFO,
    trashClearedMessage.format({
      notesCount: notesInTrash.size
    })
  ))
}

function* watchMoveNotesToTrash() {
  yield takeLatest(MOVE_NOTES_TO_TRASH, notifyMoveToTrash)
}

function* watchDeleteNotes() {
  yield takeLatest(DELETE_NOTES, notifyClearTrash)
}

export default [
  fork(watchMoveNotesToTrash),
  fork(watchDeleteNotes)
]
