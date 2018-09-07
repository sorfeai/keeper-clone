import React from 'react'
import { connect } from 'react-redux'
import style from './Notifications.module.scss'
import { NotificationTemplate } from './NotificationTemplate'
import { hideNotification, restoreNotesFromTrash } from '../../actions'
import { NOTIFICATION_LIFE_TIME } from '../../constants/settings'

import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_INFO,
  NOTIFICATION_WARNING,
  NOTIFICATION_DANGER
} from '../../constants/types'


const NotificationSuccess = props =>
  <NotificationTemplate
    {...props}
    style='sucess'
  />

const NotificationInfo = props =>
  <NotificationTemplate
    {...props}
    style='primary'
  />

const NotificationWarning = props =>
  <NotificationTemplate
    {...props}
    style='danger'
  />

const NotificationDanger = props =>
  <NotificationTemplate
    {...props}
    style='warning'
  />


let Notifications = ({
  notifications,
  hideNotification,
  restoreNotesFromTrash
}) => {
  const componentsByTypes = {
    [NOTIFICATION_SUCCESS]: NotificationSuccess,
    [NOTIFICATION_INFO]: NotificationInfo,
    [NOTIFICATION_WARNING]: NotificationWarning,
    [NOTIFICATION_DANGER]: NotificationDanger
  }

  return (
    <div className={style.wrapper}>
      {notifications.map((ntf, i) => {
        const id = ntf.get('id')
        const type = ntf.get('type')
        const message = ntf.get('message')
        const action = ntf.get('action')

        const CompName = componentsByTypes[type]

        return (
          <CompName
            key={i}
            id={id}
            message={message}
            onClose={() => hideNotification(id)}
            action={action}
            expires={NOTIFICATION_LIFE_TIME}
          />
        )
      })}
    </div>
  )
}


const mapStateToProps = state => ({
  notifications: state.notifications.notifications
})

const mapDispatchToProps = { hideNotification, restoreNotesFromTrash }

Notifications = connect(mapStateToProps, mapDispatchToProps)(Notifications)

export { Notifications }
