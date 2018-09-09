import uuid from 'small-uuid'
import { List, Map } from 'immutable'

import {
  SHOW_TAGS_MODAL,
  HIDE_TAGS_MODAL,
  CREATE_TAG,
  DELETE_TAG
} from '../constants/types'


const defaultState = {
  tags: List(),
  isModalShown: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_TAG:
      return {
        ...state,
        tags: state.tags.push(Map({
          id: uuid.create(),
          title: action.payload.title
        }))
      }
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filterNot(tag =>
          action.payload.ids.includes(tag.get('id'))
        )
      }
    case SHOW_TAGS_MODAL:
      return {
        ...state,
        isModalShown: true
      }
    case HIDE_TAGS_MODAL:
      return {
        ...state,
        isModalShown: false
      }
    default:
      return state
  }
}
