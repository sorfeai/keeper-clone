import { Map, List } from 'immutable';
import * as matchers from 'jest-immutable-matchers';

import {
  getTags,
  getTagsById,
  getTagsTagById,
  getTagsAllIds,
  getTagsEditingId,
  getTagsIsModalShown,
} from '..';


describe('tags selectors', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  describe('`getTags`', () => {
    it('gets tags state', () => {
      const tags = Map({
        editingId: 'one',
      });

      expect(
        getTags({ tags })
      ).toEqualImmutable(tags);
    });
  });

  describe('`getTagsById`', () => {
    it('gets `byId`', () => {
      const byId = Map({
        one: Map({ title: 'test tag' }),
      });
      const state = Map({ byId });

      expect(
        getTagsById.resultFunc(state)
      ).toEqualImmutable(byId);
    });
  });

  describe('`getTagsTagById`', () => {
    it('gets tag from `byId`', () => {
      const id = 'one';
      const tag = Map({ title: 'test tag' });
      const state = Map({ [id]: tag });

      expect(
        getTagsTagById(id).resultFunc(state)
      ).toEqualImmutable(tag);
    });
  });

  describe('`getTagsAllIds`', () => {
    it('gets `allIds`', () => {
      const allIds = List(['one', 'two']);
      const state = Map({ allIds });

      expect(
        getTagsAllIds.resultFunc(state)
      ).toEqualImmutable(allIds);
    });
  });

  describe('`getTagsEditingId`', () => {
    it('gets `editingId`', () => {
      const editingId = 'one';
      const state = Map({ editingId });

      expect(
        getTagsEditingId.resultFunc(state)
      ).toBe(editingId);
    });
  });

  describe('`getTagsIsModalShown`', () => {
    it('gets `isModalShown`', () => {
      const state = Map({ isModalShown: true });

      expect(
        getTagsIsModalShown.resultFunc(state)
      ).toBe(true);
    });
  });
});
