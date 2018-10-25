import * as immutableMatchers from 'jest-immutable-matchers';
import { Map, List } from 'immutable';
import { asEffect } from 'redux-saga/utils';
import { expectSaga, matchers } from 'redux-saga-test-plan';

import {
  watchFormatNotesForFeed,
  watchSplitToColumns,
  watchSplitByPin,
  watchApplySearchFilter,
} from '../notesFeed';

import {
  formatNotesForFeed,
  formatNotesForFeedDone,
  applySearchFilter,
  applySearchFilterDone,
  splitByPin,
  splitByPinDone,
  splitToColumns,
  splitToColumnsDone,
} from '../../actions';

import {
  getNotesRaw,
  getSearchQuery,
  getIsGridView,
  getNotesInTrash,
  getPinnedIds,
} from '../../selectors';


describe('notesFeed sagas', () => {
  let sampleNotes;

  beforeEach(() => {
    jest.addMatchers(immutableMatchers);

    sampleNotes = List([
      Map({
        id: 'one',
        title: 'title one',
        content: 'content one',
        tags: List(),
      }),
      Map({
        id: 'two',
        title: 'title two',
        content: 'content two',
        tags: List(),
      }),
      Map({
        id: 'three',
        title: 'title three',
        content: 'content three',
        tags: List(),
      }),
    ]);
  });

  describe('handleApplySearchFilter()', () => {
    it('should not touch data if there\'s no search query', () => {
      return expectSaga(watchApplySearchFilter)
        .provide([
          [matchers.select.selector(getSearchQuery), ''],
        ])
        .put(applySearchFilterDone(sampleNotes))
        .dispatch(applySearchFilter(sampleNotes))
        .run();
    });

    describe('should filter only matching notes if there is search query', () => {
      it('if title matches', () => {
        const searchQuery = 'title on';

        return expectSaga(watchApplySearchFilter)
          .provide([
            [matchers.select.selector(getSearchQuery), searchQuery],
          ])
          .dispatch(applySearchFilter(sampleNotes))
          .run()
          .then(({ effects }) => {
            const putDone = asEffect.put(effects.put[0]);
            const { action: { payload: { data: filtered } } } = putDone;

            expect(filtered.size).toBe(1);
            expect(filtered.getIn([0, 'title'])).toEqual('title one');
          });
      });

      it('if content matches', () => {
        const searchQuery = 'content t';

        return expectSaga(watchApplySearchFilter)
          .provide([
            [matchers.select.selector(getSearchQuery), searchQuery],
          ])
          .dispatch(applySearchFilter(sampleNotes))
          .run()
          .then(({ effects }) => {
            const putDone = asEffect.put(effects.put[0]);
            const { action: { payload: { data: filtered } } } = putDone;

            expect(filtered.size).toBe(2);
            expect(filtered.getIn([0, 'content'])).toEqual('content two');
            expect(filtered.getIn([1, 'content'])).toEqual('content three');
          });
      });

      it('case insensitive', () => {
        const searchQuery = 'TiTLe tW';

        return expectSaga(watchApplySearchFilter)
          .provide([
            [matchers.select.selector(getSearchQuery), searchQuery],
          ])
          .dispatch(applySearchFilter(sampleNotes))
          .run()
          .then(({ effects }) => {
            const putDone = asEffect.put(effects.put[0]);
            const { action: { payload: { data: filtered } } } = putDone;

            expect(filtered.size).toBe(1);
            expect(filtered.getIn([0, 'title'])).toEqual('title two');
          });
      });

      it('trims spaces', () => {
        const searchQuery = '   title tw ';

        return expectSaga(watchApplySearchFilter)
          .provide([
            [matchers.select.selector(getSearchQuery), searchQuery],
          ])
          .dispatch(applySearchFilter(sampleNotes))
          .run()
          .then(({ effects }) => {
            const putDone = asEffect.put(effects.put[0]);
            const { action: { payload: { data: filtered } } } = putDone;

            expect(filtered.size).toBe(1);
            expect(filtered.getIn([0, 'title'])).toEqual('title two');
          });
      });

      it('squashes multiple spaces to one', () => {
        const searchQuery = 'title    tw';

        return expectSaga(watchApplySearchFilter)
          .provide([
            [matchers.select.selector(getSearchQuery), searchQuery],
          ])
          .dispatch(applySearchFilter(sampleNotes))
          .run()
          .then(({ effects }) => {
            const putDone = asEffect.put(effects.put[0]);
            const { action: { payload: { data: filtered } } } = putDone;

            expect(filtered.size).toBe(1);
            expect(filtered.getIn([0, 'title'])).toEqual('title two');
          });
      });
    });
  });

  describe('handleSplitByPin()', () => {
    it('should transform notes list into map of shape `{ pinned: List, other: List }`', () => {
      const notesInTrash = List();
      const pinnedIds = List(['two', 'three']);

      return expectSaga(watchSplitByPin)
        .provide([
          [matchers.select.selector(getPinnedIds), pinnedIds],
          [matchers.select.selector(getNotesInTrash), notesInTrash],
        ])
        .dispatch(splitByPin(sampleNotes))
        .run()
        .then(({ effects }) => {
          const putDone = asEffect.put(effects.put[0]);
          const { action: { payload: { pinned, other } } } = putDone;

          expect(pinned).toBeImmutableList();
          expect(pinned.size).toBe(pinnedIds.size);
          expect(pinned.getIn([0, 'id'])).toBe('two');
          expect(pinned.getIn([1, 'id'])).toBe('three');
        });
    });
  });
});
