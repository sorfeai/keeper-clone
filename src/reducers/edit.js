import { Map } from 'immutable'

import {
  UPDATE_NOTE,
  START_EDITING_NOTE,
  END_EDITING_NOTE
 } from '../constants/types'


const defaultState = {
  editing: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case START_EDITING_NOTE:
      const { id, title, content } = action.payload

      return {
        ...state,
        editing: true,
        id,
        title,
        content
      }
    case END_EDITING_NOTE:
      return {
        ...state,
        editing: false,
        id: null
      }
    default:
      return state
  }
}
