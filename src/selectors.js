export const getNoteById = (state, id) =>
  state.common.notesData
    .find(note => note.get('id') === id)
