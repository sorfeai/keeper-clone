import {
  put,
  fork,
  all,
  takeLatest,
  select,
} from 'redux-saga/effects';

import {
  initialize,
  focus,
  reset,
  change,
  getFormMeta,
  getFormValues,
} from 'redux-form';

import { delay } from './utils';

import {
  createTag as _createTag,
  updateTag as _updateTag,
  addTagsToNote as _addTagsToNote,
  endEditingTag,
  hideApplyTags,
} from '../actions';

import {
  getFormValue,
  getNotesNoteById,
  getTagsTagById,
  getTagsEditingId,
} from '../selectors';

import {
  SHOW_TAGS_MODAL,
  SHOW_APPLY_TAGS,
  START_EDITING_TAG,
  SUBMIT_CREATE_TAG,
  SUBMIT_EDIT_TAG,
  APPLY_TAGS,
} from '../constants/types';


export const initializeCreate = function* () {
  yield delay(0);
  yield put(focus('tags', 'create'));
};

const initializeEdit = function* (action) {
  const { id } = action.payload;
  const tag = yield select(getTagsTagById(id));
  const title = tag.get('title');

  yield put(initialize('tags', { edit: title }));

  // wait for redux-form to register fields
  yield delay(0);
  yield put(focus('tags', 'edit'));
};

const createTag = function* () {
  const title = yield select(
    getFormValue('tags', 'create')
  );

  yield put(_createTag(title));
  yield put(reset('tags', 'create'));
};

const updateTag = function* () {
  const id = yield select(getTagsEditingId);

  const title = yield select(
    getFormValue('tags', 'edit')
  );

  yield put(_updateTag(id, title));
  yield put(endEditingTag());
};

const initApplyTagsValues = function* (action) {
  const { noteId } = action.payload;

  const note = yield select(getNotesNoteById(noteId));
  const tags = note.get('tags');

  // unchecking all tags
  yield put(reset('applyTags'));

  // and checking only those that are applied to current note
  yield all(tags.toArray()
    .map((tagId) => put(change('applyTags', tagId, true))));
}

const addTagsToNote = function* (action) {
  const { noteId } = action.payload;

  const tagsValues = yield select(getFormValues('applyTags'));

  if (tagsValues) {
    const note = yield select(getNotesNoteById(noteId));

    const appliedTags = Object.keys(tagsValues)
      .filter((tagId) => {
        // check if tag is selected and it's not already applied on current note
        return tagsValues[tagId] && !note.get('tags').includes(tagId)
      });

    // appliedTags array can be empty
    if (appliedTags.length > 0) {
      yield put(_addTagsToNote(noteId, appliedTags));
    }
  }
};


export const watchShowTagsModal = function* () {
  yield takeLatest(SHOW_TAGS_MODAL, initializeCreate);
};

export const watchStartEditingTag = function* () {
  yield takeLatest(START_EDITING_TAG, initializeEdit);
};

export const watchSubmitCreateTag = function* () {
  yield takeLatest(SUBMIT_CREATE_TAG, createTag);
};

export const watchSubmitEditTag = function* () {
  yield takeLatest(SUBMIT_EDIT_TAG, updateTag);
};

export const watchShowApplyTags = function* () {
  yield takeLatest(SHOW_APPLY_TAGS, initApplyTagsValues);
};

export const watchApplyTags = function* () {
  yield takeLatest(APPLY_TAGS, addTagsToNote);
};


const forked = [
  fork(watchShowTagsModal),
  fork(watchStartEditingTag),
  fork(watchSubmitCreateTag),
  fork(watchSubmitEditTag),
  fork(watchShowApplyTags),
  fork(watchApplyTags),
];

export default forked;
