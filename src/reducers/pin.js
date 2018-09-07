import { List } from 'immutable'

import { PIN_NOTES, UNPIN_NOTES } from '../constants/types'


const defaultState = {
  notesById: List()
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case PIN_NOTES:
      return {
        ...state,
        notesById: state.notesById.concat(action.payload.ids)
      }
    case UNPIN_NOTES:
      return {
        ...state,
        notesById: state.notesById.filterNot(
          id => action.payload.ids.includes(id)
        )
      }
    default:
      return state
  }
}
