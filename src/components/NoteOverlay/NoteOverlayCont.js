import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { NoteOverlayView } from '.';

import {
  getNotesById,
  getTagsById,
  getNotesIsSelecting,
  getTrashNotesIds,
  getTagsIsApplyTagsShown,
} from '../../selectors';

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
  applyTags,
  removeTagFromNote,
  togglePinNotes,
  showApplyTags,
} from '../../actions';


let NoteOverlayCont = ({
  history,
  id,
  notes,
  allTags,
  trashIds,
  isPinned,
  isSelected,
  isEditing,
  isApplyTagsShown,
  togglePinNotes,
  toggleSelectNote,
  saveEditedNote,
  applyTags,
  removeTagFromNote,
  moveNotesToTrash,
  restoreNotesFromTrash,
  deleteNotes,
  showApplyTags,
}) => {
  const noteData = notes.find((note) => note.get('id') === id);

  const setTagFilter = (tagTitle) => {
    history.push(`#${tagTitle}`);
  };

  return (
    <NoteOverlayView
      id={id}
      noteData={noteData}
      allTags={allTags}
      isPinned={isPinned}
      isSelected={isSelected}
      isEditing={isEditing}
      isInTrash={trashIds.includes(id)}
      isApplyTagsShown={isApplyTagsShown}
      onPin={() => togglePinNotes([id])}
      onSelect={() => toggleSelectNote(id)}
      onSave={saveEditedNote}
      onTagClick={setTagFilter}
      onApplyTagsClick={showApplyTags}
      onApplyTags={() => applyTags(id)}
      onRemoveTag={removeTagFromNote}
      onMoveToTrash={() => moveNotesToTrash(id)}
      onRestore={() => restoreNotesFromTrash(id)}
      onDeleteForever={() => deleteNotes(id)}
    />
  )
};


NoteOverlayCont.propTypes = {
  // state
  allTags: ImmutablePropTypes.list.isRequired,
  isSelecting: PropTypes.bool,
  trashIds: ImmutablePropTypes.list,
  isApplyTagsShown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),

  // actions
  toggleSelectNote: PropTypes.func.isRequired,
  endEditingNote: PropTypes.func.isRequired,
  moveNotesToTrash: PropTypes.func.isRequired,
  pinNotes: PropTypes.func.isRequired,
  restoreNotesFromTrash: PropTypes.func.isRequired,
  saveEditedNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  startEditingNote: PropTypes.func.isRequired,
  applyTags: PropTypes.func.isRequired,
  removeTagFromNote: PropTypes.func.isRequired,
  togglePinNotes: PropTypes.func.isRequired,
  showApplyTags: PropTypes.func.isRequired,
  deleteNotes: PropTypes.func.isRequired,

  // flow
  id: PropTypes.string.isRequired,
  isPinned: PropTypes.bool,
  isSelected: PropTypes.bool,
  isEditing: PropTypes.bool,
};


const mapStateToProps = (state) => ({
  notes: getNotesById(state),
  allTags: getTagsById(state).toList(),
  isSelecting: getNotesIsSelecting(state),
  trashIds: getTrashNotesIds(state),
  isApplyTagsShown: getTagsIsApplyTagsShown(state),
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
  applyTags,
  removeTagFromNote,
  togglePinNotes,
  showApplyTags,
};

NoteOverlayCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteOverlayCont);

NoteOverlayCont = withRouter(NoteOverlayCont);


export { NoteOverlayCont };
