import { createSelector } from 'reselect';


export const getFormState = (state) => state.form;

export const getForm = (formName) => createSelector(
  getFormState,
  (formState) => formState && formState[formName]
);

export const getFormValue = (formName, fieldName) => createSelector(
  getForm(formName),
  (form) => form && form.values[fieldName]
);

export const getFormErrors = (formName) => createSelector(
  getForm(formName),
  (form) => form && form.syncErrors
);
