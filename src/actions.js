import {
  TOGGLE_FEED_VIEW,
  CLEAR_SELECTION,
  SELECT_NOTE,
  DESELECT_NOTE,
  MOVE_NOTES_TO_TRASH,
  RESTORE_NOTES_FROM_TRASH,
  CLEAR_TRASH,
  DELETE_NOTES,
  EMPTY_TRASH,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  START_REFRESH,
  PIN_NOTES,
  UNPIN_NOTES,
  UPDATE_SEARCH_QUERY,
  ENTER_SEARCH_MODE,
  EXIT_SEARCH_MODE,
  TOGGLE_MAIN_MENU,
  EDIT_NOTE,
  START_EDITING_NOTE,
  UPDATE_NOTE,
  END_EDITING_NOTE
} from './constants/types'


export const toggleFeedView = () => ({
  type: TOGGLE_FEED_VIEW
})

export const clearSelection = () => ({
  type: CLEAR_SELECTION
})

export const selectNote = id => ({
  type: SELECT_NOTE,
  payload: { id }
})

export const deselectNote = id => ({
  type: DESELECT_NOTE,
  payload: { id }
})

export const moveNotesToTrash = ids => ({
  type: MOVE_NOTES_TO_TRASH,
  payload: { ids }
})

export const restoreNotesFromTrash = ids => ({
  type: RESTORE_NOTES_FROM_TRASH,
  payload: { ids }
})

export const clearTrash = () => ({
  type: CLEAR_TRASH
})

export const emptyTrash = () => ({
  type: EMPTY_TRASH
})

export const deleteNotes = ids => ({
  type: DELETE_NOTES,
  payload: { ids }
})

export const showNotification = (type, message, action) => ({
  type: SHOW_NOTIFICATION,
  payload: { type, message, action }
})

export const hideNotification = id => ({
  type: HIDE_NOTIFICATION,
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

export const editNote = id => ({
  type: EDIT_NOTE,
  payload: { id }
})

export const startEditingNote = (id, title, content)  => ({
  type: START_EDITING_NOTE,
  payload: { id, title, content }
})

export const endEditingNote = () => ({
  type: END_EDITING_NOTE
})

export const updateNote = (id, changes) => ({
  type: UPDATE_NOTE,
  payload: { id, changes }
})
