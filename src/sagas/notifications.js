import { put, fork, takeLatest, select } from 'redux-saga/effects'

import { store } from '..'
import { getNotesInTrash } from '../selectors'
import { notesMovedToTrashMessage, notesDeletedMessage } from '../messages'

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


// moved to trash

function* notifyMovedToTrash(action) {
  const { ids } = action.payload
  const notesCount = ids.size ? ids.size : ids.length

  yield put(showNotification(
    NOTIFICATION_INFO,
    notesMovedToTrashMessage.format({ notesCount }),
    () => store.dispatch(
      restoreNotesFromTrash(action.payload.ids)
    )
  ))
}

function* watchMoveNotesToTrash() {
  yield takeLatest(MOVE_NOTES_TO_TRASH, notifyMovedToTrash)
}


// deleted forever

function* notifyNotesDeleted(action) {
  const { ids } = action.payload
  const notesCount = ids.size ? ids.size : ids.length

  yield put(showNotification(
    NOTIFICATION_INFO,
    notesDeletedMessage.format({ notesCount })
  ))
}

function* watchDeleteNotes() {
  yield takeLatest(DELETE_NOTES, notifyNotesDeleted)
}


export default [
  fork(watchMoveNotesToTrash),
  fork(watchDeleteNotes)
]
