import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Tooltip, IconButton } from '..'
import style from './Note.module.scss'

import {
  editNote,
  updateNote,
  endEditingNote,
  selectNote,
  deselectNote,
  pinNotes,
  unpinNotes
} from '../../actions'


let Note = class extends Component {
  state = {
    title: '',
    content: ''
  }

  componentWillUpdate(nextProps) {
    const { note, editingNote } = this.props
    const id = note.get('id')
    const nextEditing = nextProps.editingNote

    const isEditing = id === editingNote
    const willEditing = id === nextEditing

    if (isEditing !== willEditing) {
      if (isEditing) {
        document.removeEventListener('click', this.onExternalClick)
      } else {
        document.addEventListener('click', this.onExternalClick)
      }
    }
  }

  isEditing = () => {
    return this.props.note.get('id') === this.props.editingNote
  }

  isEdited = () => {
    return (this.state.title !== '') || (this.state.content !== '')
  }

  onExternalClick = () => {
    this.onSubmit(this.props.note.get('id'))
  }

  onNoteClick = (e, id) => {
    if (this.isEditing()) {
      e.nativeEvent.stopImmediatePropagation()
      return
    }

    this.props.selecting
      ? this.onSelect(e, id)
      : this.onEdit(id)
  }

  onPin = (e, id) => {
    e.stopPropagation()
    if (this.isEditing()) {
      e.nativeEvent.stopImmediatePropagation()
    }

    const { note, pinnedNotes, pinNotes, unpinNotes } = this.props
    const isPinned = pinnedNotes.includes(note.get('id'))
    isPinned ? unpinNotes([id]) : pinNotes([id])
  }

  onSelect = (e, id) => {
    e.stopPropagation()

    this.props.selected
      ? this.props.deselectNote(id)
      : this.props.selectNote(id)
  }

  onEdit = id => {
    const { note, editing, editNote } = this.props

    if (editing) return
    editNote(note.get('id'))

    setTimeout(() => {
      if (this.editInput) {
        this.editInput.focus()
      }
    })
  }

  onEditInputChange = e => {
    const { name, value } = e.target

    if (name === 'content') {
      e.target.style.height = `${e.target.scrollHeight}px`;
    }

    this.setState(prev => ({
      [name]: value
    }))
  }

  onSubmit = id => {
    const { updateNote, endEditingNote, note } = this.props
    const { title, content } = this.state

    if (title || content) {
      const changes = {}
      if (title) changes.title = title
      if (content) changes.content = content

      updateNote(note.get('id'), changes)
    }

    endEditingNote()
  }

  render() {
    const {
      note,
      trash,
      selecting,
      selected,
      selectNote,
      deselectNote,
      pinNotes,
      unpinNotes,
      editNote,
      editingNote,
      pinnedNotes
    } = this.props

    const id = note.get('id')
    const title = note.get('title')
    const content = note.get('content')
    const pinned = pinnedNotes.includes(id)
    const editing = this.isEditing()

    const wrapperClass = classNames({
      [style.wrapper]: true,
      [style.isEditing]: editing
    })

    const noteClass = classNames({
      [`${[style.note]} box`]: true,
      [style.isSelected]: selected,
      [style.isPinned]: pinned
    })

    return (
      <div className={wrapperClass}>
        <div
          onClick={e => this.onNoteClick(e, id)}
          className={noteClass}
        >
            <div className={style.inner}>
            {!trash &&
              <div className={style.pinWrapper}>
                <IconButton
                  onClick={e => this.onPin(e, id)}
                  icon='thumbtack'
                  alt={pinned}
                  tooltip={pinned ? 'Unpin note' : 'Pin note'}
                />
              </div>}
            {!editing &&
              <div className={style.checkWrapper}>
                <Tooltip text={selected ? 'Deselect note' : 'Select note'}>
                  <button
                    onClick={!editing ? (e => this.onSelect(e, id)) : undefined}
                    className={style.check}
                  >
                    <i className='fas fa-check'></i>
                  </button>
                </Tooltip>
              </div>}
            <div className={style.content}>
                <div className={style.titleWrapper}>
                  {!editing
                    ? <strong>{title}</strong>
                    : <div className={style.editTitle}>
                        <input
                          type='text'
                          name='title'
                          ref={this.onEditInputRef}
                          value={this.state.title || title}
                          onChange={this.onEditInputChange}
                        />
                      </div>}
                </div>
                {!editing
                  ? <p>{content}</p>
                  : <div className={style.editContent}>
                      <p>
                        <textarea
                          name='content'
                          ref={node => this.editInput = node}
                          defaultValue={this.state.content || content}
                          onChange={this.onEditInputChange}
                        />
                      </p>
                    </div>}
            </div>
            <div className={style.toolbar}>
              <div className='level'>
                <div className='level-left'>
                  <div className='level-item'>

                  </div>
                </div>
                {editing &&
                  <div className='level-right'>
                    <div className='level-item'>
                      <button
                        className='button is-light'
                        onClick={this.onSubmit}
                      >
                        {this.isEdited() ? 'Save changes' : 'Cancel'}
                      </button>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  pinnedNotes: state.pin.notesById,
  editingNote: state.edit.id
})

const mapDispatchToProps = {
  selectNote,
  deselectNote,
  pinNotes,
  unpinNotes,
  editNote,
  updateNote,
  endEditingNote
}

Note = connect(mapStateToProps, mapDispatchToProps)(Note)

export { Note }
