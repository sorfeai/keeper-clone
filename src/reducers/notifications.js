import uuid from 'small-uuid';
import { Map, List } from 'immutable';

import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from '../constants/types';


const defaultState = Map({
  byId: Map(),
  allIds: List(),
});


const notificationsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      const { id = uuid.create(), type, message } = action.payload;
      const notification = Map({ id, type, message });

      // FIXME: move this functionality to saga
      // if (action.payload.action) {
        // notification = notification.set('action', () => {
        //   store.dispatch(hideNotification(id))
        //   action.payload.action()
        // })
      // }

      return state
        .update('byId', (notfs) => notfs.set(id, notification))
        .update('allIds', (ids) => ids.push(id));
    }
    case HIDE_NOTIFICATION: {
      const { id: removeId } = action.payload;

      return state
        .update('byId', (notfs) => notfs.delete(removeId))
        .update('allIds', (ids) => (
          ids.filterNot((id) => id === removeId)
        ));
    }
    default:
      return state;
  }
};


export default notificationsReducer;
