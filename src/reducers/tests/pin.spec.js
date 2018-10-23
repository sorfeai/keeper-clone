import * as matchers from 'jest-immutable-matchers';
import { Map, List } from 'immutable';
import pinReducer from '../pin';

import {
  pinNotes,
  unpinNotes,
} from '../../actions';


describe('pin reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('provides correct default state', () => {
    const state = pinReducer(undefined, { type: undefined });
    const expected =  Map({
      ids: List(),
    });

    expect(state).toEqualImmutable(expected);
  });

  describe('actions', () => {
    let defaultState;

    beforeEach(() => {
      defaultState = pinReducer(
        undefined,
        ['one', 'two', 'three']
      );
    });

    it('`PIN_NOTES`: adds provided id(s) to `ids`', () => {
      const ids = ['five', 'six'];
      const state = pinReducer(
        defaultState,
        pinNotes(ids)
      );

      expect(state.get('ids').includes(ids[0])).toBe(true);
      expect(state.get('ids').includes(ids[1])).toBe(true);
    });

    it('`UNPIN_NOTES`: removes provided id(s) from `ids`', () => {
      const ids = ['two', 'three'];
      const state = pinReducer(
        defaultState,
        unpinNotes(ids)
      );

      expect(state.get('ids').includes(ids[0])).toBe(false);
      expect(state.get('ids').includes(ids[1])).toBe(false);
    });
  });
});
