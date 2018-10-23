import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Heading, Columns } from 'react-bulma-components/full';

import style from './NotesFeed.module.scss';
import { Note } from '..';


const NotesFeedView = ({
  notes: { pinned, other },
  pinnedIds,
  selectedIds,
  editingId,
  isGrid,
}) => {
  const hasPinned = pinned && pinned[0];
  const hasUnpinned = other && other[0];

  const renderNote = (note) => {
    const id = note.get('id');
    const title = note.get('title');
    const content = note.get('content');
    const deleting = note.get('deleting');

    const isPinned = pinnedIds.includes(id);
    const isSelected = selectedIds.includes(id);
    const isEditing = editingId === id;

    const cls = classNames({
      [style.noteWrapper]: true,
      [style.isEditing]: isEditing,
    });

    return (
      <div key={id} className={cls}>
        <Note
          id={id}
          title={title}
          content={content}
          isInTrash={deleting}
          isPinned={isPinned}
          isSelected={isSelected}
          isEditing={isEditing}
        />
      </div>
    );
  };

  const renderSection = (isPinned = false) => {
    const notes = isPinned ? pinned : other;
    const heading = isPinned ? 'Pinned' : 'Other';

    const cls = classNames({
      [style.sectionPinned]: isPinned,
      [style.sectionUnpinned]: !isPinned,
    });

    return (
      <div className={cls}>
        {hasPinned && (
          <Heading subtitle size={6}>
            <div className="heading">{heading}</div>
          </Heading>
        )}
        {isGrid ? renderGrid(notes) : renderList(notes)}
      </div>
    );
  };

  const renderGrid = (notes) => (
    <div className={style.notes}>
      <Columns>
        {Object.keys(notes).map((key) => (
          <Columns.Column key={key}>
            {notes[key].map(renderNote)}
          </Columns.Column>
        ))}
      </Columns>
    </div>
  );

  const renderList = (notes) => (
    <div>{notes.map(renderNote)}</div>
  );

  const cls = classNames({
    [style.notesFeed]: true,
    [style.notesGrid]: isGrid,
    [style.notesList]: !isGrid,
  });

  return (
    <div className={cls}>
      {hasPinned && renderSection(true)}
      {hasUnpinned && renderSection()}
    </div>
  );
};


NotesFeedView.propTypes = {
  notes: PropTypes.shape({
    pinned: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    other: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
  }).isRequired,
  pinnedIds: ImmutablePropTypes.list.isRequired,
  selectedIds: ImmutablePropTypes.list.isRequired,
  editingId: PropTypes.string,
  isGrid: PropTypes.bool,
};

NotesFeedView.defaultProps = {
  isGrid: true,
};


export { NotesFeedView };
