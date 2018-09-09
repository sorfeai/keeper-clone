import { combineReducers } from 'redux'

import commonReducer from './common'
import selectReducer from './select'
import pinReducer from './pin'
import editReducer from './edit'
import trashReducer from './trash'
import notificationsReducer from './notifications'
import tagsReducer from './tags'


export default combineReducers({
  common: commonReducer,
  select: selectReducer,
  pin: pinReducer,
  edit: editReducer,
  trash: trashReducer,
  notifications: notificationsReducer,
  tags: tagsReducer
})
