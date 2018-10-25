import { List } from 'immutable';
import trim from 'lodash/trim';
import { put, take, takeLatest, select, all } from 'redux-saga/effects';

import {
  getCurrentPage,
  getNotesRaw,
  getSearchQuery,
  getIsGridView,
  getNotesInTrash,
  getPinnedIds,
} from '../selectors';

import {
  PAGE_HOME,
  PAGE_TRASH,
  CREATE_NOTE,
  // DELETE_NOTE, <-- create it
  UPDATE_NOTE,
  TOGGLE_PIN_NOTES,
  PIN_NOTES,
  UNPIN_NOTES,
  FORMAT_NOTES_FOR_FEED,
  FORMAT_NOTES_FOR_FEED_DONE,
  APPLY_SEARCH_FILTER,
  APPLY_SEARCH_FILTER_DONE,
  SPLIT_BY_PIN,
  SPLIT_BY_PIN_DONE,
  SPLIT_TO_COLUMNS,
  SPLIT_TO_COLUMNS_DONE,
} from '../constants/types';

import {
  formatNotesForFeed,
  formatNotesForFeedDone,
  applySearchFilter,
  applySearchFilterDone,
  splitByPin,
  splitByPinDone,
  splitToColumns,
  splitToColumnsDone,
} from '../actions';


export const handleApplySearchFilter = function* ({ payload: { data } }) {
  let filtered = data;

  const hasMatch = (note, field) => {
    const query = trim(
      searchQuery
      .replace(/\s\s+/g, ' ')
      .toLowerCase()
    );

    return note
      .get(field)
      .toLowerCase()
      .includes(query)
  };

  const searchQuery = yield select(getSearchQuery);
  if (searchQuery !== '') {
    filtered = data.filter((note) => (
      hasMatch(note, 'title') || hasMatch(note, 'content')
    ));
  }

  yield put({
    type: APPLY_SEARCH_FILTER_DONE,
    payload: { data: filtered },
  });
};

export const handleSplitByPin = function* ({ payload: { data } }) {
  let pinned = List();
  let other = List();

  const notesInTrash = yield select(getNotesInTrash);
  const pinnedNotes = yield select(getPinnedIds);

  data.forEach((note) => {
    const id = note.get('id');

    if (!notesInTrash.includes(id)) {
      if (pinnedNotes.includes(id)) {
        pinned = pinned.push(note);
      } else {
        other = other.push(note);
      }
    }
  });

  yield put(splitByPinDone(pinned, other));
};

export const handleSplitToColumns = function* ({ payload: { data } }) {
  const MAX_FEED_COLUMNS = 3;

  // TODO: smart split considering element heights
  const splitted = data.reduce((acc, note, index) => {
    const columnNum = index % MAX_FEED_COLUMNS;
    return {
      ...acc,
      [columnNum]: acc[columnNum]
        ? [...acc[columnNum], note]
        : [note],
    };
  }, {});

  yield put(splitToColumnsDone(splitted));
};

export const handleFormatNotesForFeed = function* ({ payload: { data } }) {
  let formattedData = data;

  const currentPage = yield select(getCurrentPage);

  // step 1
  const searchQuery = yield select(getSearchQuery);
  if (searchQuery !== '') {
    yield put(applySearchFilter(formattedData));
    const {
      payload: { data: filtered },
    } = yield take(APPLY_SEARCH_FILTER_DONE);

    formattedData = filtered;
  }

  if (currentPage !== PAGE_TRASH) {
    // step 2
    yield put(splitByPin(formattedData));
    const { payload: { data: splittedByPin } } = yield take(SPLIT_BY_PIN_DONE);

    formattedData = splittedByPin;
  }

  // step 3
  const isGrid = yield select(getIsGridView);
  if (isGrid) {
    if (currentPage !== PAGE_TRASH) {
      const { pinned, other } = formattedData;

      yield put(splitToColumns(pinned));
      yield put(splitToColumns(other));

      // FIXME: guarantee the right order
      const {
        payload: { data: splittedPinned },
      } = yield take(SPLIT_TO_COLUMNS_DONE);
      const {
        payload: { data: splittedOther },
      } = yield take(SPLIT_TO_COLUMNS_DONE);

      formattedData = { splittedPinned, splittedOther };
    } else {
      yield put(splitToColumns(formattedData));

      const {
        payload: { data: splitted },
      } = yield take(SPLIT_TO_COLUMNS_DONE);

      formattedData = splitted;
    }
  }

  // send formatted fata
  yield put(formatNotesForFeedDone(formattedData));
};


export const watchApplySearchFilter = function* () {
  yield takeLatest(APPLY_SEARCH_FILTER, handleApplySearchFilter);
};

export const watchSplitByPin = function* () {
  yield takeLatest(SPLIT_BY_PIN, handleSplitByPin);
};

export const watchSplitToColumns = function* () {
  yield takeLatest(SPLIT_TO_COLUMNS, handleSplitToColumns);
};

export const watchFormatNotesForFeed = function* () {
  yield takeLatest([
    // actions that somehow influence feed view:
    CREATE_NOTE,
    // DELETE_NOTE,
    UPDATE_NOTE,
    TOGGLE_PIN_NOTES,
    PIN_NOTES,
    UNPIN_NOTES,
  ], handleFormatNotesForFeed);
};
