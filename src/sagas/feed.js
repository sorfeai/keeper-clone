import { Map, List } from 'immutable';
import trim from 'lodash/trim';
import { fork, put, take, takeLatest, select } from 'redux-saga/effects';

import {
  getFormValue,
  getAppCurrentPage,
  getAppIsFeedViewGrid,
  getAppMaxColumns,
  getNotesById,
  getNotesPinnedIds,
  getTrashNotesIds,
} from '../selectors';

import {
  FORMAT_NOTES_FOR_FEED,
  CREATE_NOTE,
  UPDATE_NOTE,
  PIN_NOTES,
  UNPIN_NOTES,
  SEARCH_INPUT_UPDATED,
  APPLY_SEARCH_FILTER,
  APPLY_SEARCH_FILTER_DONE,
  SPLIT_BY_PIN,
  SPLIT_BY_PIN_DONE,
  SPLIT_TO_COLUMNS,
  SPLIT_TO_COLUMNS_DONE,
  PAGE_TRASH,
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

  const searchQuery = yield select(
    getFormValue('search', 'search')
  );

  if (searchQuery !== '') {
    const hasMatch = (note, field) => {
      const query = trim(
        searchQuery
        .replace(/\s\s+/g, ' ')
        .toLowerCase()
      );

      return note
        .get(field)
        .toLowerCase()
        .includes(query);
    };

    filtered = data.filter((note) => (
      hasMatch(note, 'title') || hasMatch(note, 'content')
    ));
  }

  yield put(applySearchFilterDone(filtered));
};

export const handleSplitByPin = function* ({ payload: { data } }) {
  let pinned = List();
  let other = List();

  const notesInTrash = yield select(getTrashNotesIds);
  const pinnedNotes = yield select(getNotesPinnedIds);

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

export const handleSplitToColumns = function* ({
  payload: { data, maxColumns },
}) {
  // TODO: smart split considering element heights
  const splitted = data.reduce((acc, note, index) => {
    const column = index % maxColumns;

    return acc.update(
      column,
      List(),
      (notes) => notes.push(note)
    );
  }, Map());

  yield put(splitToColumnsDone(splitted));
};

export const handleFormatNotesForFeed = function* () {
  let formattedData = yield select(getNotesById);
  const currentPage = yield select(getAppCurrentPage);

  // apply search filter
  yield put(applySearchFilter(formattedData));
  const {
    payload: { data: filtered },
  } = yield take(APPLY_SEARCH_FILTER_DONE);

  formattedData = filtered;

  // split by pin
  if (currentPage !== PAGE_TRASH) {
    yield put(splitByPin(formattedData));
    const { payload: { pinned, other } } = yield take(SPLIT_BY_PIN_DONE);

    formattedData = { pinned, other };
  }

  // split to columns
  const isGrid = yield select(getAppIsFeedViewGrid);
  if (isGrid) {
    const maxColumns = yield select(getAppMaxColumns);

    if (currentPage !== PAGE_TRASH) {
      const { pinned, other } = formattedData;

      yield put(splitToColumns(pinned, maxColumns));
      const {
        payload: { data: splittedPinned },
      } = yield take(SPLIT_TO_COLUMNS_DONE);

      yield put(splitToColumns(other, maxColumns));
      const {
        payload: { data: splittedOther },
      } = yield take(SPLIT_TO_COLUMNS_DONE);

      formattedData = Map({
        pinned: splittedPinned,
        other: splittedOther,
      });
    } else {
      yield put(splitToColumns(formattedData, maxColumns));

      const {
        payload: { data: splitted },
      } = yield take(SPLIT_TO_COLUMNS_DONE);

      formattedData = splitted;
    }
  }

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
  yield takeLatest(FORMAT_NOTES_FOR_FEED, handleFormatNotesForFeed);
};

export const watchRelatedActions = function* () {
  while (true) {
    yield take([
      CREATE_NOTE,
      UPDATE_NOTE,
      PIN_NOTES,
      UNPIN_NOTES,
      SEARCH_INPUT_UPDATED,
    ]);

    yield put(formatNotesForFeed());
  }
};


const forked = [
  fork(watchApplySearchFilter),
  fork(watchSplitByPin),
  fork(watchSplitToColumns),
  fork(watchFormatNotesForFeed),
  fork(watchRelatedActions),
];

export default forked;
