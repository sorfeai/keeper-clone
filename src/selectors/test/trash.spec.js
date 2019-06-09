import { Map, List } from 'immutable';
import * as matchers from 'jest-immutable-matchers';

import {
  getTrash,
  getTrashNotesIds,
} from '..';


describe('trash selectors', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  describe('`getTrash`', () => {
    it('gets trash state', () => {
      const trash = Map({
        notesIds: List(['one', 'two']),
      });

      expect(
        getTrash({ trash })
      ).toEqualImmutable(trash);
    });
  });

  describe('`getTrashNotesIds`', () => {
    it('gets `notesIds`', () => {
      const notesIds = List(['one', 'two']);
      const state = Map({ notesIds });

      expect(
        getTrashNotesIds.resultFunc(state)
      ).toEqualImmutable(notesIds);
    });
  });
});
