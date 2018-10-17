import { fromJS, List, Map } from 'immutable';

import {
  UPDATE_NOTE,
  TAG_NOTE,
  DELETE_NOTES,
} from '../constants/types';


/**
* default state
*/
const defaultState = fromJS({
  byId: {
    1: {
      id: '1',
      deleting: false,
      title: 'Todo List',
      content: `One, two... and finally three! One, two...
        and finally three! One, two...
        and finally three! One, two... and finally three!`,
    },
    2: {
      id: '2',
      deleting: false,
      title: 'Todo List',
      content: 'One, two... and finally three!',
    },
    3: {
      id: '3',
      deleting: false,
      title: 'Todo List',
      content: 'One, two... and finally three!',
    },
    4: {
      id: '4',
      deleting: false,
      title: 'Todo List',
      content: 'One, two... and finally three!',
    },
  },
  allIds: ['1', '2', '3'],
});


/**
* reducer
*/
const notesReducer = (state = defaultState, action) => {
  switch (action.type) {
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
      const { noteId, tagId } = action.payload;

      return state.map((note) => {
        if (note.get('id') === noteId) {
          return note.update('tags', (tags) => tags.push(tagId));
        } return note;
      });
    }
    default:
      return state;
  }
};


export default notesReducer;
