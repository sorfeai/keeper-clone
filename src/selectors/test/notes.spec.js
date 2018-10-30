import { Map, List } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import { mockNote } from '../../testUtils';

import {
  getNotes,
  getNotesById,
  getNotesAllIds,
  getNotesNoteById,
  getNotesFeed,
  getNotesPinnedIds,
  getNotesIsEditing,
  getNotesEditingId,
  getNotesIsSelecting,
  getNotesSelectedIds,
} from '..';


describe('notes selectors', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  describe('`getNotes`', () => {
    const notes = Map({
      byId: Map(),
      allIds: List(),
    });

    it('gets notes state', () => {
      expect(
        getNotes({ notes })
      ).toEqualImmutable(notes);
    });
  });

  describe('`getNotesById`', () => {
    const byId = Map({
      one: Map({ title: 'test' }),
    });
    const state = Map({ byId });

    it('gets `byId`', () => {
      expect(
         getNotesById.resultFunc(state)
      ).toEqualImmutable(byId);
    });
  });

  describe('`getNotesNoteById`', () => {
    it('gets note from `byId`', () => {
      const id = 'one';
      const note = mockNote(id);
      const byId = Map({ [id]: Map(note) });

      expect(
        getNotesNoteById(id)
        .resultFunc(byId)
        .get('id') === id
      ).toBeTruthy();
    });
  });

  describe('`getNotesAllIds`', () => {
    it('gets `allIds`', () => {
      const allIds = List(['one', 'two']);
      const state = Map({ allIds });

      expect(
        getNotesAllIds.resultFunc(state)
      ).toEqualImmutable(allIds);
    });
  });

  describe('`getNotesFeed`', () => {
    it('gets `feed`', () => {
      const feed = Map({
        pinned: List(['one']),
        unpinned: List(['two']),
      });
      const state = Map({ feed });

      expect(
        getNotesFeed.resultFunc(state)
      ).toEqualImmutable(feed);
    });
  });

  describe('`getNotesPinnedIds`', () => {
    it('gets `pinnedIds`', () => {
      const pinnedIds = List(['one', 'two']);
      const state = Map({ pinnedIds });

      expect(
        getNotesPinnedIds.resultFunc(state)
      ).toEqualImmutable(pinnedIds);
    });
  });

  describe('`getNotesIsEditing`', () => {
    it('gets `isEditing`', () => {
      const state = Map({ isEditing: true });

      expect(
        getNotesIsEditing.resultFunc(state)
      ).toBe(true);
    });
  });

  describe('`getNotesEditingId`', () => {
    it('gets `editingId`', () => {
      const id = 'one';
      const state = Map({ editingId: id });

      expect(
        getNotesEditingId.resultFunc(state)
      ).toBe(id);
    });
  });

  describe('`getNotesIsSelecting`', () => {
    it('gets `isSelecting`', () => {
      const state = Map({ isSelecting: true });

      expect(
        getNotesIsSelecting.resultFunc(state)
      ).toBe(true);
    });
  });

  describe('`getNotesSelectedIds`', () => {
    it('gets `selectedIds`', () => {
      const selectedIds = List(['one', 'two']);
      const state = Map({ selectedIds });

      expect(
        getNotesSelectedIds.resultFunc(state)
      ).toEqualImmutable(selectedIds);
    });
  });
});
