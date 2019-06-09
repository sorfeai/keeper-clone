import capitalize from 'lodash/capitalize';

import {
  TOGGLE_USER_MENU,
  SET_USER,
  SET_MAX_COLUMNS,
  SEARCH_INPUT_UPDATED,
  INIT_APP,
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
  NEW_NOTE,
  CREATE_NOTE,
  SELECT_NOTE,
  DESELECT_NOTE,
  APPLY_TAGS,
  ADD_TAGS_TO_NOTE,
  REMOVE_TAG_FROM_NOTE,
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
  EDIT_NOTE_START,
  UPDATE_NOTE,
  SAVE_EDITED_NOTE,
  EDIT_NOTE_END,
  SUBMIT_CREATE_TAG,
  SUBMIT_EDIT_TAG,
  CREATE_TAG,
  DELETE_TAG,
  SHOW_TAGS_MODAL,
  HIDE_TAGS_MODAL,
  SHOW_APPLY_TAGS,
  HIDE_APPLY_TAGS,
  START_EDITING_TAG,
  END_EDITING_TAG,
  UPDATE_TAG,
  SET_TAG_FILTER,
  RESET_TAG_FILTER,
} from './constants/types';


export const toggleUserMenu = () => ({
  type: TOGGLE_USER_MENU,
});

export const setUser = ({
  username,
  firstName,
  lastName,
  email,
  avatar,
}) => ({
  type: SET_USER,
  payload: {
    username,
    firstName: capitalize(firstName),
    lastName: capitalize(lastName),
    email,
    avatar,
  },
});

export const setMaxColumns = (maxColumns) => ({
  type: SET_MAX_COLUMNS,
  payload: {
    maxColumns,
  },
});

export const searchInputUpdated = () => ({
  type: SEARCH_INPUT_UPDATED,
});

export const initApp = () => ({
  type: INIT_APP,
});

export const splitToColumns = (data, maxColumns) => ({
  type: SPLIT_TO_COLUMNS,
  payload: {
    data,
    maxColumns,
  },
});

export const splitToColumnsDone = (data) => ({
  type: SPLIT_TO_COLUMNS_DONE,
  payload: {
    data,
  },
});

export const splitByPin = (data) => ({
  type: SPLIT_BY_PIN,
  payload: {
    data,
  },
});

export const splitByPinDone = (pinned, unpinned) => ({
  type: SPLIT_BY_PIN_DONE,
  payload: {
    pinned,
    unpinned,
  },
});

export const applySearchFilter = (data) => ({
  type: APPLY_SEARCH_FILTER,
  payload: {
    data,
  },
});

export const applySearchFilterDone = (data) => ({
  type: APPLY_SEARCH_FILTER_DONE,
  payload: {
    data,
  },
});

export const formatNotesForFeed = (data) => ({
  type: FORMAT_NOTES_FOR_FEED,
  payload: {
    data,
  },
});

export const formatNotesForFeedDone = (data) => ({
  type: FORMAT_NOTES_FOR_FEED_DONE,
  payload: {
    data,
  },
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: {
    page,
  },
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
  payload: {
    id,
  },
});

export const selectNote = (id) => ({
  type: SELECT_NOTE,
  payload: {
    id,
  },
});

export const deselectNote = (id) => ({
  type: DESELECT_NOTE,
  payload: {
    id,
  },
});

export const applyTags = (noteId) => ({
  type: APPLY_TAGS,
  payload: {
    noteId,
  },
});

export const addTagsToNote = (noteId, tagIds) => ({
  type: ADD_TAGS_TO_NOTE,
  payload: {
    noteId,
    tagIds,
  },
});

export const removeTagFromNote = (noteId, tagId) => ({
  type: REMOVE_TAG_FROM_NOTE,
  payload: {
    noteId,
    tagId,
  },
});

export const moveNotesToTrash = (ids) => ({
  type: MOVE_NOTES_TO_TRASH,
  payload: {
    ids,
  },
});

export const restoreNotesFromTrash = (ids) => ({
  type: RESTORE_NOTES_FROM_TRASH,
  payload: {
    ids,
  },
});

export const clearTrash = () => ({
  type: CLEAR_TRASH,
});

export const emptyTrash = () => ({
  type: EMPTY_TRASH,
});

export const deleteNotes = (ids) => ({
  type: DELETE_NOTES,
  payload: {
    ids,
  },
});

export const showNotification = ({
  id,
  type,
  message,
  action,
}) => ({
  type: SHOW_NOTIFICATION,
  payload: {
    id,
    type,
    message,
    action,
  },
});

export const hideNotification = (id) => ({
  type: HIDE_NOTIFICATION,
  payload: {
    id,
  },
});

export const startRefresh = () => ({
  type: START_REFRESH,
});

export const togglePinNotes = (ids) => ({
  type: TOGGLE_PIN_NOTES,
  payload: {
    ids,
  },
});

export const pinNotes = (ids) => ({
  type: PIN_NOTES,
  payload: {
    ids,
  },
});

export const unpinNotes = (ids) => ({
  type: UNPIN_NOTES,
  payload: {
    ids,
  },
});

export const updateSearchQuery = (val) => ({
  type: UPDATE_SEARCH_QUERY,
  payload: {
    val,
  },
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
  payload: {
    id,
  },
});

export const startEditingNote = (id, title, content)  => ({
  type: EDIT_NOTE_START,
  payload: {
    id,
    title,
    content,
  },
});

export const endEditingNote = () => ({
  type: EDIT_NOTE_END,
});

export const newNote = () => ({
  type: NEW_NOTE,
});

export const createNote = ({ id, title, content, tags }) => ({
  type: CREATE_NOTE,
  payload: {
    id,
    title,
    content,
    tags,
  },
});

export const updateNote = (id, changes) => ({
  type: UPDATE_NOTE,
  payload: {
    id,
    changes,
  },
});

export const saveEditedNote = () => ({
  type: SAVE_EDITED_NOTE,
});

export const showTagsModal = () => ({
  type: SHOW_TAGS_MODAL,
});

export const hideTagsModal = () => ({
  type: HIDE_TAGS_MODAL,
});

export const showApplyTags = (noteId) => ({
  type: SHOW_APPLY_TAGS,
  payload: {
    noteId,
  }
});

export const hideApplyTags = () => ({
  type: HIDE_APPLY_TAGS,
});

export const submitCreateTag = (title) => ({
  type: SUBMIT_CREATE_TAG,
  payload: {
    title,
  },
});

export const submitEditTag = (title) => ({
  type: SUBMIT_EDIT_TAG,
  payload: {
    title,
  },
});

export const createTag = (title) => ({
  type: CREATE_TAG,
  payload: {
    title,
  },
});

export const updateTag = (id, title) => ({
  type: UPDATE_TAG,
  payload: {
    id,
    title,
  },
});

export const deleteTags = (ids) => ({
  type: DELETE_TAG,
  payload: {
    ids,
  },
});

export const startEditingTag = (id) => ({
  type: START_EDITING_TAG,
  payload: {
    id,
  },
});

export const endEditingTag = () => ({
  type: END_EDITING_TAG,
});

export const setTagFilter = (tagId) => ({
  type: SET_TAG_FILTER,
  payload: {
    tagId,
  }
});

export const resetTagFilter = () => ({
  type: RESET_TAG_FILTER,
});
