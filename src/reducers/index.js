import uuid from 'small-uuid'
import { fromJS, List, Map } from 'immutable'
import { notesDeletedMessage, notesRestoredMessage } from '../messages'

import {
  NOTIFICATION_INFO,
  NOTIFICATION_DANGER,
  DELETION_DELETE,
  TOGGLE_FEED_VIEW,
  CANCEL_SELECTING,
  SELECT_NOTE,
  DESELECT_NOTE,
  DELETE_SELECTED_NOTES,
  REMOVE_NOTIFICATION,
  CANCEL_DELETION,
  START_REFRESH,
  REFRESH_IN_PROGRESS,
  PIN_NOTES,
  UNPIN_NOTES
} from '../constants/types'


const defaultState = {
  notesData: fromJS([
    {
      id: uuid.create(),
      deleting: false,
      title: "Todo List",
      content: "One, two... and finally three!",
      pinned: false
    },
    {
      id: uuid.create(),
      deleting: false,
      title: "Todo List",
      content: "One, two... and finally three!",
      pinned: false
    },
    {
      id: uuid.create(),
      deleting: false,
      title: "Todo List",
      content: "One, two... and finally three!",
      pinned: false
    }
  ]),
  feedViewIsGrid: true,
  notesSelecting: false,
  selectedNotes: List(),
  deletions: List(),
  notifications: List(),
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
  let selectedNotes

  switch (action.type) {
    case TOGGLE_FEED_VIEW:
      return {
        ...state,
        feedViewIsGrid: !state.feedViewIsGrid
      }
    case SELECT_NOTE:
      selectedNotes = state.selectedNotes.push(action.payload.id)

      return {
        ...state,
        selectedNotes,
        notesSelecting: state.notesSelecting || true
      }
    case DESELECT_NOTE:
      selectedNotes = state.selectedNotes.filter(
        id => id !== action.payload.id
      )

      return {
        ...state,
        selectedNotes,
        notesSelecting: selectedNotes.size === 0 ? false :  state.notesSelecting
      }
    case CANCEL_SELECTING:
      return {
        ...state,
        selectedNotes: List(),
        notesSelecting: false
      }
    case DELETE_SELECTED_NOTES:
      const deletionIdId = uuid.create()

      return {
        ...state,
        selectedNotes: List(),
        notesSelecting: false,
        notesData: state.notesData.map(note => {
          if (state.selectedNotes.includes(note.get('id'))) {
            return note.set('deleting', true)
          } else return note
        }),
        deletions: state.deletions.push(Map({
          id: deletionIdId,
          type: DELETION_DELETE,
          notes: state.selectedNotes.map(note => note)
        })),
        notifications: state.notifications.push(Map({
          id: uuid.create(),
          type: NOTIFICATION_INFO,
          deletionId: deletionIdId,
          message: notesDeletedMessage.format({
            notesCount: state.selectedNotes.size
          })
        }))
      }
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          ntf => ntf.get('id') !== action.payload.id
        )
      }
    case CANCEL_DELETION:
      const { id } = action.payload

      let restoredNotes = state.deletions
        .filter(op => op.get('id') === id)
        .getIn([0, 'notes'])

      return {
        ...state,
        notesData: state.notesData.map(note => {
          if (restoredNotes.includes(note.get('id'))) {
            return note.set('deleting', false)
          } else return note
        }),
        deletions: state.deletions
          .filter(op => op.get('id') !== id),
        notifications: state.notifications.push(Map({
          id: uuid.create(),
          type: NOTIFICATION_INFO,
          message: notesRestoredMessage.format({
            notesCount: restoredNotes.size
          })
        }))
      }
    case START_REFRESH:
      return {
        ...state,
        refreshStatus: REFRESH_IN_PROGRESS
      }
    case PIN_NOTES:
      return {
        ...state,
        notesData: state.notesData.map(note => {
          if (action.payload.ids.includes(note.get('id'))) {
            return note.set('pinned', true)
          } else return note
        })
      }
    case UNPIN_NOTES:
      return {
        ...state,
        notesData: state.notesData.map(note => {
          if (action.payload.ids.includes(note.get('id'))) {
            return note.set('pinned', false)
          } else return note
        })
      }
    default:
      return state
  }
}
