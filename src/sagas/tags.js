import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { initialize, focus, reset } from 'redux-form';
import { delay } from './utils';

import {
  endEditingTag,
  createTag as createTagAction,
  updateTag as updateTagAction,
} from '../actions';

import {
  getFormValue,
  getTagsTagById,
  getTagsEditingId,
} from '../selectors';

import {
  SHOW_TAGS_MODAL,
  START_EDITING_TAG,
  SUBMIT_CREATE_TAG,
  SUBMIT_EDIT_TAG,
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
    getFormValue('tags', 'title')
  );

  yield put(createTagAction(title));
  yield put(reset('tags', 'create'));
};

const updateTag = function* () {
  const id = yield select(getTagsEditingId);

  const title = yield select(
    getFormValue('tags', 'title')
  );

  yield put(updateTagAction(id, title));
  yield put(endEditingTag());
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


const forked = [
  fork(watchShowTagsModal),
  fork(watchStartEditingTag),
  fork(watchSubmitCreateTag),
  fork(watchSubmitEditTag),
];

export default forked;
