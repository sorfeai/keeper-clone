import uuid from 'small-uuid';
import { Map, List } from 'immutable';

import {
  FORMAT_NOTES_FOR_FEED_DONE,
  CREATE_NOTE,
  UPDATE_NOTE,
  TAG_NOTE,
  DELETE_NOTES,
  PIN_NOTES,
  UNPIN_NOTES,
  TOGGLE_IS_SELECTING,
  SELECT_NOTE,
  DESELECT_NOTE,
  CLEAR_SELECTION,
  EDIT_NOTE_START,
  EDIT_NOTE_END,
} from '../constants/types';


const defaultState = Map({
  byId: Map(),
  allIds: List(),
  feed: Map({
    pinned: List(),
    unpinned: List(),
  }),
  pinnedIds: List(),
  isEditing: false,
  editingId: null,
  isSelecting: false,
  selectedIds: List(),
});


const notesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FORMAT_NOTES_FOR_FEED_DONE:
      return state.set('feed', action.payload.data);
    case CREATE_NOTE: {
      // TODO: extract this functionality to saga
      const {
        id = uuid.create(),
        title,
        content,
        tags: payloadTags,
      } = action.payload;

      const tags = payloadTags
        ? List().concat(payloadTags)
        : List();

      return state
        .update('byId', (notes) => notes.set(
          id,
          Map({
            id,
            title,
            content,
            tags,
          })
        ))
        .update('allIds', (ids) => ids.push(id));
    }
    case UPDATE_NOTE: {
      const { id, changes } = action.payload;

      return state.updateIn(
        ['byId', id],
        (note) => note.merge(changes)
      );
    }
    case DELETE_NOTES: {
      const { ids } = action.payload;

      return state
        .update(
          'byId',
          (byId) => byId.filterNot((note) => ids.includes(note.get('id')))
        )
        .update(
          'allIds',
          (allIds) => allIds.filterNot((id) => ids.includes(id))
        );
    }
    case TAG_NOTE: {
      const { noteId, tagIds } = action.payload;

      return state.update('byId', (notes) => notes.map((note) => {
        if (note.get('id') === noteId) {
          return note.update('tags', (tags) => tags.concat(tagIds));
        }
        return note;
      }));
    }
    case PIN_NOTES: {
      return state.update(
        'pinnedIds',
        (ids) => ids.concat(action.payload.ids)
      );
    }
    case UNPIN_NOTES: {
      const { ids: pinIds } = action.payload;

      return state.update(
        'pinnedIds',
        (ids) => ids.filterNot((id) => pinIds.includes(id))
      );
    }

    case TOGGLE_IS_SELECTING:
      return state.update(
        'isSelecting',
        (selecting) => !selecting
      );
    case SELECT_NOTE: {
      return state
        .update(
          'selectedIds',
          (notes) => notes.push(action.payload.id)
        );
    }
    case DESELECT_NOTE: {
      return state.update(
        'selectedIds',
        (notes) => notes.delete(
          notes.indexOf(action.payload.id)
        )
      );
    }
    case CLEAR_SELECTION:
      return state
        .set('isSelecting', false)
        .update('selectedIds', (notes) => notes.clear());
    case EDIT_NOTE_START: {
      return state
        .set('isEditing', true)
        .set('editingId', action.payload.id);
    }
    case EDIT_NOTE_END:
      return state
        .set('isEditing', false)
        .set('editingId', null);
    default:
      return state;
  }
};


export default notesReducer;
