import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Box } from 'react-bulma-components/full';

import { OuterClick, NoteOverlay } from '..';
import style from './Note.module.scss';


const NoteView = ({
  id,
  title,
  content,
  isInTrash,
  isEditing,
  isSelected,
  isPinned,
  onSave,
  onAreaClick,
}) => {
  const wrapperCls = classNames({
    [style.wrapper]: true,
    [style.isEditing]: isEditing,
  });

  const noteCls = classNames({
    [style.note]: true,
    [style.isSelected]: isSelected,
    [style.isPinned]: isPinned,
  });

  const preview = (
    <Fragment>
      <div className={style.titleWrapper}>
        <strong>{title}</strong>
      </div>
      <p>{content}</p>
    </Fragment>
  );

  const edit = (
    <form>
      {/* some redux-form here... */}
    </form>
  );

  const note = (
    <Box className={noteCls}>
      <div className={style.inner}>
        <div className={style.overlayWrapper}>
          <NoteOverlay
            id={id}
            isInTrash={isInTrash}
            isPinned={isPinned}
            isSelected={isSelected}
            isEditing={isEditing}
          />
        </div>
        <div className={style.content}>
          {isEditing ? edit : preview}
        </div>
      </div>
    </Box>
  );

  return (
    <div
      className={wrapperCls}
      onClick={onAreaClick}
    >
      {isEditing ? (
        <OuterClick onClick={onSave}>
          {note}
        </OuterClick>
      ) : note}
    </div>
  );
};


NoteView.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isInTrash: PropTypes.bool,
  isEditing: PropTypes.bool,
  isSelected: PropTypes.bool,
  isPinned: PropTypes.bool,
  onAreaClick: PropTypes.func.isRequired,
  onSave (props, propName, componentName) {
    if (!props[propName] && props.isEditing) {
      return new Error(
        `${componentName}: \`${propName}\` prop is required if \`isEditing\` prop is true.`
      );
    }
  },
};


export { NoteView };
