import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { OuterClick, Tooltip, IconButton } from '..'
import style from './Note.module.scss'

import {
  editNote,
  updateNote,
  endEditingNote,
  selectNote,
  deselectNote,
  pinNotes,
  unpinNotes,
  moveNotesToTrash,
  restoreNotesFromTrash,
  deleteNotes
} from '../../actions'


let Note = class extends Component {
  state = {
    title: '',
    content: '',
    otherMenuActive: false
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

  addTag = () => {
    // comming soon
  }

  moveToTrash = () => {
    const { note, moveNotesToTrash } = this.props

    moveNotesToTrash([note.get('id')])
    this.hideOtherMenu()
  }

  restore = () => {
    const { note, restoreNotesFromTrash } = this.props

    restoreNotesFromTrash([note.get('id')])
    this.hideOtherMenu()
  }

  deleteForever = () => {
    const { note, deleteNotes } = this.props

    deleteNotes([note.get('id')])
    this.hideOtherMenu()
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

  showOtherMenu = () => {
    this.setState(prev => ({
      ...prev,
      otherMenuActive: true
    }))
  }

  hideOtherMenu = () => {
    this.setState(prev => ({
      ...prev,
      otherMenuActive: false
    }))
  }

  renderOtherMenu() {
    if (!this.state.otherMenuActive) return

    return (
      <OuterClick onClick={this.hideOtherMenu}>
        <div className={`${style.otherMenu} box`}>
          {!this.props.trash
            ? <Fragment>
                <div
                  className={style.otherMenuItem}
                  onClick={this.addTag}
                >
                  Add tag
                </div>
                <div
                  className={style.otherMenuItem}
                  onClick={this.moveToTrash}
                >
                  Move to trash
                </div>
              </Fragment>
            : <Fragment>
                <div
                  className={style.otherMenuItem}
                  onClick={this.restore}
                >
                  Restore
                </div>
                <div
                  className={style.otherMenuItem}
                  onClick={this.deleteForever}
                >
                  Delete forever
                </div>
              </Fragment>}
        </div>
      </OuterClick>
    )
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
        <div className={style.otherMenuWrapper}>
          {this.renderOtherMenu()}
        </div>
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
            <div
              className={style.toolbar}
              onClick={e => e.stopPropagation()}
            >
              <div className='level'>
                <div className='level-left'>
                  <div className='level-item'>

                  </div>
                </div>
                <div className='level-right'>
                  <div className='level-item'>
                    <div className={style.otherButtonWrapper}>
                      {editing
                        ? <button
                            className='button is-light'
                            onClick={this.onSubmit}
                          >
                            {this.isEdited() ? 'Save changes' : 'Cancel'}
                          </button>
                        : <IconButton
                            onClick={this.showOtherMenu}
                            icon='ellipsis-v'
                            tooltip='Other actions'
                          />}
                    </div>
                  </div>
                </div>
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
  endEditingNote,
  moveNotesToTrash,
  restoreNotesFromTrash,
  deleteNotes
}

Note = connect(mapStateToProps, mapDispatchToProps)(Note)

export { Note }
