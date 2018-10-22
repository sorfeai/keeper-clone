import { put, fork, select, takeLatest } from 'redux-saga/effects';
import { getSelectedIds } from '../selectors';
import { TOGGLE_SELECT_NOTE } from '../constants/types';

import  {
  toggleSelectMode,
  selectNote,
  deselectNote,
} from '../actions';


const toggleSelect = function* (action) {
  const { id } = action.payload;
  const selectedIds = yield select(getSelectedIds);
  const isSelected = selectedIds.includes(id);

  if (isSelected) {
    if (selectedIds.size === 1) {
      // means no selected notes left
      yield put(toggleSelectMode());
    }
    yield put(deselectNote(id));
  } else {
    if (selectedIds.size === 0) {
      yield put(toggleSelectMode());
    }
    yield put(selectNote(id));
  }
};


export const watchToggleSelect = function* () {
  yield takeLatest(TOGGLE_SELECT_NOTE, toggleSelect);
};


const forked = [
  fork(watchToggleSelect),
];

export default forked;
