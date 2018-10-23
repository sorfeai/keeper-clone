import { fromJS } from 'immutable';

import {
  TOGGLE_IS_SELECTING,
  SELECT_NOTE,
  DESELECT_NOTE,
  CLEAR_SELECTION,
} from '../constants/types';


const defaultState = fromJS({
  selecting: false,
  selectedIds: [],
});


const selectReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_IS_SELECTING:
      return state.update('isSelecting', (selecting) => !selecting);
    case SELECT_NOTE: {
      const { id } = action.payload;
      return state
        .update('selectedIds', (notes) => notes.push(id));
    }
    case DESELECT_NOTE: {
      const { id } = action.payload;
      return state
        .update('selectedIds', (notes) => (
          notes.delete(notes.indexOf(id))
        ));
    }
    case CLEAR_SELECTION:
      return state
        .set('selecting', false)
        .update('selectedIds', (notes) => notes.clear());
    default:
      return state;
  }
};


export default selectReducer;
