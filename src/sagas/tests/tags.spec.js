import { Map } from 'immutable';
import { expectSaga } from 'redux-saga-test-plan';
import { focus, initialize, reset } from 'redux-form';

import {
  watchShowTagsModal,
  watchStartEditingTag,
  watchSubmitCreateTag,
  watchSubmitEditTag,
} from '../tags';

import {
  showTagsModal,
  startEditingTag,
  submitCreateTag,
  submitEditTag,
  createTag,
  updateTag,
  endEditingTag,
} from '../../actions';


describe('tags sagas', () => {
  it('`SHOW_TAGS_MODAL`: focuses `create tag` input', () => {
    return expectSaga(watchShowTagsModal)
      .put(focus('tags', 'create'))
      .dispatch(showTagsModal())
      .run();
  });

  it('`EDIT_TAGS_MODAL`: initializes edit form and focuses title input', () => {
    const id = '1';
    const tag = Map({ id, title: 'test tag' });

    const state = {
      tags: Map({
        byId: Map({ [id]: tag }),
      }),
    };

    return expectSaga(watchStartEditingTag)
      .withState(state)
      .put(initialize(
        'tags',
        { edit: tag.get('title') }
      ))
      .put(focus('tags', 'edit'))
      .dispatch(startEditingTag(id))
      .run();
  });

  it('`SUBMIT_CREATE_TAG`: dispatches `createTag()` with title from form and resets it', () => {
    const title = 'test tag';

    const state = {
      form: {
        tags: {
          values: { title },
        },
      },
    };

    return expectSaga(watchSubmitCreateTag)
      .withState(state)
      .put(createTag(title))
      .put(reset('tags', 'create'))
      .dispatch(submitCreateTag())
      .run();
  });

  it('`SUBMIT_EDIT_TAG`: dispatches `updateTag()` (with `id` and `title`) and `endEditingTag()`', () => {
    const id = '1';
    const title = 'test tag';

    const state = {
      tags: Map({
        editingId: id,
      }),
      form: {
        tags: {
          values: { title },
        },
      },
    };

    return expectSaga(watchSubmitEditTag)
      .withState(state)
      .put(updateTag(id, title))
      .put(endEditingTag())
      .dispatch(submitEditTag())
      .run();
  });
});
