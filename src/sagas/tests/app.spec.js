import { expectSaga, matchers } from 'redux-saga-test-plan';
import { mockNotesData, filterEffectsByAction } from '../../testUtils';
import { watchInitApp } from '../app';
import { getNotesById } from '../../selectors';
import { formatNotesForFeed, initApp } from '../../actions';


describe('app sagas', () => {
  describe('watchInitApp', () => {
    it('dispatches formatNotesForFeed(data)', () => {
      const notes = mockNotesData(3);

      return expectSaga(watchInitApp)
        .provide([
          [matchers.select.selector(getNotesById), notes],
        ])
        .dispatch(initApp(notes))
        .run()
        .then(({ allEffects }) => {
          expect(
            filterEffectsByAction(
              allEffects,
              'PUT',
              formatNotesForFeed(notes)
            ).length
          ).toBe(1);
        });
    });
  });
});
