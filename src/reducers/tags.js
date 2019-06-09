import uuid from 'small-uuid';
import { Map, List } from 'immutable';

import {
  SHOW_TAGS_MODAL,
  HIDE_TAGS_MODAL,
  SHOW_APPLY_TAGS,
  HIDE_APPLY_TAGS,
  START_EDITING_TAG,
  END_EDITING_TAG,
  CREATE_TAG,
  DELETE_TAG,
  UPDATE_TAG,
} from '../constants/types';


const defaultState = Map({
  byId: Map({
    'test-1': Map({
      id: 'test-1',
      title: 'test-one',
    }),
    'test-2': Map({
      id: 'test-2',
      title: 'test-two',
    })
  }),
  allIds: List(['test-1', 'test-2']),
  editingId: null,
  isModalShown: false,
  // contents either false if not shown or note id 
  // to specify which not applying to
  isApplyTagsShown: false,
});


const tagsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_TAGS_MODAL:
      return state.set('isModalShown', true);
    case HIDE_TAGS_MODAL:
      return state.set('isModalShown', false);
    case SHOW_APPLY_TAGS: {
      return state.set('isApplyTagsShown', action.payload.noteId);
    }
    case HIDE_APPLY_TAGS:
      return state.set('isApplyTagsShown', null);
    case START_EDITING_TAG:
      return state.set('editingId', action.payload.id);
    case END_EDITING_TAG:
      return state.set('editingId', null);
    case CREATE_TAG: {
      const id = uuid.create();
      const { title } = action.payload;

      return state
        .update(
          'byId',
          (byId) => byId.set(id, Map({ id, title }))
        )
        .update(
          'allIds',
          (allIds) => allIds.push(id)
        );
    }
    case UPDATE_TAG: {
      const { id, title } = action.payload;

      return state
        .updateIn(
          ['byId', id],
          (tag) => tag.set('title', title)
        );
    }
    case DELETE_TAG: {
      const { ids: payloadIds } = action.payload;

      return state
        .update(
          'byId',
          (tags) => tags.filterNot((tag) => payloadIds.includes(tag.get('id')))
        )
        .update(
          'allIds',
          (ids) => ids.filterNot((id) => payloadIds.includes(id))
        );
      }
    default:
      return state;
  }
};


export default tagsReducer;
