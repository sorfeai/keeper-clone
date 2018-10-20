import {
  SET_PAGE,
  TOGGLE_FEED_VIEW,
  CLEAR_SELECTION,
  TOGGLE_SELECT_MODE,
  TOGGLE_SELECT_NOTE,
  SELECT_NOTE,
  DESELECT_NOTE,
  TAG_NOTE,
  MOVE_NOTES_TO_TRASH,
  RESTORE_NOTES_FROM_TRASH,
  CLEAR_TRASH,
  DELETE_NOTES,
  EMPTY_TRASH,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  START_REFRESH,
  TOGGLE_PIN_NOTES,
  PIN_NOTES,
  UNPIN_NOTES,
  UPDATE_SEARCH_QUERY,
  ENTER_SEARCH_MODE,
  EXIT_SEARCH_MODE,
  TOGGLE_MAIN_MENU,
  EDIT_NOTE,
  START_EDITING_NOTE,
  UPDATE_NOTE,
  SAVE_EDITED_NOTE,
  END_EDITING_NOTE,
  SUBMIT_CREATE_TAG,
  SUBMIT_EDIT_TAG,
  CREATE_TAG,
  DELETE_TAG,
  SHOW_TAGS_MODAL,
  HIDE_TAGS_MODAL,
  START_EDITING_TAG,
  END_EDITING_TAG,
  UPDATE_TAG,
} from './constants/types';


export const setPage = (page) => ({
  type: SET_PAGE,
  payload: { page },
});

export const toggleFeedView = () => ({
  type: TOGGLE_FEED_VIEW,
});

export const clearSelection = () => ({
  type: CLEAR_SELECTION,
});

export const toggleSelectMode = () => ({
  type: TOGGLE_SELECT_MODE,
});

export const toggleSelectNote = (id) => ({
  type: TOGGLE_SELECT_NOTE,
  payload: { id },
});

export const selectNote = (id) => ({
  type: SELECT_NOTE,
  payload: { id },
});

export const deselectNote = (id) => ({
  type: DESELECT_NOTE,
  payload: { id },
});

export const tagNote = (noteId, tagId) => ({
  type: TAG_NOTE,
  payload: { noteId, tagId },
});

export const moveNotesToTrash = (ids) => ({
  type: MOVE_NOTES_TO_TRASH,
  payload: { ids },
});

export const restoreNotesFromTrash = (ids) => ({
  type: RESTORE_NOTES_FROM_TRASH,
  payload: { ids },
});

export const clearTrash = () => ({
  type: CLEAR_TRASH,
});

export const emptyTrash = () => ({
  type: EMPTY_TRASH,
});

export const deleteNotes = (ids) => ({
  type: DELETE_NOTES,
  payload: { ids },
});

export const showNotification = (type, message, action) => ({
  type: SHOW_NOTIFICATION,
  payload: { type, message, action },
});

export const hideNotification = (id) => ({
  type: HIDE_NOTIFICATION,
  payload: { id },
});

export const startRefresh = () => ({
  type: START_REFRESH,
});

export const togglePinNotes = (ids) => ({
  type: TOGGLE_PIN_NOTES,
  payload: { ids },
});

export const pinNotes = (ids) => ({
  type: PIN_NOTES,
  payload: { ids },
});

export const unpinNotes = (ids) => ({
  type: UNPIN_NOTES,
  payload: { ids },
});

export const updateSearchQuery = (val) => ({
  type: UPDATE_SEARCH_QUERY,
  payload: { val },
});

export const enterSearchMode = () => ({
  type: ENTER_SEARCH_MODE,
});

export const exitSearchMode = () => ({
  type: EXIT_SEARCH_MODE,
});

export const toggleMainMenu = () => ({
  type: TOGGLE_MAIN_MENU,
});

export const editNote = (id) => ({
  type: EDIT_NOTE,
  payload: { id },
});

export const startEditingNote = (id, title, content)  => ({
  type: START_EDITING_NOTE,
  payload: { id, title, content },
});

export const endEditingNote = () => ({
  type: END_EDITING_NOTE,
});

export const updateNote = (id, changes) => ({
  type: UPDATE_NOTE,
  payload: { id, changes },
});

export const saveEditedNote = () => ({
  type: SAVE_EDITED_NOTE,
});

export const showTagsModal = (title) => ({
  type: SHOW_TAGS_MODAL,
});

export const hideTagsModal = (title) => ({
  type: HIDE_TAGS_MODAL,
});

export const submitCreateTag = (title) => ({
  type: SUBMIT_CREATE_TAG,
  payload: { title },
});

export const submitEditTag = (title) => ({
  type: SUBMIT_EDIT_TAG,
  payload: { title },
});

export const createTag = (title) => ({
  type: CREATE_TAG,
  payload: { title },
});

export const updateTag = (id, title) => ({
  type: UPDATE_TAG,
  payload: { id, title },
});

export const deleteTags = (ids) => ({
  type: DELETE_TAG,
  payload: { ids },
});

export const startEditingTag = (id) => ({
  type: START_EDITING_TAG,
  payload: { id },
});

export const endEditingTag = () => ({
  type: END_EDITING_TAG,
});
