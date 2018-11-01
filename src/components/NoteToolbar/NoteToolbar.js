import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'small-uuid';

import { getFormErrors } from '../../selectors';
import { IconButton, OuterClick } from '..';
import style from './NoteToolbar.module.scss';


let NoteToolbar = class extends Component {
  state = {
    applyTagsPopup: false,
    applyTagsForm: { tags: [] },
  }

  handleApplyTagPopup = () => {
    this.setState((prev) => ({
      ...prev,
      applyTagsPopup: !prev.applyTagsPopup,
    }));
  }

  renderApplyTagPopup = () => {
    const { tags } = this.props;

    const onOuterClick = () => {
      this.onAddTag();
      this.handleApplyTagPopup();
    };

    return (
      <OuterClick onClick={onOuterClick}>
        <div className={`${style.popup} box`}>
          {'Apply tags'}
          <div className={style.tagsCheckList}>
            {tags.map((tag) =>
              <label
                key={tag.get('id')}
                className={`${style.tagCheckItem} checkbox`}
              >
                <input type='checkbox' />
                {tag.get('title')}
              </label>)}
          </div>
        </div>
      </OuterClick>
    );
  }

  render () {
    const {
      isInTrash,
      isEditing,
      onSave,
      onMoveToTrash,
      onRestore,
      onDeleteForever,
      tags,
      formEditErrors,
    } = this.props;

    const { editTitle, editContent } = this.props;
    const { applyTagsPopup } = this.state;

    const itemsFeed = [
      <Fragment>
        <IconButton
          small
          onClick={this.handleApplyTagPopup}
          icon="tag"
          tooltip="Add tag"
        />
        <div className={style.popupWrapper}>
          {applyTagsPopup && this.renderApplyTagPopup()}
        </div>
      </Fragment>,
      <IconButton
        small
        onClick={onMoveToTrash}
        icon="trash"
        tooltip="Move to trash"
      />,
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
      items = itemsFeed;
    }

    return (
      <div className={style.wrapper}>
        {items.map((item) =>
          <div key={uuid.create()} className={style.toolbarItem}>
            {item}
          </div>)}
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  formEditErrors: getFormErrors('edit')(state),
});

NoteToolbar = connect(mapStateToProps)(NoteToolbar);


export { NoteToolbar };
