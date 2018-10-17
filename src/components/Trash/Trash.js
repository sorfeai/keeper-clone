import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './Trash.module.scss';
import { PageHOC, Note } from '..';
import { clearTrash } from '../../actions';
import { PAGE_TRASH } from '../../constants/types';


let Trash = class extends Component {
  constructor (props) {
    super(props);

    this.setState({
      listView: false,
      columns: 3,
    });
  }

  shouldComponentUpdate (nextProps) {
    return !nextProps.editing;
  }

  applySearchFilter (data) {
    const { searchQuery } = this.props;

    return data.filter((note) =>
      note
        .get('title')
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||      note
        .get('content')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }

  renderGrid = (unpinned, pinned) => {
    const { selecting, selectedNotes, editingNote } = this.props;

    const hasPinned = pinned && pinned[0];
    const hasUnpinned = unpinned && unpinned[0];

    return (
      <div>
        {hasPinned && (
          <div className={style.pinnedSection}>
            <div className='subtitle is-6'>
              <div className='heading'>{'Pinned'}</div>
            </div>
            <div className={`${style.notes} columns`}>
              {Object.keys(pinned).map((key) =>
                <div key={key} className='column'>
                  {pinned[key].map((note) => (
                    <div key={note.get('id')} className={`${style.note}`}>
                      <Note
                        note={note}
                        trash
                        selecting={selecting}
                        selected={selectedNotes.includes(note.get('id'))}
                        editing={editingNote === note.get('id')}
                        pinned
                      />
                    </div>
                  ))}
                </div>)}
            </div>
          </div>
        )}
        {hasUnpinned && (
          <div className={style.otherNotesSection}>
            {hasPinned && (
              <div className='subtitle is-6'>
                <div className='heading'>{'Other'}</div>
              </div>
            )}
            <div className={`${style.notes} columns`}>
              {Object.keys(unpinned).map((key) =>
                <div key={key} className='column'>
                  {unpinned[key].map((note) =>
                    <div key={note.get('id')} className={style.note}>
                      <Note
                        note={note}
                        trash
                        selecting={selecting}
                        selected={selectedNotes.includes(note.get('id'))}
                        editing={editingNote === note.get('id')}
                      />
                    </div>
                  )}
                </div>)}
            </div>
          </div>
        )}
      </div>
    );
  }

  renderList = (unpinned, pinned) => {
    const { selecting, selectedNotes, editingNote } = this.props;

    const hasUnpinned = unpinned && unpinned[0];
    const hasPinned = pinned && pinned[0];

    return (
      <div className={style.list}>
        {hasPinned && (
          <div className={style.pinnedNotesSection}>
            <div className='subtitle is-6'>
              <div className='heading'>{'Pinned'}</div>
            </div>
            {pinned.map((note) =>
              <div key={note.get('id')} className={style.note}>
                <Note
                  note={note}
                  trash
                  selecting={selecting}
                  selected={selectedNotes.includes(note.get('id'))}
                  editing={editingNote === note.get('id')}
                  pinned
                />
              </div>
            )}
          </div>
        )}
        {hasUnpinned && (
          <div className={style.otherNotesSection}>
            {hasPinned && (
              <div className='subtitle is-6'>
                <div className='heading'>{'Other'}</div>
              </div>
            )}
            {unpinned.map((note) => (
              <div key={note.get('id')} className={style.note}>
                <Note
                  note={note}
                  trash
                  selecting={selecting}
                  selected={selectedNotes.includes(note.get('id'))}
                  editing={editingNote === note.get('id')}
                />
              </div>
            ))}
          </div>)}
      </div>
    );
  }

  renderMessage () {
    const { notesInTrash, clearTrash } = this.props;

    if (notesInTrash.size > 0) {
      return (
        <Fragment>
          <div className='subtitle is-5'>
            {'All notes will be deleted in 7 days.'}
          </div>
          <button
            type="submit"
            className="button is-light"
            onClick={clearTrash}
          >
            {'Clear trash'}
          </button>
        </Fragment>
      );
    }

    return (
      <div className='subtitle is-5'>
        {'Trash is empty.'}
      </div>
    );
  }

  render () {
    const {
      gridView,
      selecting,
      selectedNotes,
      searchQuery,
      pinnedNotes,
      notesInTrash,
    } = this.props;

    let { notesData } = this.props;
    const { columns } = this.state;

    if (searchQuery) {
      notesData = this.applySearchFilter(notesData);
    }

    let unpinned = [];
    let pinned = [];

    notesData.forEach((note) => {
      const id = note.get('id');

      if (!notesInTrash.includes(id)) return;

      if (pinnedNotes.includes(id)) {
        pinned.push(note);
      }  else {
        unpinned.push(note);
      }
    });

    if (gridView) {
      const divideByColumns = (notes) =>
        notes.reduce((acc, note, index) => {
          const columnNum = index % columns;
          return {
            ...acc,
            [columnNum]: acc[columnNum]
              ? [ ...acc[columnNum], note ]
              : [ note ],
          };
        }, {});

      unpinned = divideByColumns(unpinned);
      pinned = divideByColumns(pinned);
    }

    return (
      <div className={style.notesFeed}>
        <div className={style.messageWrapper}>
          <div className={style.message}>
            {this.renderMessage()}
          </div>
        </div>
        {gridView
          ? this.renderGrid(unpinned, pinned, selecting)
          : this.renderList(unpinned, pinned, selecting)}
      </div>
    );
  }
};


/**
* prop types
*/
Trash.propTypes = {
  gridView: PropTypes.bool,
};

Trash.defaultProps = {
  gridView: true,
};


/**
* HOCs
*/
const mapStateToProps = (state) => ({
  gridView: state.common.get('feedViewIsGrid'),
  notesData: state.notes.get('byId'),
  searchQuery: state.common.get('searchQuery'),
  selecting: state.select.get('selecting'),
  selectedNotes: state.select.get('selectedNotes'),
  pinnedNotes: state.pin.get('ids'),
  editing: state.edit.get('editing'),
  notesInTrash: state.trash.get('notesById'),
});

const mapDispatchToProps = { clearTrash };

Trash = connect(mapStateToProps, mapDispatchToProps)(Trash);
Trash = PageHOC(PAGE_TRASH)(Trash);


export { Trash };
