import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import style from './NotesFeed.module.scss'
import { Note } from '..'


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

  renderGrid = (notes, pinnedNotes) => {
    const { selecting, selectedNotes } = this.props

    const hasPinned = pinnedNotes && pinnedNotes[0]
    const hasOther = notes && notes[0]

    return (
      <div>
        {hasPinned &&
          <div className={style.pinnedNotesSection}>
            <div className='subtitle is-6'>
              <div className='heading'>Pinned</div>
            </div>
            <div className={`${style.notes} columns`}>
              {Object.keys(pinnedNotes).map((key, i) =>
                <div key={i} className='column'>
                  {pinnedNotes[key].map((note, i) => (
                    <div key={i} className={`${style.note}`}>
                      <Note
                        note={note}
                        selecting={selecting}
                        selected={selectedNotes.includes(note.get('id'))}
                        pinned={true}
                      />
                    </div>))}
                </div>)}
            </div>
          </div>}
        {hasOther &&
          <div className={style.otherNotesSection}>
            {hasPinned &&
              <div className='subtitle is-6'>
                <div className='heading'>Other</div>
              </div>}
            <div className={`${style.notes} columns`}>
              {Object.keys(notes).map((key, i) =>
                <div key={i} className='column'>
                  {notes[key].map((note, i) =>
                    <div key={i} className={style.note}>
                      <Note
                        note={note}
                        selecting={selecting}
                        selected={selectedNotes.includes(note.get('id'))}
                      />
                    </div>
                  )}
                </div>)}
              </div>
            </div>}
      </div>
    )
  }

  renderList = (notes, pinnedNotes) => {
    const { selecting, selectedNotes } = this.props

    const hasPinned = pinnedNotes && pinnedNotes[0]
    const hasOther = notes && notes[0]

    return (
      <div className={style.list}>
        {hasPinned &&
          <div className={style.pinnedNotesSection}>
            <div className='subtitle is-6'>
              <div className='heading'>Pinned</div>
            </div>
            {pinnedNotes.map((note, i) =>
              <div key={i} className={style.note}>
                <Note
                  note={note}
                  selecting={selecting}
                  selected={selectedNotes.includes(note.get('id'))}
                  pinned={true}
                />
              </div>)}
          </div>}
        <div className={style.otherNotesSection}>
          {hasPinned &&
            <div className='subtitle is-6'>
              <div className='heading'>Other</div>
            </div>}
          {notes.map((note, i) =>
            <div key={i} className={style.note}>
              <Note
                note={note}
                selecting={selecting}
                selected={selectedNotes.includes(note.get('id'))}
              />
            </div>)}
        </div>
      </div>
    )
  }

  render() {
    const { notesData, gridView, selecting, selectedNotes } = this.props

    let notes = [],
        pinnedNotes = []

    notesData.forEach(note => {
      if (note.get('deleting')) return

      if (note.get('pinned')) {
        pinnedNotes.push(note)
      }  else {
        notes.push(note)
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

      notes = divideByColumns(notes)
      pinnedNotes = divideByColumns(pinnedNotes)
    }

    return (
      <div className={style.notesFeed}>
        {gridView
          ? this.renderGrid(notes, pinnedNotes, selecting)
          : this.renderList(notes, pinnedNotes, selecting)}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  notesData: state.notesData,
  gridView: state.feedViewIsGrid,
  selecting: state.notesSelecting,
  selectedNotes: state.selectedNotes
})

NotesFeed = connect(mapStateToProps)(NotesFeed)

export { NotesFeed }
