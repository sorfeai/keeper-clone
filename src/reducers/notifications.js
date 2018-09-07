import uuid from 'small-uuid'
import { store } from '..'
import { List, Map } from 'immutable'
import { hideNotification } from '../actions'

import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from '../constants/types'


const defaultState = {
  notifications: List()
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      const id = uuid.create()
      let notification = Map({
        id,
        type: action.payload.type,
        message: action.payload.message
      })
      if (action.payload.action) {
        notification = notification.set('action', () => {
          store.dispatch(hideNotification(id))
          action.payload.action()
        })
      }

      return {
        ...state,
        notifications: state.notifications.push(notification)
      }
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filterNot(
          ntf => ntf.get('id') === action.payload.id
        )
      }
    default:
      return state
  }
}
