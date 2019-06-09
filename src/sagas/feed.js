import { Map, List } from 'immutable';
import trim from 'lodash/trim';

import {
  call,
  fork,
  put,
  take,
  takeLatest,
  select,
} from 'redux-saga/effects';

import {
  getFormValue,
  getAppCurrentPage,
  getAppIsFeedViewGrid,
  getAppMaxColumns,
  getNotesById,
  getNotesPinnedIds,
  getNotesTagFilter,
  getTrashNotesIds,
} from '../selectors';

import {
  PAGE_TRASH,
  SET_PAGE,
  FORMAT_NOTES_FOR_FEED,
  CREATE_NOTE,
  DELETE_NOTES,
  UPDATE_NOTE,
  PIN_NOTES,
  UNPIN_NOTES,
  MOVE_NOTES_TO_TRASH,
  RESTORE_NOTES_FROM_TRASH,
  SEARCH_INPUT_UPDATED,
  SET_TAG_FILTER,
  RESET_TAG_FILTER,
  // APPLY_SEARCH_FILTER,
  // APPLY_SEARCH_FILTER_DONE,
  // SPLIT_BY_PIN,
  // SPLIT_BY_PIN_DONE,
  // SPLIT_TO_COLUMNS,
  // SPLIT_TO_COLUMNS_DONE,
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


export const filterTrash = function* (data, isTrash) {
  const trashIds = yield select(getTrashNotesIds);

  return data.filter((note) => {
    const includes = trashIds.includes(note.get('id'));
    return isTrash ? includes : !includes;
  });
};

export const _applySearchFilter = function* (data) {
  let filtered = data;

  let searchQuery = yield select(
    getFormValue('search', 'search')
  );

  // returns first index of search query substring 
  // or false if there's no match
  if (typeof searchQuery !== 'undefined') {
    searchQuery = searchQuery
      .trim()
      .replace(/\s\s+/g, ' ')
      .toLowerCase();

    const hasMatch = (note, field) => {
      return note
        .get(field)
        .toLowerCase()
        .indexOf(searchQuery);
    };

    // inserts special tags around highlighted part of text
    // that would be replaced with styled spans in view component
    const highlight = (index) => (text) => {
      return `${text.slice(0, index)}[HL_START]${text.slice(index, index + searchQuery.length)}[HL_END]${text.slice(index + searchQuery.length)}`;
    };

    filtered = data.reduce((filtered, note) => {
      const titleMatch = hasMatch(note, 'title');
      const contentMatch = hasMatch(note, 'content');

      let highlighted = note;

      if (titleMatch !== -1 || contentMatch !== -1) {
        if (titleMatch !== -1) {
          highlighted = highlighted.update('title', highlight(titleMatch));
        }
        if (contentMatch !== -1) {
          highlighted = highlighted.update('content', highlight(contentMatch));
        }

        filtered.push(highlighted);
      }

      return filtered;
    }, []);

    filtered = List(filtered);
  }

  return filtered;
};

export const _applyTagFilter = function* (data) {
  let filtered = data;

  const tagId = yield select(getNotesTagFilter);

  if (tagId !== undefined) {
    filtered = data.filter((note) => {
      return (note.get('tags').includes(tagId));
    })
  }
  
  return filtered;
}

export const _splitByPin = function* (data) {
  let pinned = List();
  let unpinned = List();

  const pinnedNotes = yield select(getNotesPinnedIds);

  data.forEach((note) => {
    const id = note.get('id');

    if (pinnedNotes.includes(id)) {
      pinned = pinned.push(note);
    } else {
      unpinned = unpinned.push(note);
    }
  });

  return { pinned, unpinned };
};

export const _splitToColumns = (data, maxColumns) => {
  // TODO: smart split considering element heights
  return data.reduce((acc, note, index) => {
    const column = index % maxColumns;

    return acc.update(
      column,
      List(),
      (notes) => notes.push(note)
    );
  }, Map());
};

export const handleFormatNotesForFeed = function* () {
  let feedData = yield select(getNotesById);
  const currentPage = yield select(getAppCurrentPage);
  const isPageTrash = currentPage === PAGE_TRASH;

  feedData = yield call(filterTrash, feedData, isPageTrash);
  feedData = yield call(_applySearchFilter, feedData);
  feedData = yield call(_applyTagFilter, feedData);

  if (!isPageTrash) {
    feedData = yield call(_splitByPin, feedData);
  }

  const isGrid = yield select(getAppIsFeedViewGrid);
  if (isGrid) {
    const maxColumns = yield select(getAppMaxColumns);

    if (!isPageTrash) {
      const { pinned, unpinned } = feedData;

      const splittedPinned = yield call(
        _splitToColumns,
        pinned,
        maxColumns
      );
      const splittedUnpinned = yield call(
        _splitToColumns,
        unpinned,
        maxColumns
      );

      feedData = Map({
        pinned: splittedPinned,
        unpinned: splittedUnpinned,
      });
    } else {
      const splitted = yield call(
        _splitToColumns,
        feedData,
        maxColumns
      );

      feedData = splitted;
    }
  }

  yield put(formatNotesForFeedDone(feedData));
};


export const watchFormatNotesForFeed = function* () {
  yield takeLatest(
    FORMAT_NOTES_FOR_FEED,
    handleFormatNotesForFeed
  );
};

export const watchRelatedActions = function* () {
  while (true) {
    yield take([
      SET_PAGE,
      CREATE_NOTE,
      DELETE_NOTES,
      UPDATE_NOTE,
      PIN_NOTES,
      UNPIN_NOTES,
      MOVE_NOTES_TO_TRASH,
      RESTORE_NOTES_FROM_TRASH,
      SEARCH_INPUT_UPDATED,
      SET_TAG_FILTER,
      RESET_TAG_FILTER,
    ]);

    yield put(formatNotesForFeed());
  }
};


const forked = [
  fork(watchFormatNotesForFeed),
  fork(watchRelatedActions),
];

export default forked;
