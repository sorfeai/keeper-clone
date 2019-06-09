import { createSelector } from 'reselect';


export const getTrash = (state) => state.trash;

export const getTrashNotesIds = createSelector(
  getTrash,
  (trash) => trash.get('notesIds')
);
