import {
  TOGGLE_FEED_VIEW,
  CANCEL_SELECTING,
  SELECT_NOTE,
  DESELECT_NOTE,
  DELETE_SELECTED_NOTES,
  REMOVE_NOTIFICATION,
  CANCEL_DELETION,
  START_REFRESH,
  PIN_NOTES,
  UNPIN_NOTES,
  UPDATE_SEARCH_QUERY,
  ENTER_SEARCH_MODE,
  EXIT_SEARCH_MODE,
  TOGGLE_MAIN_MENU
} from './constants/types'


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

export const removeNotification = id => ({
  type: REMOVE_NOTIFICATION,
  payload: { id }
})

export const cancelDeletion = id => ({
  type: CANCEL_DELETION,
  payload: { id }
})

export const startRefresh = () => ({
  type: START_REFRESH
})

export const pinNotes = ids => ({
  type: PIN_NOTES,
  payload: { ids }
})

export const unpinNotes = ids => ({
  type: UNPIN_NOTES,
  payload: { ids }
})

export const updateSearchQuery = val => ({
  type: UPDATE_SEARCH_QUERY,
  payload: { val }
})

export const enterSearchMode = () => ({
  type: ENTER_SEARCH_MODE
})

export const exitSearchMode = () => ({
  type: EXIT_SEARCH_MODE
})

export const toggleMainMenu = () => ({
  type: TOGGLE_MAIN_MENU
})
