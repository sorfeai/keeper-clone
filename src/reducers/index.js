import { List } from 'immutable'

import {
  TOGGLE_FEED_VIEW,
  CANCEL_SELECTING,
  SELECT_NOTE,
  DESELECT_NOTE,
  DELETE_SELECTED_NOTES
} from '../constants/actionTypes'


const defaultState = {
  notesData: [
    {
      "id": "1",
      "title": "Todo List",
      "content": "One, two... and finally three!"
    },
    {
      "id": "2",
      "title": "Todo List",
      "content": "One, two... and finally three!"
    },
    {
      "id": "3",
      "title": "Todo List",
      "content": "One, two... and finally three!"
    }
  ],
  feedViewIsGrid: true,
  notesSelecting: false,
  selectedNotes: List()
}

export default (state = defaultState, action) => {
  let selectedNotes

  switch (action.type) {
    case TOGGLE_FEED_VIEW:
      return {
        ...state,
        feedViewIsGrid: !state.feedViewIsGrid
      }
    case SELECT_NOTE:
      selectedNotes = state.selectedNotes.push(action.payload.id)

      return {
        ...state,
        selectedNotes,
        notesSelecting: state.notesSelecting || true
      }
    case DESELECT_NOTE:
      selectedNotes = state.selectedNotes.filter(
        id => id !== action.payload.id
      )

      return {
        ...state,
        selectedNotes,
        notesSelecting: selectedNotes.size === 0 ? false :  state.notesSelecting
      }
    case CANCEL_SELECTING:
      return {
        ...state,
        selectedNotes: List(),
        notesSelecting: false
      }
    case DELETE_SELECTED_NOTES:
      // переделать: раздвоить этот экшн на мидлдвеере
      return {
        ...state,
        selectedNotes: List(),
        notesSelecting: false,
        notesData: state.notesData.filter(
          note => !state.selectedNotes.includes(note.id)
        )
      }
    default:
      return state
  }
}
