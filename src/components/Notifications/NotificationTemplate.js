import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeNotification } from '../../actions'
import style from './Notifications.module.scss'
import { CSSTransition } from 'react-transition-group'
import { NotificationHOC } from './NotificationHOC'


let NotificationTemplate = ({ message, onClose, onCancel, style }) =>
  <CSSTransition
    in={true}
    appear={true}
    timeout={500}
    classNames={'asd'}

    // classNames={{
    //   appear: style.fadeEnter,
    //   appearActive: style.fadeEnterActive,
    //   enter: style.fadeEnter,
    //   enterDone: style.fadeEnterActive,
    //   exit: style.fadeExit,
    //   exitDone: style.fadeExitActive
    // }}
  >
    <div className={`notification is-${style}`}>
      <button
        onClick={onClose}
        className='delete'
      />
      <div className='level'>
        <div className='level-left'>
          <div className='level-item'>
            {message}
          </div>
        </div>
        {onCancel &&
          <div className={style.cancel}>
            <button
              onClick={onCancel}
              className='button is-primary is-inverted is-outlined'
            >
              Cancel
            </button>
          </div>}
      </div>
    </div>
  </CSSTransition>


NotificationTemplate = NotificationHOC(NotificationTemplate)

export { NotificationTemplate }
