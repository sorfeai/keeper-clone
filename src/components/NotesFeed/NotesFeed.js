import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import style from './NotesFeed.module.scss'
import { Note } from '..'
import { cancelSelecting, selectNote, deselectNote } from '../../actions'


let NotesFeed = class extends Component {
  state = {
    listView: false,
    columns: 4
  }

  static propTypes = {
    gridView: PropTypes.bool.isRequired
  }

  static defaultProps = {
    gridView: true
  }

  render() {
    const {
      notesData,
      gridView,
      selecting,
      selectedNotes,
      selectNote,
      deselectNote
    } = this.props

    let notes

    if (gridView) {
      notes = notesData.reduce((acc, note, i) => {
        const columnNum = i % this.state.columns
        return {
          ...acc,
          [columnNum]: acc[columnNum] ? [ ...acc[columnNum], note ] : [ note ]
        }
      }, {})
    } else {
      notes = notesData
    }

    return (
      <div className={style.notesFeed}>
        {gridView ?
          <div className="columns">
            {Object.keys(notes).map((key, i) => (
              <div key={i} className="column">
                {notes[key].map((note, i) => (
                  <div key={i} className={style.note}>
                    <Note
                      selecting={selecting}
                      selected={selectedNotes.includes(note.id)}
                      onSelect={selectNote}
                      onDeselect={deselectNote}
                      {...note}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div> :
          <div className={style.list}>
            {notes.map((note, i) => (
              <div key={i} className={style.note}>
                <Note
                  selecting={selecting}
                  selected={selectedNotes.includes(note.id)}
                  onSelect={this.onNoteSelect}
                  onDeselect={this.onNoteDeselect}
                  {...note}
                />
              </div>
            ))}
          </div>}
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

const mapDispatchToProps = {
  selectNote,
  deselectNote
}

NotesFeed = connect(mapStateToProps, mapDispatchToProps)(NotesFeed)

export { NotesFeed }
