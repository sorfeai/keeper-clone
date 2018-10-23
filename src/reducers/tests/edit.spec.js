import * as matchers from 'jest-immutable-matchers';
import { Map } from 'immutable';
import editReducer from '../edit';

import {
  startEditingNote,
  endEditingNote,
} from '../../actions';


describe('edit reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('provides correct default state', () => {
    const expected = Map({
      editing: false,
      id: null,
    });
    const state = editReducer(undefined, { type: undefined });

    expect(state).toEqualImmutable(expected);
  });

  describe('actions', () => {
    it('`START_EDITING_NOTE`: sets `editing` to true and `id` to provided  one', () => {
      const id = 1;
      const state = editReducer(undefined, startEditingNote(id));
      const expected = Map({ editing: true, id });

      expect(state).toEqualImmutable(expected);
    });

    it('`END_EDITING_NOTE`: sets `editing` to false and `id` to null', () => {
      const state = editReducer(undefined, endEditingNote());
      const expected = Map({ editing: false, id: null });

      expect(state).toEqualImmutable(expected);
    });
  });
});
