import React, { Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Box } from 'react-bulma-components/full';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  OuterClick,
  NoteOverlay,
  TextInput,
  Textarea,
} from '..';

import style from './Note.module.scss';


const NoteView = ({
  id,
  title,
  content,
  isInTrash,
  isEditing,
  isSelected,
  isPinned,
  onEditRef,
  onContentInputRef,
  onSave,
  onContentInputChange,
  onAreaClick,
  editFormValidate,
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

  const isTitleHighlighted = title.indexOf('[HL_START]') !== -1;
  const isContentHighlighted = content.indexOf('[HL_START]') !== -1;

  let titleHighlightPre;
  let titleHighlightInner;
  let titleHighlightAfter;

  let contentHighlightPre;
  let contentHighlightInner;
  let contentHighlightAfter;

  if (isTitleHighlighted) {
    titleHighlightPre = title.slice(0, title.indexOf('[HL_START]'));
    titleHighlightInner = title.slice(title.indexOf('[HL_START]') + 10, title.indexOf('[HL_END]'));
    titleHighlightAfter = title.slice(title.indexOf('[HL_END]') + 8);

    title = title
      .replace('[HL_START]', '')
      .replace('[HL_END]', '');
  }

  if (isContentHighlighted) {
    contentHighlightPre = content.slice(0, content.indexOf('[HL_START]'));
    contentHighlightInner = content.slice(content.indexOf('[HL_START]') + 10, content.indexOf('[HL_END]'));
    contentHighlightAfter = content.slice(content.indexOf('[HL_END]') + 8);

    content = content
      .replace('[HL_START]', '')
      .replace('[HL_END]', '');
  }

  const preview = (
    <Fragment>
      <div className={style.titleWrapper}>
        <strong>
          {isTitleHighlighted ? (
            <span>
              {titleHighlightPre}
              <span className={style.highlightText}>
                {titleHighlightInner}
              </span>
              {titleHighlightAfter}
            </span>
          ) : title}
        </strong>
      </div>
      <p>
        {isContentHighlighted ? (
          <span>
            {contentHighlightPre}
            <span className={style.highlightText}>
              {contentHighlightInner}
            </span>
            {contentHighlightAfter}
          </span>
        ) : content}
      </p>
    </Fragment>
  );

  let EditForm = () => (
    <form className={style.editForm}>
      <div className={style.titleInputWrapper}>
        <Field
          component={TextInput}
          type="text"
          name="title"
          appearance="seamless"
          isFullwidth
          isBoldText
        />
      </div>
      <div
        className={style.contentInputWrapper}
        ref={onContentInputRef}>
        <Field
          component={Textarea}
          name="content"
          onChangeCustom={onContentInputChange}
          appearance="seamless"
          isFullwidth
          isAutosized
        />
      </div>
    </form>
  );

  EditForm = reduxForm({
    form: 'editNote',
    validate: editFormValidate,
  })(EditForm);

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
          {isEditing ? <EditForm /> : preview}
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
          <div ref={onEditRef}>
            {note}
          </div>
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
