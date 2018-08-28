import { TOGGLE_FEED_VIEW } from '../constants/actionTypes'


export default (state = { feedViewIsGrid: true }, action) => {
  switch (action.type) {
    case TOGGLE_FEED_VIEW:
      return {
        ...state,
        feedViewIsGrid: !state.feedViewIsGrid
      }
    default:
      return state
  }
}
