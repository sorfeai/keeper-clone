import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Field } from 'redux-form';

import { required } from '../../validation';
import { Modal, IconButton, TextInput } from '..';
import style from './TagsManager.module.scss';


const TagsManagerView = ({
  tags,
  editingId,
  isModalShown,
  onModalClose,
  onHideTagsModal,
  onDeleteTags,
  onStartEditingTag,
  onEndEditingTag,
  onSubmitCreateTag,
  onSubmitEditTag,
  canSubmitCreate,
  canSubmitEdit,
}) => {
  if (!isModalShown) return null;

  const renderTag = (id, title) => (
    <div key={id} className={`${style.tagItem} level`}>
      <div className='level-left'>
        <div className={`${style.tagTitle} level-item`}>
          {title}
        </div>
      </div>
      <div className='level-right'>
        <div className={`${style.tagAction} level-item`}>
          <IconButton
            onClick={() => onStartEditingTag(id)}
            icon='edit'
            tooltip='Edit tag'
            small
          />
        </div>
        <div className={`${style.tagAction} level-item`}>
          <IconButton
            onClick={() => onDeleteTags([id])}
            icon='trash'
            tooltip='Delete tag'
            small
          />
        </div>
      </div>
    </div>
  );

  const renderTagEditing = (id) => (
    <div key={id} className={`${style.tagItem} level`}>
      <div className='level-left'>
        <div className={`${style.tagTitle} level-item`}>
          <div className={style.editInputWrapper}>
            <Field
              component={TextInput}
              name="edit"
              validate={required}
              appearance="line"
            />
          </div>
        </div>
      </div>
      <div className='level-right'>
        <div className={`${style.tagAction} level-item`}>
          <IconButton
            onClick={onSubmitEditTag}
            icon='check'
            tooltip='Save'
            disabled={!canSubmitEdit}
            small
          />
        </div>
        <div className={`${style.tagAction} level-item`}>
          <IconButton
            onClick={onEndEditingTag}
            icon='ban'
            tooltip='Cancel'
            small
          />
        </div>
      </div>
    </div>
  );

  const renderSubmit = () => (
    <button
      type="button"
      onClick={onHideTagsModal}
      className='button is-light'
    >
      {'Done'}
    </button>
  );

  return (
    <Modal
      title='Create new tag'
      onClose={onModalClose}
      renderFooter={renderSubmit}
    >
      <div>
        <div className={style.titleInputWrapper}>
          <Field
            component={TextInput}
            name="create"
            placeholder="Tag title"
            validate={required}
            appearance="rounded"
          />
          <IconButton
            onClick={onSubmitCreateTag}
            icon='plus'
            tooltip='Create tag'
            disabled={!canSubmitCreate}
          />
        </div>
        {tags && (
          <div className={style.tagsWrapper}>
            {tags.map((tag) => {
              const id = tag.get('id');
              const title = tag.get('title');

              return id !== editingId
                ? renderTag(id, title)
                : renderTagEditing(id, title);
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};


TagsManagerView.propTypes = {
  tags: ImmutablePropTypes.list.isRequired,
  editingId: PropTypes.string,
  isModalShown: PropTypes.bool,
  onModalClose: PropTypes.func.isRequired,
  onHideTagsModal: PropTypes.func.isRequired,
  onCreateTag: PropTypes.func.isRequired,
  onDeleteTags: PropTypes.func.isRequired,
  onStartEditingTag: PropTypes.func.isRequired,
  onEndEditingTag: PropTypes.func.isRequired,
  onSubmitCreateTag: PropTypes.func.isRequired,
  onSubmitEditTag: PropTypes.func.isRequired,
  canSubmitCreate: PropTypes.bool,
  canSubmitEdit: PropTypes.bool,
};


export { TagsManagerView };
