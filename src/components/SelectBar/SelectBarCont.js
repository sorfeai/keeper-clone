import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { PAGE_TRASH } from '../../constants/types';
import { SelectBarView } from '.';

import {
  getAppCurrentPage,
  getNotesSelectedIds,
} from '../../selectors';

import {
  togglePinNotes,
  clearSelection,
  moveNotesToTrash,
  deleteNotes,
} from '../../actions';


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
  currentPage: PropTypes.string.isRequired,
  selectedNotes: ImmutablePropTypes.list.isRequired,
  togglePinNotes: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  moveNotesToTrash: PropTypes.func.isRequired,
  deleteNotes: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  currentPage: getAppCurrentPage(state),
  selectedNotes: getNotesSelectedIds(state),
});

const mapDispatchToProps = {
  togglePinNotes,
  clearSelection,
  moveNotesToTrash,
  deleteNotes,
};

SelectBarCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectBarCont);


export { SelectBarCont };
