import {
  TOGGLE_FEED_VIEW,
  CANCEL_SELECTING,
  SELECT_NOTE,
  DESELECT_NOTE,
  DELETE_SELECTED_NOTES
} from './constants/actionTypes'


export const toggleFeedView = () => ({
  type: TOGGLE_FEED_VIEW
})

export const cancelSelecting = () => ({
  type: CANCEL_SELECTING
})

export const selectNote = id => ({
  type: SELECT_NOTE,
  payload: { id }
})

export const deselectNote = id => ({
  type: DESELECT_NOTE,
  payload: { id }
})

export const deleteSelectedNotes = () => ({
  type: DELETE_SELECTED_NOTES
})
