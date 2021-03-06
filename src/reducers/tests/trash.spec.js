import * as matchers from 'jest-immutable-matchers';
import { Map, List } from 'immutable';
import { getTrashNotesIds } from '../../selectors';
import rootReducer from '..';
import trashReducer from '../trash';

import {
  moveNotesToTrash,
  restoreNotesFromTrash,
  deleteNotes,
  emptyTrash,
} from '../../actions';


describe('trash reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('provides correct default state', () => {
    const state = trashReducer(undefined, { type: undefined });
    const expected =  Map({
      notesIds: List(),
    });

    expect(state).toEqualImmutable(expected);
  });

  describe('actions', () => {
    let defaultState;

    beforeEach(() => {
      const ids = ['one', 'two', 'three'];

      defaultState = ids.reduce((state, id) => (
        rootReducer(state, moveNotesToTrash(id))
      ), undefined);
    });

    it('`MOVE_NOTES_TO_TRASH`: adds provided id(s) to `notesIds`', () => {
      const ids = ['four', 'five'];
      const state = rootReducer(
        defaultState,
        moveNotesToTrash(ids)
      );

      expect(
        getTrashNotesIds(state).includes(ids[0])
      ).toBeTruthy();

      expect(
        getTrashNotesIds(state).includes(ids[1])
      ).toBeTruthy();
    });

    it('`RESTORE_NOTES_FROM_TRASH`: removes provided id(s) from `notesIds`', () => {
      const ids = ['one', 'two'];
      const state = rootReducer(
        defaultState,
        restoreNotesFromTrash(ids)
      );

      expect(
        getTrashNotesIds(state).includes(ids[0])
      ).toBeFalsy();

      expect(
        getTrashNotesIds(state).includes(ids[1])
      ).toBeFalsy();
    });

    it('`DELETE_NOTES`: removes provided id(s) from `notesIds`', () => {
      const ids = ['one', 'two'];
      const state = rootReducer(
        defaultState,
        deleteNotes(ids)
      );

      expect(
        getTrashNotesIds(state).includes(ids[0])
      ).toBeFalsy();

      expect(
        getTrashNotesIds(state).includes(ids[1])
      ).toBeFalsy();
    });

    it('`EMPTY_TRASH`: clears `notesIds`', () => {
      const state = rootReducer(
        defaultState,
        emptyTrash()
      );

      expect(
        getTrashNotesIds(state).size
      ).toEqual(0);
    });
  });
});
