import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { IconButton, Tooltip, RefreshNotes, UserMenu } from '..'
import style from './Header.module.scss'

import {
  toggleFeedView,
  cancelSelecting,
  deleteSelectedNotes,
  pinNotes
} from '../../actions'


let Header = ({
  gridView,
  toggleFeedView,
  notesSelecting,
  selectedNotes,
  cancelSelecting,
  deleteSelectedNotes,
  pinNotes
}) => {
  const className = classNames({
    [style.header]: true,
    [style.isSelecting]: notesSelecting
  })

  const selectedNotesCount = selectedNotes.size

  return (
    <div className={className}>
      <div className={style.selecting}>
        <div className={style.container}>
          <div className={`${style.inner} level`}>
            <div className='level-left'>
              <div className={`${style.cancelSelectingBtn} level-item`}>
                <IconButton
                  onClick={cancelSelecting}
                  tooltip='Cancel selection'
                  icon='arrow-left'
                />
              </div>
              <div className='level-item'>
                <div className='subtitle is-5'>
                  <FormattedMessage
                    id='selectedNotesCount'
                    defaultMessage={`You selected
                      {selectedNotesCount, number}
                      {selectedNotesCount, plural, one {note} other {notes}}`}
                    values={{ selectedNotesCount }}
                  />
                </div>
              </div>
            </div>
            <div className='level-right'>
              <div className='level-item'>
                <div className={`${style.btnGroup} level`}>
                  <div className={`${style.btnGroupItem} level-item`}>
                    <IconButton
                      onClick={() => {
                        pinNotes(selectedNotes)
                        cancelSelecting()
                      }}
                      tooltip='Pin selected'
                      icon='thumbtack'
                    />
                  </div>
                  <div className={`${style.btnGroupItem} level-item`}>
                    <IconButton
                      onClick={deleteSelectedNotes}
                      tooltip='Delete selected'
                      icon='trash'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.toolbar}>
        <div className={style.container}>
          <div className={`${style.inner} level`}>
            <div className='level-left'>
              <div className='level-item'>
                <a href="/">
                  <div className={`${style.logo} subtitle is-4`}>
                    <strong>Keeper</strong>
                  </div>
                </a>
              </div>
            </div>
            <div className='level-right'>
              <div className='level-item'>
                <div className={`${style.btnGroup} level`}>
                  <div className={`${style.btnGroupItem} level-item`}>
                    <RefreshNotes />
                  </div>
                  <div className={`${style.btnGroupItem} level-item`}>
                    <IconButton
                      tooltip={`${gridView ? 'List view' : 'Grid view'}`}
                      icon={`${gridView ? 'list' : 'th-large'}`}
                      onClick={toggleFeedView}
                    />
                  </div>
                </div>
              </div>
              <div className='level-item'>
                <div className={`${style.btnGroup} ${style.userInfo} level`}>
                  <div className={`${style.btnGroupItem} level-item`}>
                    <UserMenu />
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


const mapStateToProps = state => ({
  gridView: state.feedViewIsGrid,
  notesSelecting: state.notesSelecting,
  selectedNotes: state.selectedNotes
})

const mapDispatchToProps = {
  toggleFeedView,
  cancelSelecting,
  deleteSelectedNotes,
  pinNotes
}

Header = connect(mapStateToProps, mapDispatchToProps)(Header)

export { Header }
