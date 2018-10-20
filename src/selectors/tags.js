export const getTagById = (id) => (state) =>
  state.tags.getIn(['byId', id]);

export const getCreateTagValue = (state) =>
  state.form.tags.values.create;

export const getEditTagValue = (state) =>
  state.form.tags.values.edit;

export const getEditingTagId = (state) =>
  state.tags.get('editingId');
