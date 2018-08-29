import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { IconButton, Tooltip } from '..'
import style from './Header.module.scss'
import { toggleFeedView, cancelSelecting, deleteSelectedNotes } from '../../actions'


let Header = ({
  gridView,
  toggleFeedView,
  notesSelecting,
  selectedNotes,
  cancelSelecting,
  deleteSelectedNotes
}) => {
  let userAvatar
  try {
    userAvatar = require('../../assets/images/user-avatar.jpg')
  } catch (e) {
    userAvatar = null
  }

  const className = classNames({
    [style.header]: true,
    [style.isSelecting]: notesSelecting
  })

  return (
    <div className={className}>
      <div className={style.selecting}>
        <div className='container'>
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
                  {`Выбрано заметок: ${selectedNotes.size}`}
                </div>
              </div>
            </div>
            <div className='level-right'>
              <div className='level-item'>
                <IconButton
                  onClick={deleteSelectedNotes}
                  tooltip='Delete notes'
                  icon='trash'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.toolbar}>
        <div className="container">
          <div className={`${style.inner} level`}>
            <div className='level-left'>
              <div className='level-item'>
                <a href="/">
                  <div className='subtitle is-4'>
                    <strong>Evernote</strong> Clone
                  </div>
                </a>
              </div>
            </div>
            <div className='level-right'>
              <div className='level-item'>
                <div className={`${style.toolbarGroup} level`}>
                  <div className={`${style.toolbarItem} level-item`}>
                    <IconButton
                      tooltip='Refresh'
                      icon='sync-alt'
                    />
                  </div>
                  <div className={`${style.toolbarItem} level-item`}>
                    <IconButton
                      tooltip={`${gridView ? 'List view' : 'Grid view'}`}
                      icon={`${gridView ? 'list' : 'th-large'}`}
                      onClick={toggleFeedView}
                    />
                  </div>
                </div>
              </div>
              <div className='level-item'>
                <div className={`${style.toolbarGroup} ${style.userInfo} level`}>
                  <div className={`${style.toolbarItem} level-item`}>
                    <div className={style.toolbarItem}>
                      <Tooltip text={'Aisorfe'}>
                        <button
                          className={style.userAvatar}
                          style={{ backgroundImage: `url(${userAvatar})` }}
                        />
                      </Tooltip>
                    </div>
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
  deleteSelectedNotes
}

Header = connect(mapStateToProps, mapDispatchToProps)(Header)

export { Header }
