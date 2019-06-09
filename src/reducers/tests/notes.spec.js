import * as matchers from 'jest-immutable-matchers';
import { Map, List } from 'immutable';
import reducer from '..';
import notesReducer from '../notes';
import { mockNotesData } from '../../testUtils';

import {
  getNotesById,
  getNotesAllIds,
  getNotesNoteById,
  getNotesFeed,
  getNotesPinnedIds,
  getNotesIsEditing,
  getNotesEditingId,
  getNotesIsSelecting,
  getNotesSelectedIds,
} from '../../selectors';

import {
  formatNotesForFeedDone,
  createNote,
  updateNote,
  applyTags,
  deleteNotes,
  pinNotes,
  unpinNotes,
  toggleSelectMode,
  selectNote,
  deselectNote,
  clearSelection,
  startEditingNote,
  endEditingNote,
} from '../../actions';


describe('notes reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  describe('actions', () => {
    let defaultState;

    beforeEach(() => {
      const notes = mockNotesData(3);

      defaultState = notes.reduce((acc, note) => (
        reducer(
          acc,
          createNote({
            id: note.get('id'),
            title: note.get('title'),
            content: note.get('content'),
            tags: note.get('tags'),
          })
        )
      ), undefined);
    });

    it('provides correct default state', () => {
      const expected = Map({
        byId: Map(),
        allIds: List(),
        feed: Map({
          pinned: List(),
          unpinned: List(),
        }),
        pinnedIds: List(),
        isEditing: false,
        editingId: null,
        isSelecting: false,
        selectedIds: List(),
      });

      const state = notesReducer(
        undefined,
        { type: undefined }
      );

      expect(state).toEqualImmutable(expected);
    });

    it('`FORMAT_NOTES_FOR_FEED_DONE`: sets `formmated` to provided', () => {
      const notesData = mockNotesData(3);
      const state = reducer(
        undefined,
        formatNotesForFeedDone(notesData)
      );

      expect(
        getNotesFeed(state)
      ).toEqualImmutable(notesData);
    });

    describe('`CREATE_NOTE`', () => {
      const addNote = (id) => {
        const title = 'title';
        const content = 'content';
        const tags = List(['tag one', 'tag two']);

        const state = reducer(
          undefined,
          createNote({
            id,
            title,
            content,
            tags,
          })
        );

        const note = getNotesById(state)
          .find((note) => (
            (note.get('title') === title) &&
            (note.get('content') === content) &&
            (note.get('tags') === tags)
          ));

        return { note, state };
      };

      it('adds new note to `byId` and its id to `allIds`', () => {
        const id = '1';
        const { note, state } = addNote(id);

        expect(note).toBeDefined();

        expect(
          getNotesAllIds(state).includes(id)
        ).toBe(true);
      });

      it('generates id if not provided', () => {
        const { note } = addNote();
        expect(note.get('id')).toBeDefined();
      });
    });

    it('`UPDATE_NOTE`: merges note with provided id with provided changes', () => {
      const id = '1';
      const title = 'updated title';
      const content = 'updated content';
      const state = reducer(
        defaultState,
        updateNote(id, { title, content })
      );
      const note = getNotesNoteById(id)(state);

      expect(note.get('title')).toEqualImmutable(title);
      expect(note.get('content')).toEqualImmutable(content);
    });

    it('`DELETE_NOTES`: removes note(s) with provided id(s) from `byId` and its id(s) from `allIds`', () => {
      const id = '1';
      const state = reducer(
        defaultState,
        deleteNotes([id])
      );

      expect(
        getNotesNoteById(id)(state)
      ).toBeUndefined();

      expect(
        getNotesAllIds(state).includes(id)
      ).toBeFalsy();
    });

    describe('`APPLY_TAGS`: adds provided tag id(s) to `tags`', () => {
      it('handles single number as `id` param', () => {
        const noteId = '1';
        const tagId = 'tag one';
        const state = reducer(
          defaultState,
          applyTags(noteId, tagId)
        );

        expect(
          getNotesNoteById(noteId)(state)
          .get('tags')
          .includes(tagId)
        ).toBeTruthy();
      });

      it('handles array of ids as `id` param', () => {
        const noteId = '1';
        const tagIds = ['tag one', 'tag two'];
        const state = reducer(
          defaultState,
          applyTags(noteId, tagIds)
        );

        expect(
          getNotesNoteById(noteId)(state)
          .get('tags')
          .includes(tagIds[0])
        ).toBeTruthy();

        expect(
          getNotesNoteById(noteId)(state)
          .get('tags')
          .includes(tagIds[1])
        ).toBeTruthy();
      });
    });

    describe('pin', () => {
      beforeEach(() => {
        defaultState = reducer(
          defaultState,
          pinNotes(['1', '2', '3'])
        );
      });

      it('`PIN_NOTES`: adds provided id(s) to `pinnedIds`', () => {
        const ids = ['4', '5'];
        const state = reducer(
          defaultState,
          pinNotes(ids)
        );

        expect(
          getNotesPinnedIds(state)
          .includes(ids[0])
        ).toBeTruthy();

        expect(
          getNotesPinnedIds(state)
          .includes(ids[1])
        ).toBeTruthy();
      });

      it('`UNPIN_NOTES`: removes provided id(s) from `pinnedIds`', () => {
        const ids = ['2', '3'];
        const state = reducer(
          defaultState,
          unpinNotes(ids)
        );

        expect(
          getNotesPinnedIds(state)
          .includes(ids[0])
        ).toBeFalsy();

        expect(
          getNotesPinnedIds(state)
          .includes(ids[1])
        ).toBeFalsy();
      });
    });

    describe('select', () => {
      beforeEach(() => {
        const ids = ['1', '2', '3'];

        defaultState = ids.reduce((state, id) => (
          reducer(state, selectNote(id))
        ), undefined);
      });

      it('`TOGGLE_IS_SELECTING`: toggles `isSelecting`', () => {
        const state = reducer(
          undefined,
          toggleSelectMode(undefined)
        );

        expect(
          getNotesIsSelecting(state)
        ).toBeTruthy();
      });

      it('`SELECT_NOTE`: adds provided id to `ids`', () => {
        const id = '4';
        const state = reducer(
          defaultState,
          selectNote(id)
        );

        expect(
          getNotesSelectedIds(state).includes(id)
        ).toBeTruthy();
      });

      it('`DESELECT_NOTE`: removes provided id from `ids`', () => {
        const id = '1';
        const state = reducer(
          defaultState,
          deselectNote(id)
        );

        expect(
          getNotesSelectedIds(state)
          .includes(id)
        ).toBeFalsy();
      });

      it('`CLEAR_SELECTION`: clears `ids`', () => {
        const state = reducer(
          defaultState,
          clearSelection()
        );

        expect(
          getNotesSelectedIds(state).size
        ).toBe(0);
      });
    });

    describe('edit', () => {
      it('`EDIT_NOTE_START`: sets `editing` to true and `id` to provided  one', () => {
        const id = '1';
        const state = reducer(
          undefined,
          startEditingNote(id)
        );

        expect(
          getNotesIsEditing(state)
        ).toBeTruthy();

        expect(
          getNotesEditingId(state)
        ).toBe(id);
      });

      it('`EDIT_NOTE_END`: sets `editing` to false and `id` to null', () => {
        const state = reducer(
          undefined,
          endEditingNote()
        );

        expect(
          getNotesIsEditing(state)
        ).toBeFalsy();

        expect(
          getNotesEditingId(state)
        ).toBeNull();
      });
    });
  });
});
