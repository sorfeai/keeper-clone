import * as matchers from 'jest-immutable-matchers';
import { Map, List } from 'immutable';
import selectReducer from '../select';

import {
  toggleSelectMode,
  selectNote,
  deselectNote,
  clearSelection,
} from '../../actions';


describe('select reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('provides correct default state', () => {
    const state = selectReducer(undefined, { type: undefined });
    const expected =  Map({
      selecting: false,
      selectedIds: List(),
    });

    expect(state).toEqualImmutable(expected);
  });

  describe('actions', () => {
    let defaultState;

    beforeEach(() => {
      const ids = ['one', 'two', 'three'];

      defaultState = ids.reduce((state, id) => (
        selectReducer(state, selectNote(id))
      ), undefined);
    });

    it('`TOGGLE_IS_SELECTING`: toggles `isSelecting`', () => {
      const state = selectReducer(
        undefined,
        toggleSelectMode(undefined)
      );

      expect(state.get('isSelecting')).toBeTruthy();
    });

    it('`SELECT_NOTE`: adds provided id to `ids`', () => {
      const id = 'four';
      const state = selectReducer(
        defaultState,
        selectNote(id)
      );

      expect(state.get('selectedIds').includes(id)).toBeTruthy();
    });

    it('`DESELECT_NOTE`: removes provided id from `ids`', () => {
      const id = 'one';
      const state = selectReducer(
        defaultState,
        deselectNote(id)
      );

      expect(state.get('selectedIds').includes(id)).toBeFalsy();
    });

    it('', () => {
      const state = selectReducer(
        defaultState,
        clearSelection()
      );

      expect(state.get('selectedIds').size).toEqual(0);
    });
  });
});
