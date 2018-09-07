import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { connect } from 'react-redux'
import style from './Header.module.scss'

import {
  IconButton,
  Tooltip,
  RefreshNotes,
  UserMenu,
  Search
} from '..'

import {
  toggleFeedView,
  clearSelection,
  moveNotesToTrash,
  pinNotes,
  toggleMainMenu
} from '../../actions'


let Header = class extends Component {
  renderSelecting() {
    const {
      clearSelection,
      selectedNotes,
      pinNotes,
      moveNotesToTrash
    } = this.props

    const selectedNotesCount = selectedNotes.size

    return (
      <div className={style.selecting}>
        <div className={style.container}>
          <div className={`${style.inner} level`}>
            <div className='level-left'>
              <div className={`${style.clearSelectionBtn} level-item`}>
                <IconButton
                  onClick={clearSelection}
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
                        clearSelection()
                      }}
                      tooltip='Pin selected'
                      icon='thumbtack'
                    />
                  </div>
                  <div className={`${style.btnGroupItem} level-item`}>
                    <IconButton
                      onClick={() => {
                        moveNotesToTrash(selectedNotes)
                        clearSelection()
                      }}
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
    )
  }

  render() {
    const {
      gridView,
      toggleFeedView,
      selecting,
      toggleMainMenu,
      mainMenuActive
    } = this.props

    const className = classNames({
      [style.header]: true,
      [style.isSelecting]: selecting
    })

    return (
      <div className={className}>
        {this.renderSelecting()}
        <div className={style.toolbar}>
          <div className={style.container}>
            <div className={`${style.inner} level`}>
              <div className={`${style.contentLeft} level-left`}>
                <div className='level-item'>
                  <div className={style.toggleMenuIcon}>
                    <IconButton
                      icon={mainMenuActive ? 'times' : 'bars'}
                      tooltip={mainMenuActive ? 'Hide menu' : 'Main menu'}
                      onClick={toggleMainMenu}
                    />
                  </div>
                </div>
                <div className={`${style.logoWrapper} level-item`}>
                  <a href="/">
                    <div className={`${style.logo} subtitle is-4`}>
                      <strong>Keeper</strong>
                    </div>
                  </a>
                </div>
                <div className={`${style.searchWrapper} level-item`}>
                  <Search />
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
}


const mapStateToProps = state => ({
  gridView: state.common.feedViewIsGrid,
  mainMenuActive: state.common.mainMenuActive,
  selecting: state.select.selecting,
  selectedNotes: state.select.selectedNotes
})

const mapDispatchToProps = {
  toggleFeedView,
  clearSelection,
  moveNotesToTrash,
  pinNotes,
  toggleMainMenu
}

Header = connect(mapStateToProps, mapDispatchToProps)(Header)

export { Header }
