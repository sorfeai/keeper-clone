import { put, fork, select, takeLatest } from 'redux-saga/effects'

import { getNoteById } from '../selectors'
import { startEditingNote } from '../actions'
import { EDIT_NOTE } from '../constants/types'


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

export default [
  fork(watchEditNote)
]
