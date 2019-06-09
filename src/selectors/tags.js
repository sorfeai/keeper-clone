import { createSelector } from 'reselect';


export const getTags = (state) => state.tags;

export const getTagsById = createSelector(
  getTags,
  (tags) => tags.get('byId')
);

export const getTagsTagById = (id) => createSelector(
  getTagsById,
  (byId) => byId.get(id)
);

export const getTagsAllIds = createSelector(
  getTags,
  (tags) => tags.get('allIds')
);

export const getTagsEditingId = createSelector(
  getTags,
  (tags) => tags.get('editingId')
);

export const getTagsIsModalShown = createSelector(
  getTags,
  (tags) => tags.get('isModalShown')
);

export const getTagsIsApplyTagsShown = createSelector(
  getTags,
  (tags) => tags.get('isApplyTagsShown')
);
