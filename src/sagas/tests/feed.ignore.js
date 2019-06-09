import * as immutableMatchers from 'jest-immutable-matchers';
import { Map, List, Seq } from 'immutable';
import { put } from 'redux-saga/effects';
import { asEffect } from 'redux-saga/utils';
import { expectSaga, matchers } from 'redux-saga-test-plan';
import { mockNotesData, filterEffectsByAction } from '../../testUtils';

import {
  PAGE_HOME,
  PAGE_TRASH,
} from '../../constants/types';

import {
  watchFormatNotesForFeed,
  watchSplitToColumns,
  watchSplitByPin,
  watchApplySearchFilter,
} from '../feed';

import {
  updateNote,
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
  getFormValue,
  getAppCurrentPage,
  getAppIsFeedViewGrid,
  getAppMaxColumns,
  getNotesById,
  getNotesPinnedIds,
  getTrashNotesIds,
} from '../../selectors';


describe('feed sagas', () => {
  let sampleNotes;

  beforeEach(() => {
    jest.addMatchers(immutableMatchers);
    sampleNotes = mockNotesData(3);
  });

  describe('handleApplySearchFilter()', () => {
    it('should not touch data if there\'s no search query', () => {
      return expectSaga(watchApplySearchFilter)
        .provide({
          // can't target curried selector
          select () {
            return '';
          },
        })
        .put(applySearchFilterDone(sampleNotes))
        .dispatch(applySearchFilter(sampleNotes))
        .run();
    });

    describe('should filter only matching notes if there is search query', () => {
      it('if title matches', () => {
        const searchQuery = 'title on';

        return expectSaga(watchApplySearchFilter)
          .provide({
            select () {
              return searchQuery;
            },
          })
          .dispatch(applySearchFilter(sampleNotes))
          .run()
          .then(({ effects }) => {
            const putDone = asEffect.put(effects.put[0]);
            const { action: { payload: { data: filtered } } } = putDone;

            expect(filtered).toBeImmutable();
            expect(filtered.size).toBe(1);
            expect(filtered.getIn([0, 'title'])).toEqual('title one');
          });
      });

      it('if content matches', () => {
        const searchQuery = 'content t';

        return expectSaga(watchApplySearchFilter)
          .provide({
            select () {
              return searchQuery;
            },
          })
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
          .provide({
            select () {
              return searchQuery;
            },
          })
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
          .provide({
            select () {
              return searchQuery;
            },
          })
          .dispatch(applySearchFilter(sampleNotes))
          .run()
          .then(({ effects }) => {
            const putDone = asEffect.put(effects.put[0]);
            const { action: { payload: { data: filtered } } } = putDone;

            expect(filtered.size).toBe(1);
            expect(filtered.getIn([0, 'title'])).toEqual('title two');
          });
      });

      it('squashes spaces', () => {
        const searchQuery = 'title    tw';

        return expectSaga(watchApplySearchFilter)
          .provide({
            select () {
              return searchQuery;
            },
          })
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
    it('yields `{ pinned: List, other: List }`', () => {
      const notesInTrash = List();
      const pinnedIds = List([2, 3]);
      const otherIds = List([1]);

      return expectSaga(watchSplitByPin)
        .provide([
          [matchers.select.selector(getTrashNotesIds), notesInTrash],
          [matchers.select.selector(getNotesPinnedIds), pinnedIds],
        ])
        .dispatch(splitByPin(sampleNotes))
        .run()
        .then(({ effects }) => {
          const putDone = asEffect.put(effects.put[0]);
          const { action: { payload: { pinned, other } } } = putDone;

          expect(pinned).toBeImmutableList();
          expect(pinned.size).toBe(pinnedIds.size);
          expect(pinned.getIn([0, 'id'])).toBe(2);
          expect(pinned.getIn([1, 'id'])).toBe(3);

          expect(other).toBeImmutableList();
          expect(other.size).toBe(otherIds.size);
          expect(other.getIn([0, 'id'])).toBe(1);
        });
    });

    it('if there\'re no `pinned`/`other` elements yields empty `pinned`/`other` List', () => {
      const notesInTrash = List();
      const pinnedIds = List([1, 2, 3]);

      return expectSaga(watchSplitByPin)
        .provide([
          [matchers.select.selector(getTrashNotesIds), notesInTrash],
          [matchers.select.selector(getNotesPinnedIds), pinnedIds],
        ])
        .dispatch(splitByPin(sampleNotes))
        .run()
        .then(({ effects }) => {
          const putDone = asEffect.put(effects.put[0]);
          const { action: { payload: { other } } } = putDone;

          expect(other).toBeImmutableList();
          expect(other.size).toBe(0);
        });
    });

    it('ignores notes that are in trash', () => {
      const notesInTrash = List([1]);
      const pinnedIds = List([1, 2]);

      return expectSaga(watchSplitByPin)
        .provide([
          [matchers.select.selector(getTrashNotesIds), notesInTrash],
          [matchers.select.selector(getNotesPinnedIds), pinnedIds],
        ])
        .dispatch(splitByPin(sampleNotes))
        .run()
        .then(({ effects }) => {
          const putDone = asEffect.put(effects.put[0]);
          const { action: { payload: { pinned } } } = putDone;

          expect(pinned).toBeImmutableList();
          expect(pinned.size).toBe(1);
          expect(pinned.getIn([0, 'id'])).toBe(2);
        });
    });
  });

  describe('handleSplitToColumns()', () => {
    it('divides notes into provided num of columns equally', () => {
      const notesData = mockNotesData(7);
      const columns = 3;
      const expected = Seq([0, 1, 2]);

      expectSaga(watchSplitToColumns)
        .dispatch(splitToColumns(notesData, columns))
        .run()
        .then(({ effects }) => {
          const putDone = asEffect.put(effects.put[0]);
          const { action: { payload: { data } } } = putDone;

          expect(data).toBeImmutable();
          expect(data.keySeq()).toEqualImmutable(expected);
          expect(data.get(0).size).toBe(3);
          expect(data.get(1).size).toBe(2);
          expect(data.get(2).size).toBe(2);
        });
    });

    it('if there\'re not enough elements doesn\'t create column', () => {
      const notesData = mockNotesData(2);
      const columns = 3;
      const expected = Seq([0, 1]);

      expectSaga(watchSplitToColumns)
        .dispatch(splitToColumns(notesData, columns))
        .provide([
          [matchers.select.selector(getAppMaxColumns), columns],
        ])
        .run()
        .then(({ effects }) => {
          const putDone = asEffect.put(effects.put[0]);
          const { action: { payload: { data } } } = putDone;

          expect(data).toBeImmutable();
          expect(data.keySeq()).toEqualImmutable(expected);
          expect(data.get(0).size).toBe(1);
          expect(data.get(1).size).toBe(1);
        });
    });
  });

  describe('formatNotesForFeed()', () => {
    const getProvider = ({
      notesData = List(),
      currentPage = PAGE_HOME,
      pinnedIds = List(),
      notesInTrash = List(),
      maxColumns = 3,
      isGridView = true,
      searchQuery = '',
    }) => {
      const { selector } = matchers.select;

      return [
        [selector(getNotesById), notesData],
        [selector(getAppCurrentPage), currentPage],
        [selector(getNotesPinnedIds), pinnedIds],
        [selector(getTrashNotesIds), notesInTrash],
        [selector(getAppMaxColumns), maxColumns],
        [selector(getAppIsFeedViewGrid), isGridView],
        [selector(getFormValue), searchQuery],
      ];
    };

    it('if page is `PAGE_HOME` puts `splitByPin()`', () => {
      const notesData = List();

      const providerOptions = {
        notesData,
        page: PAGE_HOME,
      };

      return expectSaga(watchFormatNotesForFeed)
        .provide(getProvider(providerOptions))
        .dispatch(formatNotesForFeed())
        .dispatch(applySearchFilterDone(notesData))
        .dispatch(splitByPinDone(notesData, notesData))
        .dispatch(splitToColumnsDone(notesData))
        .dispatch(splitToColumnsDone(notesData))
        .run()
        .then(({ allEffects }) => {
          const effect = put(splitByPin(notesData));
          expect(allEffects).toContainEqual(effect);
        });
    });

    it('doesn\'t put `splitByPin()` if page is `PAGE_TRASH`', () => {
      const notesData = List();

      const providerOptions = {
        notesData,
        currentPage: PAGE_TRASH,
      };

      return expectSaga(watchFormatNotesForFeed)
        .provide(getProvider(providerOptions))
        .dispatch(formatNotesForFeed())
        .dispatch(applySearchFilterDone(notesData))
        .dispatch(splitByPinDone(notesData, notesData))
        .dispatch(splitToColumnsDone(notesData))
        .run()
        .then(({ allEffects }) => {
          const effect = put(splitByPin(notesData));
          expect(allEffects).not.toContainEqual(effect);
        });
    });

    describe('`isGridView` is true', () => {
      it('if `currentPage` isn\'t `PAGE_TRASH` puts `splitToColumns()` twice', () => {
        const notesData = List();

        const providerOptions = {
          notesData,
          isGridView: true,
          currentPage: PAGE_HOME,
        };

        return expectSaga(watchFormatNotesForFeed)
          .provide(getProvider(providerOptions))
          .dispatch(formatNotesForFeed())
          .dispatch(applySearchFilterDone(notesData))
          .dispatch(splitByPinDone(notesData, notesData))
          .dispatch(splitToColumnsDone(notesData))
          .dispatch(splitToColumnsDone(notesData))
          .run()
          .then(({ allEffects }) => {
            const filtered = filterEffectsByAction(
              allEffects,
              'PUT',
              splitToColumns(notesData, 3)
            );

            expect(filtered.length).toBe(2);
          });
      });

      it('if `currentPage` is `PAGE_TRASH` puts `splitToColumns()` once', () => {
        const notesData = List();

        const providerOptions = {
          notesData,
          isGridView: true,
          currentPage: PAGE_TRASH,
        };

        return expectSaga(watchFormatNotesForFeed)
          .provide(getProvider(providerOptions))
          .dispatch(formatNotesForFeed())
          .dispatch(applySearchFilterDone(notesData))
          .dispatch(splitByPinDone(notesData, notesData))
          .dispatch(splitToColumnsDone(notesData))
          .run()
          .then(({ allEffects }) => {
            const filtered = filterEffectsByAction(
              allEffects,
              'PUT',
              splitToColumns(notesData, 3)
            );

            expect(filtered.length).toBe(1);
          });
      });
    });

    describe('`isGridView` is false', () => {
      it('doesn\'t put `splitToColumns()` at all', () => {
        const notesData = List();

        const providerOptions = {
          notesData,
          isGridView: false,
        };

        return expectSaga(watchFormatNotesForFeed)
          .provide(getProvider(providerOptions))
          .dispatch(formatNotesForFeed())
          .dispatch(applySearchFilterDone(notesData))
          .dispatch(splitByPinDone(notesData, notesData))
          .run()
          .then(({ allEffects }) => {
            const filtered = filterEffectsByAction(
              allEffects,
              'PUT',
              splitToColumns(notesData, 3)
            );

            expect(filtered.length).toBe(0);
          });
      });
    });

    describe('`formatNotesForFeedDone()`', () => {
      it('if page is `PAGE_HOME` formatted data must be a Map of shape `{ pinned, other }`', () => {
        const notesData = List();
        const expected = Map({
          pinned: List(),
          other: List(),
        });

        const providerOptions = {
          notesData,
          currentPage: PAGE_HOME,
        };

        return expectSaga(watchFormatNotesForFeed)
          .provide(getProvider(providerOptions))
          .dispatch(formatNotesForFeed())
          .dispatch(applySearchFilterDone(notesData))
          .dispatch(splitByPinDone(notesData, notesData))
          .dispatch(splitToColumnsDone(notesData))
          .dispatch(splitToColumnsDone(notesData))
          .run()
          .then(({ allEffects }) => {
            const filtered = filterEffectsByAction(
              allEffects,
              'PUT',
              formatNotesForFeedDone(expected)
            );

            expect(filtered.length).toBe(1);
          });
      });

      it('if page is `PAGE_TRASH` formatted data must be a List', () => {
        const notesData = List();
        const expected = List();

        const providerOptions = {
          notesData,
          currentPage: PAGE_TRASH,
        };

        return expectSaga(watchFormatNotesForFeed)
          .provide(getProvider(providerOptions))
          .dispatch(formatNotesForFeed())
          .dispatch(applySearchFilterDone(notesData))
          .dispatch(splitByPinDone(notesData, notesData))
          .dispatch(splitToColumnsDone(notesData))
          .run()
          .then(({ allEffects }) => {
            const filtered = filterEffectsByAction(
              allEffects,
              'PUT',
              formatNotesForFeedDone(expected)
            );

            expect(filtered.length).toBe(1);
          });
      });
    });
  });
});
