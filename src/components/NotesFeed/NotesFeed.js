import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import style from './NotesFeed.module.scss'
import { withPage, Note } from '..'
import { PAGE_HOME } from '../../constants/types'


let NotesFeed = class extends Component {
  state = {
    listView: false,
    columns: 3
  }

  static propTypes = {
    gridView: PropTypes.bool.isRequired
  }

  static defaultProps = {
    gridView: true
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.editing
  }

  applySearchFilter(data) {
    const { searchQuery } = this.props

    return data.filter(note =>
      note
        .get('title')
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      note
        .get('content')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  }

  renderGrid = (unpinned, pinned) => {
    const { selecting, selectedNotes, editingNote } = this.props

    const hasPinned = pinned && pinned[0]
    const hasUnpinned = unpinned && unpinned[0]

    return (
      <div>
        {hasPinned &&
          <div className={style.pinnedSection}>
            <div className='subtitle is-6'>
              <div className='heading'>Pinned</div>
            </div>
            <div className={`${style.notes} columns`}>
              {Object.keys(pinned).map((key, i) =>
                <div key={i} className='column'>
                  {pinned[key].map((note, i) => (
                    <div key={i} className={`${style.note}`}>
                      <Note
                        note={note}
                        selecting={selecting}
                        selected={selectedNotes.includes(note.get('id'))}
                        editing={editingNote === note.get('id')}
                        pinned={true}
                      />
                    </div>))}
                </div>)}
            </div>
          </div>}
        {hasUnpinned &&
          <div className={style.otherNotesSection}>
            {hasPinned &&
              <div className='subtitle is-6'>
                <div className='heading'>Other</div>
              </div>}
            <div className={`${style.notes} columns`}>
              {Object.keys(unpinned).map((key, i) =>
                <div key={i} className='column'>
                  {unpinned[key].map((note, i) =>
                    <div key={i} className={style.note}>
                      <Note
                        note={note}
                        selecting={selecting}
                        selected={selectedNotes.includes(note.get('id'))}
                        editing={editingNote === note.get('id')}
                      />
                    </div>
                  )}
                </div>)}
              </div>
            </div>}
      </div>
    )
  }

  renderList = (unpinned, pinned) => {
    const { selecting, selectedNotes, editingNote } = this.props

    const hasUnpinned = unpinned && unpinned[0]
    const hasPinned = pinned && pinned[0]

    return (
      <div className={style.list}>
        {hasPinned &&
          <div className={style.pinnedNotesSection}>
            <div className='subtitle is-6'>
              <div className='heading'>Pinned</div>
            </div>
            {pinned.map((note, i) =>
              <div key={i} className={style.note}>
                <Note
                  note={note}
                  selecting={selecting}
                  selected={selectedNotes.includes(note.get('id'))}
                  editing={editingNote === note.get('id')}
                  pinned={true}
                />
              </div>)}
          </div>}
        {hasUnpinned &&
          <div className={style.otherNotesSection}>
            {hasPinned &&
              <div className='subtitle is-6'>
                <div className='heading'>Other</div>
              </div>}
            {unpinned.map((note, i) =>
              <div key={i} className={style.note}>
                <Note
                  note={note}
                  selecting={selecting}
                  selected={selectedNotes.includes(note.get('id'))}
                  editing={editingNote === note.get('id')}
                />
              </div>)}
          </div>}
      </div>
    )
  }

  render() {
    const {
      gridView,
      selecting,
      selectedNotes,
      searchQuery,
      pinnedNotes,
      notesInTrash
    } = this.props

    let { notesData } = this.props

    if (searchQuery) {
      notesData = this.applySearchFilter(notesData)
    }

    let unpinned = [],
        pinned = []

    notesData.forEach(note => {
      const id = note.get('id')

      if (notesInTrash.includes(id)) return

      if (pinnedNotes.includes(id)) {
        pinned.push(note)
      }  else {
        unpinned.push(note)
      }
    })

    if (gridView) {
      const divideByColumns = notes =>
        notes.reduce((acc, note, i) => {
          const columnNum = i % this.state.columns
          return {
            ...acc,
            [columnNum]: acc[columnNum] ? [ ...acc[columnNum], note ] : [ note ]
          }
        }, {})

      unpinned = divideByColumns(unpinned)
      pinned = divideByColumns(pinned)
    }

    return (
      <div className={style.notesFeed}>
        {gridView
          ? this.renderGrid(unpinned, pinned, selecting)
          : this.renderList(unpinned, pinned, selecting)}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  notesData: state.common.notesData,
  gridView: state.common.feedViewIsGrid,
  searchQuery: state.common.searchQuery,
  selecting: state.select.selecting,
  selectedNotes: state.select.selectedNotes,
  pinnedNotes: state.pin.notesById,
  editing: state.edit.editing,
  notesInTrash: state.trash.notesById
})

NotesFeed = connect(mapStateToProps)(NotesFeed)
NotesFeed = withPage(PAGE_HOME)(NotesFeed)

export { NotesFeed }
