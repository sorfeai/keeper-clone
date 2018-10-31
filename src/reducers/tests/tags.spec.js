import * as matchers from 'jest-immutable-matchers';
import { Map, List } from 'immutable';
import reducer from '..';

import {
  getTags,
  getTagsById,
  getTagsTagById,
  getTagsAllIds,
  getTagsEditingId,
  getTagsIsModalShown,
} from '../../selectors';

import {
  createTag,
  updateTag,
  deleteTags,
  showTagsModal,
  hideTagsModal,
  startEditingTag,
  endEditingTag,
} from '../../actions';


describe('tags reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('provides correct default state', () => {
    const state = reducer(undefined, { type: undefined });

    const expected = Map({
      byId: Map(),
      allIds: List(),
      editingId: null,
      isModalShown: false,
    });

    expect(
      getTags(state)
    ).toEqualImmutable(expected);
  });

  describe('actions', () => {
    let defaultState;
    let sampleTagId;

    beforeEach(() => {
      defaultState = reducer(
        undefined,
        createTag('sample tag')
      );

      sampleTagId = getTagsById(defaultState)
        .last()
        .get('id');
    });

    it('CREATE_TAG: creates new tag in `byId` and pushes its id to `allIds`', () => {
      const title = 'test tag';
      const action = createTag(title);
      const updatedState = reducer(defaultState, action);
      const tag = getTagsById(updatedState).last();
      const allIds = getTagsAllIds(updatedState);

      expect(tag.get('title')).toBe(title);

      expect(
        allIds.includes(tag.get('id'))
      ).toBeTruthy();
    });

    it('UPDATE_TAG: updates existing tag title', () => {
      const newTitle = 'updated tag';
      const action = updateTag(sampleTagId, newTitle);
      const updatedState = reducer(defaultState, action);
      const tag = getTagsTagById(sampleTagId)(updatedState);

      expect(tag.get('title')).toBe(newTitle);
    });

    it('DELETE_TAGS: deletes tag(s) from `byId` and its id from `allIds`', () => {
      const action = deleteTags([sampleTagId]);
      const updatedState = reducer(defaultState, action);
      const byId = getTagsById(updatedState);
      const allIds = getTagsAllIds(updatedState);

      expect(byId.get(sampleTagId)).toBeUndefined();
      expect(allIds.includes(sampleTagId)).toBeFalsy();
    });

    it('SHOW_TAGS_MODAL: sets `isModalShown` to true', () => {
      const action = showTagsModal();
      const updatedState = reducer(defaultState, action);

      expect(
        getTagsIsModalShown(updatedState)
      ).toBeTruthy();
    });

    it('HIDE_TAGS_MODAL: sets `isModalShown` to false', () => {
      const action = hideTagsModal();
      const updatedState = reducer(defaultState, action);

      expect(
        getTagsIsModalShown(updatedState)
      ).toBeFalsy();
    });

    it('START_EDITING_TAG: sets `editingId` to provided one', () => {
      const id = 'editing-tag-id';
      const action = startEditingTag(id);
      const updatedState = reducer(defaultState, action);

      expect(
        getTagsEditingId(updatedState)
      ).toBe(id);
    });

    it('END_EDITING_TAG: sets `editingId` to null', () => {
      const action = endEditingTag();
      const updatedState = reducer(defaultState, action);

      expect(
        getTagsEditingId(updatedState)
      ).toBeNull();
    });
  });
});
