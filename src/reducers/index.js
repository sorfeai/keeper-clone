import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import appReducer from './app';
import notesReducer from './notes';
import trashReducer from './trash';
import notificationsReducer from './notifications';
import tagsReducer from './tags';


const rootReducer = combineReducers({
  app: appReducer,
  form: formReducer,
  notes: notesReducer,
  trash: trashReducer,
  notifications: notificationsReducer,
  tags: tagsReducer,
});


export default rootReducer;
