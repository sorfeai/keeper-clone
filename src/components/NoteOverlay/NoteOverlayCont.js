import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { NoteOverlayView } from '.';

import {
  deleteNotes,
  deselectNote,
  endEditingNote,
  moveNotesToTrash,
  pinNotes,
  restoreNotesFromTrash,
  saveEditedNote,
  selectNote,
  startEditingNote,
  tagNote,
  unpinNotes,
  updateNote,
} from '../../actions';


let NoteOverlayCont = class extends Component {
  handleSelect = () => {
    const { id, isSelected, deselectNote, selectNote } = this.props;
    isSelected ? deselectNote(id) : selectNote(id);
  }

  handlePin = (ev) => {
    const { id, isPinned, isEditing, pinNotes, unpinNotes } = this.props;

    ev.stopPropagation();
    if (isEditing) {
      ev.nativeEvent.stopImmediatePropagation();
    }
    isPinned ? unpinNotes([id]) : pinNotes([id]);
  }

  handleSave = () => {
    const { saveEditedNote } = this.props;
    saveEditedNote();
    // this.props.endEditingNote()
  }

  handleMoveToTrash = () => {
    const { id, moveNotesToTrash } = this.props;
    moveNotesToTrash(id);
    this.hideOtherMenu();
  }

  handleRestore = () => {
    const { id, restoreNotesFromTrash } = this.props;
    restoreNotesFromTrash(id);
    this.hideOtherMenu();
  }

  handleDeleteForever = () => {
    const { id, deleteNotes } = this.props;
    deleteNotes(id);
    this.hideOtherMenu();
  }

  saveEdited = () => {
    const { saveEditedNote } = this.props;
    saveEditedNote();
  }

  render () {
    const {
      isPinned,
      isSelected,
      isEditing,
      isInTrash,
    } = this.props;

    return (
      <NoteOverlayView
        isPinned={isPinned}
        isSelected={isSelected}
        isEditing={isEditing}
        isInTrash={isInTrash}
        onPin={this.handlePin}
        onSelect={this.handleSelect}
        onSave={this.handleSave}
        onAddTags={this.handleAddTags}
        onMoveToTrash={this.handleMoveToTrash}
        onRestore={this.handleRestore}
        onDeleteForever={this.handleDeleteForever}
      />
    );
  }
};


NoteOverlayCont.propTypes = {
  // state
  tags: ImmutablePropTypes.list.isRequired,
  selecting: PropTypes.bool,

  // actions
  deleteNotes: PropTypes.func.isRequired,
  deselectNote: PropTypes.func.isRequired,
  endEditingNote: PropTypes.func.isRequired,
  moveNotesToTrash: PropTypes.func.isRequired,
  pinNotes: PropTypes.func.isRequired,
  restoreNotesFromTrash: PropTypes.func.isRequired,
  saveEditedNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  startEditingNote: PropTypes.func.isRequired,
  tagNote: PropTypes.func.isRequired,
  unpinNotes: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,

  // flow
  id: PropTypes.string.isRequired,
  isPinned: PropTypes.bool,
  isSelected: PropTypes.bool,
  isEditing: PropTypes.bool,
  isInTrash: PropTypes.bool,
};


const mapStateToProps = (state) => ({
  tags: state.tags.get('byId'),
  selecting: state.select.get('selecting'),
});

const mapDispatchToProps = {
  deleteNotes,
  deselectNote,
  endEditingNote,
  moveNotesToTrash,
  pinNotes,
  restoreNotesFromTrash,
  saveEditedNote,
  selectNote,
  startEditingNote,
  tagNote,
  unpinNotes,
  updateNote,
};

NoteOverlayCont = connect(mapStateToProps, mapDispatchToProps)(NoteOverlayCont);


export { NoteOverlayCont };
