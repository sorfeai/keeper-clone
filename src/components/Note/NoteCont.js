import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NoteView } from '.';

import {
  startEditingNote,
  saveEditedNote,
  selectNote,
  deselectNote,
} from '../../actions';


let NoteCont = class extends Component {
  handleAreaClick = () => {
    const { selecting } = this.props;
    selecting ? this.handleSelect() : this.edit();
  }

  handleSelect () {
    const { id, isSelected, deselectNote, selectNote } = this.props;
    isSelected ? deselectNote(id) : selectNote(id);
  }

  handleSave = () => {
    const { saveEditedNote } = this.props;
    saveEditedNote();
  }

  edit () {
    const { id, title, content, startEditingNote } = this.props;
    startEditingNote(id, title, content);
  }

  render () {
    const {
      id,
      title,
      content,
      isInTrash,
      isEditing,
      isSelected,
      isPinned,
    } = this.props;

    return (
      <NoteView
        id={id}
        title={title}
        content={content}
        isInTrash={isInTrash}
        isEditing={isEditing}
        isSelected={isSelected}
        isPinned={isPinned}
        onAreaClick={this.handleAreaClick}
        onSave={this.handleSave}
      />
    );
  }
};


NoteCont.propTypes = {
  //state
  selecting: PropTypes.bool,

  // actions
  startEditingNote: PropTypes.func.isRequired,
  saveEditedNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  deselectNote: PropTypes.func.isRequired,

  // flow
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isInTrash: PropTypes.bool,
  isEditing: PropTypes.bool,
  isSelected: PropTypes.bool,
  isPinned: PropTypes.bool,
};


const mapStateToProps = (state) => ({
  selecting: state.select.get('selecting'),
});

const mapDispatchToProps = {
  startEditingNote,
  saveEditedNote,
  selectNote,
  deselectNote,
};

NoteCont = connect(mapStateToProps, mapDispatchToProps)(NoteCont);


export { NoteCont };
