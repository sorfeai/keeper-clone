import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { PAGE_HOME } from '../../constants/types';
import { PageHOC } from '..';
import { NotesFeedView } from '.';


let NotesFeedCont = class extends Component {
  getFormattedData () {
    const { searchQuery, gridView } = this.props;
    let { notesData } = this.props;

    if (searchQuery) {
      notesData = this.applySearchFilter(notesData);
    }

    let { pinned, other } = this.splitByPin(notesData);

    if (gridView) {
      if (pinned.length > 0) pinned = this.splitToColumns(pinned);
      other = this.splitToColumns(other);
    }

    return { pinned, other };
  }

  splitByPin () {
    const { notesData, notesInTrash, pinnedNotes } = this.props;
    const pinned = [];
    const other = [];

    notesData.forEach((note) => {
      const id = note.get('id');

      if (!notesInTrash.includes(id)) {
        if (pinnedNotes.includes(id)) {
          pinned.push(note);
        } else {
          other.push(note);
        }
      }
    });

    return { pinned, other };
  }

  splitToColumns (notes) {
    const { maxColumns } = this.props;

    // TODO: smart split considering element heights
    return notes.reduce((acc, note, index) => {
      const columnNum = index % maxColumns;
      return {
        ...acc,
        [columnNum]: acc[columnNum]
          ? [...acc[columnNum], note]
          : [note],
      };
    }, {});
  }

  render () {
    const { gridView, pinnedNotes, selectedNotes, editingId } = this.props;
    const notes = this.getFormattedData();

    return (
      <NotesFeedView
        notes={notes}
        pinnedIds={pinnedNotes}
        selectedIds={selectedNotes}
        editingId={editingId}
        isGrid={gridView}
      />
    );
  }
};


NotesFeedCont.propTypes = {
  // state
  notesData: ImmutablePropTypes.list.isRequired,
  selectedNotes: ImmutablePropTypes.list.isRequired,
  pinnedNotes: ImmutablePropTypes.list.isRequired,
  editingId: PropTypes.string,
  notesInTrash: ImmutablePropTypes.list,
  searchQuery: PropTypes.string,
  editing: PropTypes.bool,
  selecting: PropTypes.bool,
  gridView: PropTypes.bool,

  // flow
  maxColumns: PropTypes.number,
};

NotesFeedCont.defaultProps = {
  gridView: true,
  maxColumns: 2,
};


// TODO: rewrite with selectors
const mapStateToProps = (state) => ({
  notesData: state.notes.get('byId').toList(),
  selectedNotes: state.select.get('selectedNotes'),
  pinnedNotes: state.pin.get('ids'),
  notesInTrash: state.trash.get('notesById'),
  searchQuery: state.common.get('searchQuery'),
  selecting: state.select.get('selecting'),
  editing: state.edit.get('editing'),
  editingId: state.edit.get('id'),
  gridView: state.common.get('feedViewIsGrid'),
});

NotesFeedCont = connect(mapStateToProps)(NotesFeedCont);
NotesFeedCont = PageHOC(PAGE_HOME)(NotesFeedCont);


export { NotesFeedCont };
