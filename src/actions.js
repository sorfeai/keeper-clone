import {
  FORMAT_NOTES_FOR_FEED,
  FORMAT_NOTES_FOR_FEED_DONE,
  APPLY_SEARCH_FILTER,
  APPLY_SEARCH_FILTER_DONE,
  SPLIT_BY_PIN,
  SPLIT_BY_PIN_DONE,
  SPLIT_TO_COLUMNS,
  SPLIT_TO_COLUMNS_DONE,
  SET_PAGE,
  TOGGLE_FEED_VIEW,
  CLEAR_SELECTION,
  TOGGLE_IS_SELECTING,
  TOGGLE_SELECT_NOTE,
  CREATE_NOTE,
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


export const splitToColumns = (data) => ({
  type: SPLIT_TO_COLUMNS,
  payload: { data },
});

export const splitToColumnsDone = (data) => ({
  type: SPLIT_TO_COLUMNS,
  payload: { data },
});

export const splitByPin = (data) => ({
  type: SPLIT_BY_PIN,
  payload: { data },
});

export const splitByPinDone = (pinned, other) => ({
  type: SPLIT_BY_PIN_DONE,
  payload: { pinned, other },
});

export const applySearchFilter = (data) => ({
  type: APPLY_SEARCH_FILTER,
  payload: { data },
});

export const applySearchFilterDone = (data) => ({
  type: APPLY_SEARCH_FILTER_DONE,
  payload: { data },
});

export const formatNotesForFeed = (data) => ({
  type: FORMAT_NOTES_FOR_FEED,
  payload: { data },
});

export const formatNotesForFeedDone = (data) => ({
  type: FORMAT_NOTES_FOR_FEED_DONE,
  payload: { data },
});

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
  type: TOGGLE_IS_SELECTING,
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

export const tagNote = (noteId, tagIds) => ({
  type: TAG_NOTE,
  payload: { noteId, tagIds },
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

export const showNotification = ({ id, type, message, action }) => ({
  type: SHOW_NOTIFICATION,
  payload: { id, type, message, action },
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

export const createNote = ({ id, title, content, tags }) => ({
  type: CREATE_NOTE,
  payload: { id, title, content, tags },
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
