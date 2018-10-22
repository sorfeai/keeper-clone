import { expectSaga } from 'redux-saga-test-plan';
import { notesMovedToTrashMessage, notesDeletedMessage } from '../../messages';
import { NOTIFICATION_INFO } from '../../constants/types';

import {
  showNotification,
  moveNotesToTrash,
  deleteNotes,
} from '../../actions';

import {
  watchMoveNotesToTrash,
  watchDeleteNotes,
} from '../notifications';


describe('notifications sagas', () => {
  describe('MOVE_NOTES_TO_TRASH', () => {
    it('dispatches showNotification(type, message)', () => {
      const ids = [1, 2, 3];

      return expectSaga(watchMoveNotesToTrash)
        .put(showNotification(
          NOTIFICATION_INFO,
          notesMovedToTrashMessage.format({ notesCount: ids.length })
        ))
        .dispatch(moveNotesToTrash(ids))
        .run();
    });
  });

  describe('DELETE_NOTES', () => {
    it('dispatches showNotification(type, message)', () => {
      const ids = [1, 2, 3];

      return expectSaga(watchDeleteNotes)
        .put(showNotification(
          NOTIFICATION_INFO,
          notesDeletedMessage.format({ notesCount: ids.length })
        ))
        .dispatch(deleteNotes(ids))
        .run();
    });
  });
});
