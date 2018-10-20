import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { initialize, focus, reset } from 'redux-form';
import { delay } from './utils';

import {
  endEditingTag,
  createTag as createTagAction,
  updateTag as updateTagAction,
} from '../actions';

import {
  getTagById,
  getCreateTagValue,
  getEditTagValue,
  getEditingTagId,
} from '../selectors';

import {
  SHOW_TAGS_MODAL,
  START_EDITING_TAG,
  SUBMIT_CREATE_TAG,
  SUBMIT_EDIT_TAG,
} from '../constants/types';


const initializeCreate = function* () {
  yield delay(0);
  yield put(focus('tags', 'create'));
};

const initializeEdit = function* (action) {
  const { id } = action.payload;
  const tag = yield select(getTagById(id));
  const title = tag.get('title');

  yield put(initialize('tags', { edit: title }));

  // wait for redux-form to register fields
  yield delay(0);
  yield put(focus('tags', 'edit'));
};

const createTag = function* () {
  const title = yield select(getCreateTagValue);

  yield put(createTagAction(title));
  yield put(reset('tags', 'create'));
};

const updateTag = function* () {
  const id = yield select(getEditingTagId);
  const title = yield select(getEditTagValue);

  yield put(updateTagAction(id, title));
  yield put(endEditingTag());
};


const watchShowTagsModal = function* () {
  yield takeLatest(SHOW_TAGS_MODAL, initializeCreate);
};

const watchStartEditingTag = function* () {
  yield takeLatest(START_EDITING_TAG, initializeEdit);
};

const watchSubmitCreateTag = function* () {
  yield takeLatest(SUBMIT_CREATE_TAG, createTag);
};

const watchSubmitEditTag = function* () {
  yield takeLatest(SUBMIT_EDIT_TAG, updateTag);
};


const forked = [
  fork(watchShowTagsModal),
  fork(watchStartEditingTag),
  fork(watchSubmitCreateTag),
  fork(watchSubmitEditTag),
];

export default forked;
