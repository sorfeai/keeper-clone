import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import style from './NoteOverlay.module.scss';

import {
  IconButton,
  Tooltip,
  NoteToolbar,
  StopPropagation,
} from '..';


const NoteOverlayView = ({
  tags,
  isInTrash,
  isPinned,
  isSelected,
  isEditing,
  onPin,
  onSelect,
  onSave,
  onAddTags,
  onMoveToTrash,
  onRestore,
  onDeleteForever,
}) => {
  const cls = classNames({
    [style.overlay]: true,
    [style.isPinned]: isPinned,
    [style.isSelected]: isSelected,
    [style.isEditing]: isEditing,
  });

  const pin = (
    <IconButton
      small
      onClick={onPin}
      icon='thumbtack'
      alt={isPinned}
      tooltip={isPinned ? 'Unpin note' : 'Pin note'}
    />
  );

  const select = (
    <Tooltip text={isSelected ? 'Deselect note' : 'Select note'}>
      <button
        type="button"
        onClick={onSelect}
        className={style.select}
      >
        <i className='fas fa-check' />
      </button>
    </Tooltip>
  );

  const toolbar = (
    <NoteToolbar
      isInTrash={isInTrash}
      isEditing={isEditing}
      tags={tags}
      onSave={onSave}
      onAddTags={onAddTags}
      onMoveToTrash={onMoveToTrash}
      onRestore={onRestore}
      onDeleteForever={onDeleteForever}
    />
  );

  return (
    <div className={cls}>
      {!isInTrash && (
        <StopPropagation>
          <div className={style.pinWrapper}>
            {pin}
          </div>
        </StopPropagation>
      )}
      <StopPropagation>
        <div className={style.selectWrapper}>
          {select}
        </div>
      </StopPropagation>
      <StopPropagation>
        <div className={style.toolbarWrapper}>
          {toolbar}
        </div>
      </StopPropagation>
    </div>
  );
};


NoteOverlayView.propTypes = {
  // data
  tags: ImmutablePropTypes.list,
  isPinned: PropTypes.bool,
  isSelected: PropTypes.bool,
  isEditing: PropTypes.bool,
  isInTrash: PropTypes.bool,

  // callbacks
  onPin: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onAddTags: PropTypes.func.isRequired,
  onMoveToTrash: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
  onDeleteForever: PropTypes.func.isRequired,
};


export { NoteOverlayView };
