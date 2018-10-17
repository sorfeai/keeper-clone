import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import commonReducer from './common';
import notesReducer from './notes';
import selectReducer from './select';
import pinReducer from './pin';
import editReducer from './edit';
import trashReducer from './trash';
import notificationsReducer from './notifications';
import tagsReducer from './tags';


const rootReducer = combineReducers({
  form: formReducer,
  common: commonReducer,
  notes: notesReducer,
  select: selectReducer,
  pin: pinReducer,
  edit: editReducer,
  trash: trashReducer,
  notifications: notificationsReducer,
  tags: tagsReducer,
});


export default rootReducer;
