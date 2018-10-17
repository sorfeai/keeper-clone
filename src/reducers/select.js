import { fromJS } from 'immutable';

import {
  SELECT_NOTE,
  DESELECT_NOTE,
  CLEAR_SELECTION,
} from '../constants/types';


/**
* default state
*/
const defaultState = fromJS({
  selecting: false,
  selectedNotes: [],
});


/**
* reducer
*/
const selectReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT_NOTE:
      return state
        .update('selecting', (selecting) => selecting || true)
        .update('selectedNotes', (notes) => notes.push(action.payload.id));
    case DESELECT_NOTE:
      return state
        .set('selecting', state.get('selectedNotes').size > 1)
        .update('selectedNotes', (notes) => notes.delete(
          notes.indexOf(action.payload.id)
        ));
    case CLEAR_SELECTION:
      return state
        .set('selecting', false)
        .update('selectedNotes', (notes) => notes.clear());
    default:
      return state;
  }
};


export default selectReducer;
