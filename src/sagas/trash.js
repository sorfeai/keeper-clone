import { put, fork, takeLatest, select } from 'redux-saga/effects'

import { emptyTrash, deleteNotes } from '../actions'
import { getNotesInTrash } from '../selectors'
import { CLEAR_TRASH } from '../constants/types'


function* delNotes() {
  const notesInTrash = yield select(getNotesInTrash)

  yield put(deleteNotes(notesInTrash))
  yield put(emptyTrash())
}

function* watchClearTrash() {
  yield takeLatest(CLEAR_TRASH, delNotes)
}

export default [
  fork(watchClearTrash)
]
