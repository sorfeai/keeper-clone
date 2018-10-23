import * as matchers from 'jest-immutable-matchers';
import { Map, List } from 'immutable';
import notesReducer from '../notes';

import {
  createNote,
  updateNote,
  tagNote,
  deleteNotes,
} from '../../actions';


describe('notes reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers);
  });

  it('provides correct default state', () => {
    const expected = Map({
      byId: Map(),
      allIds: List(),
    });
    const state = notesReducer(undefined, { type: undefined });

    expect(state).toEqualImmutable(expected);
  });

  describe('actions', () => {
    let defaultState;

    beforeEach(() => {
      const notes = [
        {
          id: 'one',
          title: 'title one',
          content: 'content one',
        },
        {
          id: 'two',
          title: 'title two',
          content: 'content two',
        },
        {
          id: 'three',
          title: 'title three',
          content: 'content three',
        },
      ];

      defaultState = notes.reduce((acc, data) => (
        notesReducer(acc, createNote(data))
      ), undefined);
    });

    describe('`CREATE_NOTE`', () => {
      const addNote = (id) => {
        const title = 'title';
        const content = 'content';
        const tags = List(['tag_one', 'tag_two']);

        const state = notesReducer(
          defaultState,
          createNote({ id, title, content, tags })
        );

        const note = state
          .get('byId')
          .find((note) => (
            (note.get('title') === title) &&
            (note.get('content') === content) &&
            (note.get('tags') === tags)
          ));

        return { note, state };
      };

      it('adds new note to `byId` and its id to `allIds`', () => {
        const id = 'one';
        const { note, state } = addNote(id);

        expect(note).toBeDefined();
        expect(
          state
          .get('allIds')
          .includes(id)
        ).toBe(true);
      });

      it('generates id if not provided', () => {
        const { note } = addNote();
        expect(note.get('id')).toBeDefined();
      });
    });

    it('`UPDATE_NOTE`: merges note with provided id with provided changes', () => {
      const id = 'one';
      const title = 'updated title';
      const content = 'updated content';
      const state = notesReducer(
        defaultState,
        updateNote(id, { title, content })
      );
      const note = state.getIn(['byId', id]);

      expect(note.get('title')).toEqualImmutable(title);
      expect(note.get('content')).toEqualImmutable(content);
    });

    it('`DELETE_NOTES`: removes note(s) with provided id(s) from `byId` and its id(s) from `allIds`', () => {
      const id = 'one';
      const state = notesReducer(defaultState, deleteNotes([id]));

      expect(state.getIn(['byId', id])).toBe(undefined);
      expect(state.get('allIds').includes(id)).toBe(false);
    });

    describe('`TAG_NOTE`: adds provided tag id(s) to `tags`', () => {
      it('handles single number as `id` param', () => {
        const noteId = 'one';
        const tagId = 'tag_one';
        const state = notesReducer(defaultState, tagNote(noteId, tagId));

        expect(state.getIn(['byId', noteId, 'tags']).includes(tagId)).toBe(true);
      });

      it('handles array of ids as `id` param', () => {
        const noteId = 'one';
        const tagIds = ['tag_one', 'tag_two'];
        const state = notesReducer(defaultState, tagNote(noteId, tagIds));

        expect(state.getIn(['byId', noteId, 'tags']).includes(tagIds[0])).toBe(true);
        expect(state.getIn(['byId', noteId, 'tags']).includes(tagIds[1])).toBe(true);
      });
    });
  });
});
