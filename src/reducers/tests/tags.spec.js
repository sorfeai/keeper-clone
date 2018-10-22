import { Map, List } from 'immutable';
import tagsReducer from '../tags';

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
  it('provides correct default state', () => {
    const defaultState = tagsReducer(undefined, { type: undefined });

    expect(defaultState.get('byId')).toEqual(Map());
    expect(defaultState.get('allIds')).toEqual(List());
    expect(defaultState.get('isModalShown')).toBe(false);
    expect(defaultState.get('editingId')).toBe(null);
  });

  describe('actions', () => {
    let defaultState;
    let sampleTagId;

    beforeEach(() => {
      defaultState = tagsReducer(undefined, createTag('sample tag'));
      sampleTagId = defaultState
        .get('byId')
        .last()
        .get('id');
    });

    it('CREATE_TAG: creates new tag in `byId` and pushes its id to `allIds`', () => {
      const title = 'test tag';
      const action = createTag(title);
      const updatedState = tagsReducer(defaultState, action);
      const tag = updatedState.get('byId').last();
      const allIds = updatedState.get('allIds');

      expect(tag.get('title')).toEqual(title);
      expect(allIds.includes(tag.get('id')));
    });

    it('UPDATE_TAG: updates existing tag title', () => {
      const newTitle = 'updated tag';
      const action = updateTag(sampleTagId, newTitle);
      const updatedState = tagsReducer(defaultState, action);
      const tag = updatedState.getIn(['byId', sampleTagId]);

      expect(tag.get('title')).toEqual(newTitle);
    });

    it('DELETE_TAGS: deletes tag(s) from `byId` and its id from `allIds`', () => {
      const action = deleteTags([sampleTagId]);
      const updatedState = tagsReducer(defaultState, action);
      const byId = updatedState.get('byId');
      const allIds = updatedState.get('allIds');

      expect(byId.get(sampleTagId)).toBe(undefined);
      expect(allIds.includes(sampleTagId)).toBe(false);
    });

    it('SHOW_TAGS_MODAL: sets `isModalShown` to true', () => {
      const action = showTagsModal();
      const updatedState = tagsReducer(defaultState, action);

      expect(updatedState.get('isModalShown')).toBe(true);
    });

    it('HIDE_TAGS_MODAL: sets `isModalShown` to false', () => {
      const action = hideTagsModal();
      const updatedState = tagsReducer(defaultState, action);

      expect(updatedState.get('isModalShown')).toBe(false);
    });

    it('START_EDITING_TAG: sets `editingId` to provided one', () => {
      const id = 'editing-tag-id';
      const action = startEditingTag(id);
      const updatedState = tagsReducer(defaultState, action);

      expect(updatedState.get('editingId')).toEqual(id);
    });

    it('END_EDITING_TAG: sets `editingId` to null', () => {
      const action = endEditingTag();
      const updatedState = tagsReducer(defaultState, action);

      expect(updatedState.get('editingId')).toBe(null);
    });
  });
});
