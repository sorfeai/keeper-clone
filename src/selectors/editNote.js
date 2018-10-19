export const getEditNoteId = (state) =>
  state.edit.get('id');

export const getEditNoteFormTitle = (state) =>
  state.form.editNote.values.title;

export const getEditNoteFormContent = (state) =>
  state.form.editNote.values.content;

export const getEditNoteFormErrors = (state) =>
  state.form.editNote.syncErrors;
