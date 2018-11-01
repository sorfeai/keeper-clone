import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { focus, initialize } from 'redux-form';

import { NoteView } from '.';
import { getNotesIsSelecting } from '../../selectors';

import {
  startEditingNote,
  saveEditedNote,
  toggleSelectNote,
} from '../../actions';


let NoteCont = class extends Component {
  handleEditRef = (node) => {
    if (!this.node) {
      this.editNode = node;
    }
  }

  handleContentInputRef = (node) => {
    if (!this.node) {
      this.contentInputNode = node;
    }
  }

  handleAreaClick = () => {
    const { selecting, isEditing } = this.props;

    if (!isEditing) {
      selecting ? this.select() : this.edit();
    }
  }

  handleSave = () => {
    const { saveEditedNote } = this.props;
    saveEditedNote();
  }

  handleContentInputChange = () => {
    const mhReached = this.isMaxHeightReached();

    if (mhReached && !this.wasMaxHeightReached) {
      const taHeight = this.contentInputNode.offsetHeight;
      const taElem = this.contentInputNode.childNodes[0];
      taElem.style.maxHeight = `${taHeight}px`;
      this.wasMaxHeightReached = true;
    }
  }

  isMaxHeightReached () {
    const { top } = this.editNode.getBoundingClientRect();
    return top <= 35;
  }

  select () {
    const { id, toggleSelectNote } = this.props;
    toggleSelectNote(id);
  }

  edit () {
    const {
      id,
      title,
      content,
      startEditingNote,
      initialize,
      focus,
    } = this.props;

    startEditingNote(id, title, content);

    // wait to let redux-form register the fields
    setTimeout(() => {
      initialize('editNote', { title, content });
      focus('editNote', 'title');
    });
  }

  editFormValidate ({ title }) {
    return title ? {} : 'Error';
  }

  render () {
    const {
      id,
      title,
      content,
      isEditing,
      isSelected,
      isPinned,
    } = this.props;

    return (
      <NoteView
        id={id}
        title={title}
        content={content}
        isEditing={isEditing}
        isSelected={isSelected}
        isPinned={isPinned}
        onEditRef={this.handleEditRef}
        onContentInputRef={this.handleContentInputRef}
        onAreaClick={this.handleAreaClick}
        onContentInputChange={this.handleContentInputChange}
        onSave={this.handleSave}
        editFormValidate={this.editFormValidate}
      />
    );
  }
};


NoteCont.propTypes = {
  //state
  selecting: PropTypes.bool,

  // actions
  focus: PropTypes.func.isRequired,
  startEditingNote: PropTypes.func.isRequired,
  saveEditedNote: PropTypes.func.isRequired,
  toggleSelectNote: PropTypes.func.isRequired,

  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
  isSelected: PropTypes.bool,
  isPinned: PropTypes.bool,
};


const mapStateToProps = (state) => ({
  selecting: getNotesIsSelecting(state),
});

const mapDispatchToProps = {
  initialize,
  focus,
  startEditingNote,
  saveEditedNote,
  toggleSelectNote,
};

NoteCont = connect(mapStateToProps, mapDispatchToProps)(NoteCont);


export { NoteCont };
