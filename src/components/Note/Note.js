import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Tooltip, IconButton } from '..'
import style from './Note.module.scss'

import {
  selectNote,
  deselectNote,
  pinNotes,
  unpinNotes
} from '../../actions'


let Note = class extends Component {
  render() {
    const {
      note,
      selecting,
      selected,
      pinned,
      selectNote,
      deselectNote,
      pinNotes,
      unpinNotes
    } = this.props

    const id = note.get('id')
    const title = note.get('title')
    const content = note.get('content')

    const className = classNames({
      [`${[style.note]} box`]: true,
      [style.isSelected]: selected,
      [style.isPinned]: pinned
    })

    const onCheckClick = id => selected ? deselectNote(id) : selectNote(id)

    const onPinClick = id => pinned ? unpinNotes(id) : pinNotes(id)

    return (
      <div
        onClick={selecting ? (() => onCheckClick(id)) : undefined}
        className={className}
      >
        <div className={style.inner}>
          <div className={style.pinWrapper}>
            <IconButton
              onClick={() => onPinClick(id)}
              icon='thumbtack'
              alt={pinned}
              tooltip={pinned ? 'Unpin note' : 'Pin note'}
            />
          </div>
          <div className={style.menuWrapper}>
            <div className={style.checkWrapper}>
              <Tooltip text={selected ? 'Deselect note' : 'Select note'}>
                <button
                  onClick={!selecting ? (() => onCheckClick(id)) : undefined}
                  className={style.check}
                >
                  <i className='fas fa-check'></i>
                </button>
              </Tooltip>
            </div>
          </div>
          <div className={style.content}>
            <strong>{title}</strong>
            <p>{content}</p>
          </div>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = {
  selectNote,
  deselectNote,
  pinNotes,
  unpinNotes
}

Note = connect(() => ({}), mapDispatchToProps)(Note)

export { Note }
