import uuid from 'small-uuid'
import { fromJS, List, Map } from 'immutable'
import { notesDeletedMessage, notesRestoredMessage } from '../messages'

import {
  TOGGLE_FEED_VIEW,
  START_REFRESH,
  REFRESH_IN_PROGRESS,
  UPDATE_SEARCH_QUERY,
  ENTER_SEARCH_MODE,
  EXIT_SEARCH_MODE,
  TOGGLE_MAIN_MENU,
  UPDATE_NOTE,
  DELETE_NOTES
} from '../constants/types'


const defaultState = {
  notesData: fromJS([
    {
      id: uuid.create(),
      deleting: false,
      title: 'Todo List',
      content: 'One, two... and finally three!'
    },
    {
      id: uuid.create(),
      deleting: false,
      title: 'Todo List',
      content: 'One, two... and finally three!'
    },
    {
      id: uuid.create(),
      deleting: false,
      title: 'Todo List',
      content: 'One, two... and finally three!'
    }
  ]),
  mainMenuActive: false,
  feedViewIsGrid: true,
  searching: false,
  searchQuery: '',
  refreshStatus: null,
  user: Map({
    username: '@aisorfe',
    firstName: 'Nikita',
    lastName: 'Belousov',
    email: 'seriouscat1001@gmail.com',
    avatar: 'user-avatar.jpg'
  })
}

export default (state = defaultState, action) => {
  let selectedNotes, id, changes

  switch (action.type) {
    case TOGGLE_FEED_VIEW:
      return {
        ...state,
        feedViewIsGrid: !state.feedViewIsGrid
      }
    case START_REFRESH:
      return {
        ...state,
        refreshStatus: REFRESH_IN_PROGRESS
      }
    case ENTER_SEARCH_MODE:
      return {
        ...state,
        searching: true
      }
    case EXIT_SEARCH_MODE:
      return {
        ...state,
        searching: false
      }
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.val
      }
    case TOGGLE_MAIN_MENU:
      return {
        ...state,
        mainMenuActive: !state.mainMenuActive
      }
    case UPDATE_NOTE:
      id = action.payload.id
      changes = action.payload.changes

      return {
        ...state,
        notesData: state.notesData.map(note => {
          if (note.get('id') === id) {
            return note.merge(changes)
          } else return note
        })
      }
    case DELETE_NOTES:
      return {
        ...state,
        notesData: state.notesData.filterNot(
          note => action.payload.ids.includes(note.get('id'))
        )
      }
    default:
      return state
  }
}
