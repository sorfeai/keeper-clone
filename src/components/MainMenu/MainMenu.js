import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { connect } from 'react-redux'

import style from './MainMenu.module.scss'
import { IconButton } from '..'
import { showTagsModal } from '../../actions'


const itemsData = [
  [
    {
      title: 'Notes',
      icon: 'sticky-note',
      to: '/home'
    },
    {
      title: 'Reminders',
      icon: 'bell'
    }
  ],
  [
    {
      title: 'New tag',
      icon: 'plus'
    }
  ],
  [
    {
      title: 'Archive',
      icon: 'archive'
    },
    {
      title: 'Trash',
      icon: 'trash',
      to: '/trash'
    }
  ],
  [
    {
      title: 'Settings',
      icon: 'sliders-h'
    },
    {
      title: 'Leave feedback',
      icon: 'comment-alt'
    },
    {
      title: 'Help',
      icon: 'question'
    },
    {
      title: 'Download app',
      icon: 'mobile'
    },
    {
      title: 'Hotkeys',
      icon: 'keyboard'
    }
  ]
]


let MainMenu = ({ isActive, notesInTrashCount, showTagsModal }) => {
  const className = classNames({
    [style.wrapper]: true,
    [style.isActive]: isActive
  })

  return (
    <div className={className}>
      <div className={style.menu}>
        {itemsData.map((section, i) =>
          <div key={i} className={style.menuSection}>
            {section.map(({ title, icon, to }, i) =>
              <NavLink
                key={i}
                to={to || '#'}
                onClick={title === 'New tag' ? showTagsModal : undefined}
                className={style.menuItem}
              >
                <span className={style.iconWrapper}>
                  <i className={`fas fa-${icon}`} />
                </span>
                {title + (to === '/trash' ? ` (${notesInTrashCount})` : '')}
              </NavLink>)}
          </div>)}
      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  isActive: state.common.mainMenuActive,
  notesInTrashCount: state.trash.notesById.size
})

const mapDispatchToProps = { showTagsModal }

MainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenu)

export { MainMenu }
