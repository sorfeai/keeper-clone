import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { PAGE_TRASH } from '../../constants/types';
import { NotesFeedView } from '.';

import { setTagFilter, resetTagFilter } from '../../actions';

import {
  getNotesFeed,
  getAppCurrentPage,
  getNotesPinnedIds,
  getNotesSelectedIds,
  getNotesEditingId,
  getNotesTagFilter,
  getAppIsFeedViewGrid,
  getTagsById,
} from '../../selectors';


let NotesFeedCont = class extends Component {
  componentDidUpdate({ location: { hash: prevHash  } }) {
    const { allTags, setTagFilter, resetTagFilter } = this.props;
    const { hash } = this.props.location;

    if (hash !== prevHash) {
      if (hash === '') {
        // remove tag filter
         resetTagFilter();
      } else if (hash !== '') {
        // either set tag filter or change one that presented
        const tagId = allTags
          .find((tag) => tag.get('title') === hash.slice(1))
          .get('id');
           
        setTagFilter(tagId);
      }
    }
  }

  render() {
    const {
      data,
      currentPage,
      isGrid,
      pinnedIds,
      selectedIds,
      editingId,
      allTags,
      tagFilter,
    } = this.props;

    return data && (
      <NotesFeedView
        notes={data}
        isTrash={currentPage === PAGE_TRASH}
        pinnedIds={pinnedIds}
        selectedIds={selectedIds}
        editingId={editingId}
        isGrid={isGrid}
        tagFilter={tagFilter}
      />
    );
  }
};


NotesFeedCont.propTypes = {
  // state
  data: ImmutablePropTypes.map,
  selectedIds: ImmutablePropTypes.list,
  pinnedIds: ImmutablePropTypes.list,
  editingId: PropTypes.string,
  searchQuery: PropTypes.string,
  isGrid: PropTypes.bool,
  allTags: ImmutablePropTypes.map.isRequired,
  tagFilter: PropTypes.string,

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
  allTags: getTagsById(state),
  tagFilter: getNotesTagFilter(state),
});

const mapDispatchToProps = {
  setTagFilter,
  resetTagFilter,
};

NotesFeedCont = connect(mapStateToProps, mapDispatchToProps)(NotesFeedCont);

NotesFeedCont = withRouter(NotesFeedCont);


export { NotesFeedCont };
