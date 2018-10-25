export const getNotesRaw = (state) =>
  state.notes.get('byId');

export const getNoteById = (state, id) =>
  state.notes
  .get('byId')
  .find((note) => note.get('id') === id);
