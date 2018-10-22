import { Map } from 'immutable';
import { expectSaga, matchers } from 'redux-saga-test-plan';
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

import {
  getTagById,
  getCreateTagValue,
  getEditTagValue,
  getEditingTagId,
} from '../../selectors';


describe('tags saga', () => {
  it('`SHOW_TAGS_MODAL`: focuses `create tag` input', () => {
    return expectSaga(watchShowTagsModal)
      .put(focus('tags', 'create'))
      .dispatch(showTagsModal())
      .run();
  });

  it('`EDIT_TAGS_MODAL`: initializes edit form and focuses title input', () => {
    const tag = Map({ title: 'test tag' });

    return expectSaga(watchStartEditingTag)
      .provide([
        [matchers.select.selector(getTagById), tag],
      ])
      .put(initialize('tags', { edit: tag.get('title') }))
      .put(focus('tags', 'edit'))
      .dispatch(startEditingTag(1))
      .run();
  });

  it('`SUBMIT_CREATE_TAG`: dispatches `createTag()` with title from form and resets it', () => {
    const title = 'test tag';

    return expectSaga(watchSubmitCreateTag)
      .provide([
        [matchers.select.selector(getCreateTagValue), title],
      ])
      .put(createTag(title))
      .put(reset('tags', 'create'))
      .dispatch(submitCreateTag())
      .run();
  });

  it('`SUBMIT_EDIT_TAG`: dispatches `updateTag()` (with `id` and `title`) and `endEditingTag()`', () => {
    const id = 1;
    const title = 'test tag';

    return expectSaga(watchSubmitEditTag)
      .provide([
        [matchers.select.selector(getEditingTagId), id],
        [matchers.select.selector(getEditTagValue), title],
      ])
      .put(updateTag(id, title))
      .put(endEditingTag())
      .dispatch(submitEditTag())
      .run();
  });
});
