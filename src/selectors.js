export const getNoteById = (state, id) =>
  state.common.notesData
    .find(note => note.get('id') === id)

export const getNotesInTrash = state =>
  state.trash.notesById
