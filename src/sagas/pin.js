import { put, fork, select, takeLatest } from 'redux-saga/effects';
import { getPinnedIds } from '../selectors';
import { TOGGLE_PIN_NOTES } from '../constants/types';

import  {
  pinNotes,
  unpinNotes,
} from '../actions';


const togglePin = function* (action) {
  const { ids } = action.payload;
  const pinnedIds = yield select(getPinnedIds);

  // counting pinned and unpinned in received `ids` array
  const [pinned, unpinned] = ids.reduce((acc, id) => {
    if (pinnedIds.includes(id)) {
      acc[0] = acc[0] + 1;
    } else {
      acc[1] = acc[1] + 1;
    }
    return acc;
  }, [0, 0]);

  // `pinNotes` wins if counted values are equal
  if (pinned > unpinned) {
    yield put(unpinNotes(ids));
  } else {
    yield put(pinNotes(ids));
  }
};


const watchTogglePin = function* () {
  yield takeLatest(TOGGLE_PIN_NOTES, togglePin);
};


const forked = [
  fork(watchTogglePin),
];

export default forked;
