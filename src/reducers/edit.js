import { Map } from 'immutable';

import {
  START_EDITING_NOTE,
  END_EDITING_NOTE,
} from '../constants/types';


const defaultState = Map({
  editing: false,
  id: null,
});


const editReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_EDITING_NOTE: {
      return state.merge({ id: action.payload.id, editing: true });
    }
    case END_EDITING_NOTE:
      return state.merge({ editing: false, id: null });
    default:
      return state;
  }
};


export default editReducer;
