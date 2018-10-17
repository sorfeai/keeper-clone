import { put, fork, select, takeLatest } from 'redux-saga/effects';
import { getSelectedIds } from '../selectors';
import { TOGGLE_SELECT_NOTE } from '../constants/types';

import  {
  selectNote,
  deselectNote,
} from '../actions';


const toggleSelect = function* (action) {
  const { id } = action.payload;
  const selectedIds = yield select(getSelectedIds);
  const isSelected = selectedIds.includes(id);

  if (isSelected) {
    yield put(deselectNote(id));
  } else {
    yield put(selectNote(id));
  }
};


const watchToggleSelect = function* () {
  yield takeLatest(TOGGLE_SELECT_NOTE, toggleSelect);
};


const forked = [
  fork(watchToggleSelect),
];

export default forked;
