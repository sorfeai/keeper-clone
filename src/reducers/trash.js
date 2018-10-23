import { Map, List } from 'immutable';

import {
  MOVE_NOTES_TO_TRASH,
  RESTORE_NOTES_FROM_TRASH,
  DELETE_NOTES,
  EMPTY_TRASH,
} from '../constants/types';


const defaultState = Map({
  notesIds: List(),
});


const trashReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MOVE_NOTES_TO_TRASH:
      return state.update('notesIds',
        (notes) => notes.concat(action.payload.ids));
    case RESTORE_NOTES_FROM_TRASH:
    case DELETE_NOTES: {
      const { ids } = action.payload;
      return state.update('notesIds', (notes) => (
        notes.filterNot((id) => ids.includes(id))
      ));
    }
    case EMPTY_TRASH:
      return state.update('notesIds', (notes) => notes.clear());
    default:
      return state;
  }
};


export default trashReducer;
