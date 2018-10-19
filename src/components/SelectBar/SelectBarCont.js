import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {
  togglePinNotes,
  clearSelection,
  moveNotesToTrash,
  deleteNotes,
} from '../../actions';

import { PAGE_TRASH } from '../../constants/types';
import { SelectBarView } from '.';


let SelectBarCont = class extends Component {
  handlePin = () => {
    const {
      selectedNotes,
      togglePinNotes,
      clearSelection,
    } = this.props;

    togglePinNotes(selectedNotes);
    clearSelection();
  }

  handleMoveToTrash = () => {
    const {
      selectedNotes,
      moveNotesToTrash,
      clearSelection,
    } = this.props;

    moveNotesToTrash(selectedNotes);
    clearSelection();
  }

  handleDeleteForever = () => {
    const {
      selectedNotes,
      deleteNotes,
      clearSelection,
    } = this.props;

    deleteNotes(selectedNotes);
    clearSelection();
  }

  handleClearSelection = () => {
    const { clearSelection } = this.props;
    clearSelection();
  }

  render () {
    const { currentPage, selectedNotes } = this.props;
    const selectedNotesCount = selectedNotes.size;
    const isTrash = currentPage === PAGE_TRASH;

    return (
      <SelectBarView
        selectedNotesCount={selectedNotesCount}
        isTrash={isTrash}
        onPin={this.handlePin}
        onMoveToTrash={this.handleMoveToTrash}
        onDeleteForever={this.handleDeleteForever}
        onClearSelection={this.handleClearSelection}
      />
    );
  }
};


SelectBarCont.propTypes = {
  // state
  currentPage: PropTypes.string.isRequired,
  selectedNotes: ImmutablePropTypes.list.isRequired,

  // actions
  togglePinNotes: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  moveNotesToTrash: PropTypes.func.isRequired,
  deleteNotes: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  currentPage: state.common.get('currentPage'),
  selectedNotes: state.select.get('selectedNotes'),
});

const mapDispatchToProps = {
  togglePinNotes,
  clearSelection,
  moveNotesToTrash,
  deleteNotes,
};

SelectBarCont = connect(mapStateToProps, mapDispatchToProps)(SelectBarCont);

export { SelectBarCont };
