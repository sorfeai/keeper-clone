import { List } from 'immutable'
import { SELECT_NOTE, DESELECT_NOTE, CLEAR_SELECTION } from '../constants/types'


const defaultState = {
  selecting: false,
  selectedNotes: List()
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SELECT_NOTE:
      return {
        ...state,
        selecting: state.selecting || true,
        selectedNotes: state.selectedNotes.push(action.payload.id)
      }
    case DESELECT_NOTE:
      return {
        ...state,
        selecting: state.selectedNotes.size > 1,
        selectedNotes: state.selectedNotes.delete(
          state.selectedNotes.indexOf(action.payload.id)
        )
      }
    case CLEAR_SELECTION:
      return {
        ...state,
        selecting: false,
        selectedNotes: state.selectedNotes.clear()
      }
    default:
      return state
  }
}
