import { createSelector } from 'reselect';


export const getNotes = (state) => state.notes;

export const getNotesById = createSelector(
  getNotes,
  (notes) => notes.get('byId')
);

export const getNotesNoteById = (id) => createSelector(
  getNotesById,
  (byId) => byId.get(id)
);

export const getNotesAllIds = createSelector(
  getNotes,
  (notes) => notes.get('allIds')
);

export const getNotesFeed = createSelector(
  getNotes,
  (notes) => notes.get('feed')
);

export const getNotesPinnedIds = createSelector(
  getNotes,
  (notes) => notes.get('pinnedIds')
);

export const getNotesIsEditing = createSelector(
  getNotes,
  (notes) => notes.get('isEditing')
);

export const getNotesEditingId = createSelector(
  getNotes,
  (notes) => notes.get('editingId')
);

export const getNotesIsSelecting = createSelector(
  getNotes,
  (notes) => notes.get('isSelecting')
);

export const getNotesSelectedIds = createSelector(
  getNotes,
  (notes) => notes.get('selectedIds')
);

export const getNotesTagFilter = createSelector(
  getNotes,
  (notes) => notes.get('tagFilter')
);
