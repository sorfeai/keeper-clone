import { fromJS } from 'immutable';

import {
  PIN_NOTES,
  UNPIN_NOTES,
} from '../constants/types';


/**
* default state
*/
const defaultState = fromJS({ ids: [] });


/**
* reducer
*/
const pinReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PIN_NOTES:
      return state.update('ids', (notes) => notes.concat(action.payload.ids));
    case UNPIN_NOTES:
      return state.update('ids', (ids) =>
        ids.filterNot((id) => action.payload.ids.includes(id))
      );
    default:
      return state;
  }
};


export default pinReducer;
