import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import DOM from 'react-dom-factories';
import { connect } from 'react-redux';
import uuid from 'small-uuid';

import {
  Field,
  FieldArray,
  reduxForm,
  change,
  registerField,
} from 'redux-form';

import { getFormErrors } from '../../selectors';
import { IconButton, OuterClick } from '..';
import style from './NoteToolbar.module.scss';

import {
  showApplyTags,
  hideApplyTags,
  applyTags,
} from '../../actions';


let NoteToolbar = class extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // without this check redux-form stucks in infinite loop of
    // register/unregister actions dispatch for whatever reason
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
           JSON.stringify(this.state) !== JSON.stringify(nextState)
  }

  renderApplyTagPopup = () => {
    const {
      allTags,
      change,
      hideApplyTags,
      onApplyTags,
      handleSubmit,
    } = this.props;

    const applyTags = () => {
      onApplyTags();
      hideApplyTags();
    };

    return (
      <OuterClick onClick={applyTags}>
        <div className={`${style.popup} box`}>
          {'Apply tags'}
          <div className={style.tagsCheckList}>
            <form onSubmit={handleSubmit(applyTags)}>
              {allTags.map((tag) => (
                <div key={tag.get('id')}>
                  <label
                    key={tag.get('id')}
                    className={`${style.tagCheckItem} checkbox`}
                  >
                    <Field
                      type="checkbox"
                      component="input"
                      name={tag.get('id')}
                    />
                    {tag.get('title')}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>
      </OuterClick>
    );
  }

  render () {
    const {
      id,
      isInTrash,
      isEditing,
      onSave,
      onMoveToTrash,
      onRestore,
      onDeleteForever,
      onApplyTags,
      allTags,
      formEditErrors,
      isApplyTagsShown,
      showApplyTags,
    } = this.props;

    const itemsHome = [
      <Fragment>
        <IconButton
          small
          onClick={() => showApplyTags(id)}
          icon="tag"
          tooltip="Apply tags"/>
        {(isApplyTagsShown && isApplyTagsShown === id) && (
          <div className={style.popupWrapper}>
            {this.renderApplyTagPopup()}
          </div>)}
      </Fragment>,
      <IconButton
        small
        onClick={onMoveToTrash}
        icon="trash"
        tooltip="Move to trash"
      />
    ];

    const itemsTrash = [
      <IconButton
        small
        onClick={onRestore}
        icon="sync-alt"
        tooltip="Restore"
      />,
      <IconButton
        small
        onClick={onDeleteForever}
        icon="ban"
        tooltip="Delete forever"
      />,
    ];

    const itemsEditing = [
      // FIXME: `onClick` event doesn't trigger when input is focused. Wtf?
      <button
        type="button"
        onClick={onSave}
        disabled={formEditErrors}
        className="button is-light"
      >
        {'Save'}
      </button>,
    ];

    let items;
    if (isInTrash) {
      items = itemsTrash;
    } else if (isEditing) {
      items = itemsEditing;
    } else {
      items = itemsHome;
    }

    return (
      <div className={style.wrapper}>
        {items.map((item) =>
          <div
            key={uuid.create()}
            className={style.toolbarItem}
          >
            {item}
          </div>)}
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  formEditErrors: getFormErrors('edit')(state),
});

const mapDispatchToProps = {
  registerField,
  change,
  showApplyTags,
  hideApplyTags,
  applyTags,
};

NoteToolbar = connect(mapStateToProps, mapDispatchToProps)(NoteToolbar);
NoteToolbar = reduxForm({ form: 'applyTags' })(NoteToolbar);


export { NoteToolbar };
