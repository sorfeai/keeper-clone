import { List } from 'immutable'

import {
  MOVE_NOTES_TO_TRASH,
  RESTORE_NOTES_FROM_TRASH,
  EMPTY_TRASH
} from '../constants/types'


const defaultState = {
  notesById: List()
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case MOVE_NOTES_TO_TRASH:
      return {
        ...state,
        notesById: state.notesById.concat(action.payload.ids)
      }
    case RESTORE_NOTES_FROM_TRASH:
      return {
        ...state,
        notesById: state.notesById.filterNot(id =>
          action.payload.ids.includes(id)
        )
      }
    case EMPTY_TRASH:
      return {
        ...state,
        notesById: state.notesById.clear()
      }
    default:
      return state
  }
}
