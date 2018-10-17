import { fromJS } from 'immutable';

import {
  MOVE_NOTES_TO_TRASH,
  RESTORE_NOTES_FROM_TRASH,
  DELETE_NOTES,
  EMPTY_TRASH,
} from '../constants/types';


/**
* default state
*/
const defaultState = fromJS({
  notesById: [],
});


/**
* reducer
*/
const trashReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MOVE_NOTES_TO_TRASH:
      return state.update('notesById',
        (notes) => notes.concat(action.payload.ids));
    case RESTORE_NOTES_FROM_TRASH:
      return state.update('notesById',
        (notes) => notes.filterNot((id) => action.payload.ids.includes(id)));
    case DELETE_NOTES:
      return state.update('notesById',
        (notes) => notes.filterNot((id) => action.payload.ids.includes(id)));
    case EMPTY_TRASH:
      return state.update('notesById', (notes) => notes.clear());
    default:
      return state;
  }
};


export default trashReducer;
