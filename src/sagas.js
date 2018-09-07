import { put, fork, all, select, takeLatest } from 'redux-saga/effects'
import { store } from '.'

import { getNoteById } from './selectors'
import { notesDeletedMessage } from './messages'

import {
  EDIT_NOTE,
  MOVE_NOTES_TO_TRASH,
  NOTIFICATION_INFO
} from './constants/types'

import {
  startEditingNote,
  showNotification,
  restoreNotesFromTrash
} from './actions'


function* editNote(action) {
  const note = yield select(getNoteById, action.payload.id)

  yield put(startEditingNote(
    note.get('id'),
    note.get('title'),
    note.get('content')
  ))
}

function* watchEditNote() {
  yield takeLatest(EDIT_NOTE, editNote)
}

const editSagas = [
  fork(watchEditNote)
]


function* notify(action) {
  yield put(showNotification(
    NOTIFICATION_INFO,
    notesDeletedMessage.format({
      notesCount: action.payload.ids.size
    }),
    () => store.dispatch(
      restoreNotesFromTrash(action.payload.ids)
    )
  ))
}

function* watchMoveNotesToTrash() {
  yield takeLatest(MOVE_NOTES_TO_TRASH, notify)
}

const notificationsSaga = [
  fork(watchMoveNotesToTrash)
]


export default function* sagas() {
  yield all([
    ...editSagas,
    ...notificationsSaga
  ])
}
