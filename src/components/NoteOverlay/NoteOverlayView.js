import React, { Component, Fragment } from 'react';
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


const NoteOverlayView = class extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // without this check adding new tags will be unnoticable
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
           JSON.stringify(this.state) !== JSON.stringify(nextState)
  }

  render() {
    const {
      id,
      noteData,
      allTags,
      isInTrash,
      isPinned,
      isSelected,
      isEditing,
      isApplyTagsShown,
      onPin,
      onSelect,
      onSave,
      onApplyTags,
      onApplyTagsClick,
      onTagClick,
      onMoveToTrash,
      onRestore,
      onDeleteForever,
      onRemoveTag,
    } = this.props;

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
        tooltip={isPinned ? 'Unpin note' : 'Pin note'}/>
    );

    const select = (
      <Tooltip text={isSelected ? 'Deselect note' : 'Select note'}>
        <button
          type="button"
          onClick={onSelect}
          className={style.select}>
          <i className='fas fa-check'/>
        </button>
      </Tooltip>
    );

    const toolbar = (
      <NoteToolbar
        id={id}
        allTags={allTags}
        isInTrash={isInTrash}
        isEditing={isEditing}
        isApplyTagsShown={isApplyTagsShown}
        onSave={onSave}
        onApplyTags={onApplyTags}
        onApplyTagsClick={onApplyTagsClick}
        onMoveToTrash={onMoveToTrash}
        onRestore={onRestore}
        onDeleteForever={onDeleteForever}/>
    );

    return (
      <div className={cls}>
        {!isInTrash && (
          <StopPropagation>
            <div className={style.pinWrapper}>
              {pin}
            </div>
          </StopPropagation>)}
        <StopPropagation>
          <div className={style.selectWrapper}>
            {select}
          </div>
        </StopPropagation>
        {(noteData.get('tags').size > 0) && (
          <StopPropagation>
            <div className={style.tagsWrapper}>
              <NoteTags
                id={id}
                allTags={allTags}
                tags={noteData.get('tags')}
                onTagClick={onTagClick}
                onRemoveTag={onRemoveTag}/>
            </div>
          </StopPropagation>)}
        <StopPropagation>
          <div className={style.toolbarWrapper}>
            {toolbar}
          </div>
        </StopPropagation>
      </div>
    );
  }
};

const NoteTags = ({
  id,
  allTags,
  tags,
  onRemoveTag,
  onTagClick,
}) => {
  let tagsNum = 0;

  const charSum = tags.reduce((acc, tagId) => {
    const charsNum = allTags
      .find((tag) => tag.get('id') === tagId)
      .get('title').length;

    if (acc + charsNum <= 10) {
      tagsNum += 1;
    }

    return acc + charsNum;
  }, 0);

  const tagsLeft = tags.size - tagsNum;

  const renderTag = (tagId) => {
    const tagTitle = allTags
      .find((tag) => tag.get('id') === tagId)
      .get('title');

    return (
      <div key={tagId} className={style.noteTag}>
        <div
          className={style.noteTagTitle}
          onClick={() => onTagClick(tagTitle)}>
          {tagTitle}
        </div>
        <StopPropagation>
          <div
            className={style.noteTagRemove}
            onClick={() => onRemoveTag(id, tagId)}>
            {'✕'}
          </div>
        </StopPropagation>
      </div>
    );
  };

  return (
    <Fragment>
      {tags.take(tagsNum).map(renderTag)}
      {(tagsLeft > 0) && ( 
        <div className={style.noteTagsLeft}>
          <div className={style.noteTagTitle}>
            {`${tagsLeft}+`}
          </div>
        </div>)}
    </Fragment>
  );
}


NoteOverlayView.propTypes = {
  // data
  allTags: ImmutablePropTypes.list,
  isPinned: PropTypes.bool,
  isSelected: PropTypes.bool,
  isEditing: PropTypes.bool,
  isInTrash: PropTypes.bool,

  // callbacks
  onPin: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  onMoveToTrash: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
  onDeleteForever: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
};


export { NoteOverlayView };
