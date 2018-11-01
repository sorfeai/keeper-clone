import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { NoteOverlayView } from '.';

import {
  getTagsById,
  getNotesIsSelecting,
  getTrashNotesIds,
} from '../../selectors'

import {
  toggleSelectNote,
  endEditingNote,
  moveNotesToTrash,
  deleteNotes,
  pinNotes,
  restoreNotesFromTrash,
  saveEditedNote,
  selectNote,
  startEditingNote,
  tagNote,
  togglePinNotes,
} from '../../actions';


let NoteOverlayCont = class extends Component {
  handleSelect = () => {
    const { id, toggleSelectNote } = this.props;
    toggleSelectNote(id);
  }

  handlePin = () => {
    const { id, togglePinNotes } = this.props;
    togglePinNotes([id]);
  }

  handleSave = () => {
    const { saveEditedNote } = this.props;
    saveEditedNote();
  }

  handleMoveToTrash = () => {
    const { id, moveNotesToTrash } = this.props;
    moveNotesToTrash(id);
  }

  handleRestore = () => {
    const { id, restoreNotesFromTrash } = this.props;
    restoreNotesFromTrash(id);
  }

  handleDeleteForever = () => {
    const { id, deleteNotes } = this.props;
    deleteNotes(id);
  }

  saveEdited = () => {
    const { saveEditedNote } = this.props;
    saveEditedNote();
  }

  render () {
    const {
      id,
      trashIds,
      isPinned,
      isSelected,
      isEditing,
    } = this.props;

    return (
      <NoteOverlayView
        isPinned={isPinned}
        isSelected={isSelected}
        isEditing={isEditing}
        isInTrash={trashIds.includes(id)}
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
  tags: ImmutablePropTypes.map.isRequired,
  selecting: PropTypes.bool,
  trashIds: ImmutablePropTypes.list,

  // actions
  toggleSelectNote: PropTypes.func.isRequired,
  endEditingNote: PropTypes.func.isRequired,
  moveNotesToTrash: PropTypes.func.isRequired,
  pinNotes: PropTypes.func.isRequired,
  restoreNotesFromTrash: PropTypes.func.isRequired,
  saveEditedNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  startEditingNote: PropTypes.func.isRequired,
  tagNote: PropTypes.func.isRequired,
  togglePinNotes: PropTypes.func.isRequired,

  // flow
  id: PropTypes.string.isRequired,
  isPinned: PropTypes.bool,
  isSelected: PropTypes.bool,
  isEditing: PropTypes.bool,
};


const mapStateToProps = (state) => ({
  tags: getTagsById(state),
  selecting: getNotesIsSelecting(state),
  trashIds: getTrashNotesIds(state),
});

const mapDispatchToProps = {
  toggleSelectNote,
  endEditingNote,
  moveNotesToTrash,
  deleteNotes,
  pinNotes,
  restoreNotesFromTrash,
  saveEditedNote,
  selectNote,
  startEditingNote,
  tagNote,
  togglePinNotes,
};

NoteOverlayCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteOverlayCont);


export { NoteOverlayCont };
