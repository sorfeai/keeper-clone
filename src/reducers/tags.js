import uuid from 'small-uuid';
import { fromJS } from 'immutable';

import {
  SHOW_TAGS_MODAL,
  HIDE_TAGS_MODAL,
  CREATE_TAG,
  DELETE_TAG,
  SAVE_EDITED_TAG,
} from '../constants/types';


/**
* default state
*/
const defaultState = fromJS({
  byId: {
    '01': {
      id: '01',
      title: 'useless notes',
    },
    '02': {
      id: '02',
      title: 'useful notes',
    },
  },
  allIds: ['01', '02'],
  isModalShown: false,
});


/**
* reducer
*/
const tagsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_TAG: {
      const id = uuid.create();
      return state
        .updateIn(
          'byId',
          (byId) => byId.set(
            id,
            { id, title: action.payload.title }
          )
        )
        .updateIn(
          'allIds',
          (allIds) => allIds.push(id)
        );
    }
    case DELETE_TAG:
      return state
        .updateIn(
          'byId',
          (tags) => tags.filterNot((tag) =>
            action.payload.ids.includes(tag.get('id'))
          )
        )
        .updateIn(
          'allIds',
          (ids) => ids.filterNot(
            (id) => action.payload.ids.includes(id)
          )
        );
    case SHOW_TAGS_MODAL:
      return state.set('isModalShown', true);
    case HIDE_TAGS_MODAL:
      return state.set('isModalShown', false);
    case SAVE_EDITED_TAG:
      return state.updateIn(
        ['byId', action.payload.id],
        (tag) => tag.merge(action.payload.data)
      );
    default:
      return state;
  }
};


export default tagsReducer;
