import uuid from 'small-uuid';
import { Map, List } from 'immutable';

import {
  CREATE_NOTE,
  UPDATE_NOTE,
  TAG_NOTE,
  DELETE_NOTES,
} from '../constants/types';


const defaultState = Map({
  byId: Map(),
  allIds: List(),
  formmated: Map(),
});


const notesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_NOTE: {
      const generatedId = uuid.create();
      const { id = generatedId, title, content, tags } = action.payload;

      return state
        .update('byId', (notes) => notes.set(id, Map({
          id, title, content,
          tags: tags ? List().concat(tags) : List(),
        })))
        .update('allIds', (ids) => ids.push(id));
    }
    case UPDATE_NOTE: {
      const { id, changes } = action.payload;
      return state.updateIn(['byId', id], (note) => note.merge(changes));
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
    default:
      return state;
  }
};


export default notesReducer;
