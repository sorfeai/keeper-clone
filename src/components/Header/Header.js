import React from 'react'
import { connect } from 'react-redux'
import { IconButton } from '..'
import style from './Header.module.scss'
import { toggleFeedView } from '../../actions'


let Header = ({ gridView, toggleFeedView }) => (
  <div className={style.header}>
    <div className="container">
      <div className={style.inner}>
        <div className='level'>
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
              <div className={style.toolbarItem}>
                <IconButton
                  tooltip='Refresh'
                  icon='sync-alt'
                />
              </div>
              <div className={style.toolbarItem}>
                <IconButton
                  tooltip={`${gridView ? 'List view' : 'Grid view'}`}
                  icon={`${gridView ? 'list' : 'th-large'}`}
                  onClick={toggleFeedView}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)


const mapStateToProps = state => ({ gridView: state.feedViewIsGrid })

const mapDispatchToProps = { toggleFeedView }

Header = connect(mapStateToProps, mapDispatchToProps)(Header)

export { Header }
