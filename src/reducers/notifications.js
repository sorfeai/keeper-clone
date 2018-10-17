import uuid from 'small-uuid';
import { fromJS, Map } from 'immutable';

import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from '../constants/types';


/**
* default state
*/
const defaultState = fromJS({
  notifications: [],
});


/**
* reducer
*/
const notificationsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      const id = uuid.create();
      const notification = Map({
        id,
        type: action.payload.type,
        message: action.payload.message,
      });

      // FIXME: move this functionality to saga
      if (action.payload.action) {
        // notification = notification.set('action', () => {
        //   store.dispatch(hideNotification(id))
        //   action.payload.action()
        // })
      }

      return state.update('notification', (ntfs) => ntfs.push(notification));
    }
    case HIDE_NOTIFICATION:
      return state.update('notifications', (ntfs) => ntfs.filterNot(
        (ntf) => ntf.get('id') === action.payload.id
      ));
    default:
      return state;
  }
};


export default notificationsReducer;
