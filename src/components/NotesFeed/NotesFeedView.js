import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Heading, Columns } from 'react-bulma-components/full';

import style from './NotesFeed.module.scss';
import { Note } from '..';


const NotesFeedView = ({
  notes,
  isTrash,
  pinnedIds,
  selectedIds,
  editingId,
  isGrid,
}) => {
  if (!notes) return null;

  let pinned;
  let unpinned;
  let hasPinned;
  let hasUnpinned;

  if (!isTrash) {
    pinned = notes.get('pinned');
    unpinned = notes.get('unpinned');
    hasPinned = pinned.first();
    hasUnpinned = unpinned.first();
  }

  const renderNote = (note) => {
    const id = note.get('id');
    const title = note.get('title');
    const content = note.get('content');

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
          isPinned={isPinned}
          isSelected={isSelected}
          isEditing={isEditing}
        />
      </div>
    );
  };

  const renderSection = (isPinned = false) => {
    const notes = isPinned ? pinned : unpinned;
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
        {isGrid
          ? renderGrid(notes)
          : renderList(notes)}
      </div>
    );
  };

  const renderGrid = (notes) => (
    <div className={style.notes}>
      <Columns>
        {notes.keySeq().map((key) => (
          <Columns.Column key={key}>
            {notes
            .get(key)
            .map(renderNote)}
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

  const home = (
    <Fragment>
      {hasPinned && renderSection(true)}
      {hasUnpinned && renderSection()}
    </Fragment>
  );

  const trash = isGrid
    ? renderGrid(notes)
    : renderList(notes);

  return (
    <div className={cls}>
      {isTrash ? trash : home}
    </div>
  );
};


NotesFeedView.propTypes = {
  notes: ImmutablePropTypes.map,
  pinnedIds: ImmutablePropTypes.list,
  selectedIds: ImmutablePropTypes.list,
  editingId: PropTypes.string,
  isTrash: PropTypes.bool,
  isGrid: PropTypes.bool,
};


export { NotesFeedView };
