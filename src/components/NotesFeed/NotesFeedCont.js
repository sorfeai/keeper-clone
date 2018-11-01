import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { PAGE_TRASH } from '../../constants/types';
import { NotesFeedView } from '.';

import {
  getNotesFeed,
  getAppCurrentPage,
  getNotesPinnedIds,
  getNotesSelectedIds,
  getNotesEditingId,
  getAppIsFeedViewGrid,
} from '../../selectors';


let NotesFeedCont = ({
  data,
  currentPage,
  isGrid,
  pinnedIds,
  selectedIds,
  editingId,
}) => (
  data && (
    <NotesFeedView
      notes={data}
      isTrash={currentPage === PAGE_TRASH}
      pinnedIds={pinnedIds}
      selectedIds={selectedIds}
      editingId={editingId}
      isGrid={isGrid}
    />
  )
);


NotesFeedCont.propTypes = {
  // state
  data: ImmutablePropTypes.map,
  selectedIds: ImmutablePropTypes.list,
  pinnedIds: ImmutablePropTypes.list,
  editingId: PropTypes.string,
  searchQuery: PropTypes.string,
  isGrid: PropTypes.bool,

  // flow
  maxColumns: PropTypes.number.isRequired,
};

NotesFeedCont.defaultProps = {
  maxColumns: 3,
};


const mapStateToProps = (state) => ({
  data: getNotesFeed(state),
  currentPage: getAppCurrentPage(state),
  pinnedIds: getNotesPinnedIds(state),
  selectedIds: getNotesSelectedIds(state),
  editingId: getNotesEditingId(state),
  isGrid: getAppIsFeedViewGrid(state),
});

NotesFeedCont = connect(mapStateToProps)(NotesFeedCont);


export { NotesFeedCont };
