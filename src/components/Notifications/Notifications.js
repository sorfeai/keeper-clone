import React from 'react'
import { connect } from 'react-redux'
import style from './Notifications.module.scss'
import { NotificationTemplate } from './NotificationTemplate'
import { removeNotification, cancelDeletion } from '../../actions'
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
  removeNotification,
  cancelDeletion
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
        let onCancel
        if (ntf.get('deletionId')) {
          onCancel = () => {
            cancelDeletion(ntf.get('deletionId'))
            removeNotification(ntf.get('id'))
          }
        }

        const onClose = () => removeNotification(ntf.get('id'))

        return (
          React.createElement(
            componentsByTypes[ntf.get('type')],
            {
              key: i,
              id: ntf.get('id'),
              message: ntf.get('message'),
              onClose,
              onCancel,
              expires: NOTIFICATION_LIFE_TIME
            }
          )
        )
      })}
    </div>
  )
}


const mapStateToProps = state => ({
  notifications: state.notifications
})

const mapDispatchToProps = { removeNotification, cancelDeletion }

Notifications = connect(mapStateToProps, mapDispatchToProps)(Notifications)

export { Notifications }
