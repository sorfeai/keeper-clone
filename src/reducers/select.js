import { fromJS } from 'immutable';

import {
  TOGGLE_SELECT_MODE,
  SELECT_NOTE,
  DESELECT_NOTE,
  CLEAR_SELECTION,
} from '../constants/types';


const defaultState = fromJS({
  selecting: false,
  selectedNotes: [],
});


const selectReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_SELECT_MODE:
      return state.update('selecting', (selecting) => !selecting);
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
