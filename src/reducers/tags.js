import uuid from 'small-uuid';
import { fromJS } from 'immutable';

import {
  SHOW_TAGS_MODAL,
  HIDE_TAGS_MODAL,
  CREATE_TAG,
  DELETE_TAG,
  UPDATE_TAG,
  START_EDITING_TAG,
  END_EDITING_TAG,
} from '../constants/types';


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
  editingId: null,
});


const tagsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_TAG: {
      const id = uuid.create();
      const { title } = action.payload;

      return state
        .update(
          'byId',
          (byId) => byId.set(id, fromJS({ id, title }))
        )
        .update(
          'allIds',
          (allIds) => allIds.push(id)
        );
    }
    case UPDATE_TAG: {
      const { id, title } = action.payload;

      return state
        .updateIn(
          ['byId', id],
          (tag) => tag.set('title', title)
        );
    }
    case DELETE_TAG: {
      const { ids: payloadIds } = action.payload;

      return state
        .update(
          'byId',
          (tags) => tags.filterNot((tag) =>
            payloadIds.includes(tag.get('id'))
          )
        )
        .update(
          'allIds',
          (ids) => ids.filterNot((id) =>
            payloadIds.includes(id)
          )
        );
      }
    case SHOW_TAGS_MODAL:
      return state.set('isModalShown', true);
    case HIDE_TAGS_MODAL:
      return state.set('isModalShown', false);
    case START_EDITING_TAG:
      return state.set('editingId', action.payload.id);
    case END_EDITING_TAG:
      return state.set('editingId', null);
    default:
      return state;
  }
};


export default tagsReducer;
