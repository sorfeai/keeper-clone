export const getSearchQuery = (state) => {
  const { search } = state.form;
  return search ? search.inputs.search : '';
};
