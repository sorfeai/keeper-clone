import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { NOTIFICATION_LIFE_TIME } from '../../constants/settings';
import { getNotificationsById } from '../../selectors';
import { Notification } from '..';
import style from './NotificationsManager.module.scss';

import {
  hideNotification,
  restoreNotesFromTrash,
} from '../../actions';

import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_INFO,
  NOTIFICATION_WARNING,
  NOTIFICATION_ERROR,
} from '../../constants/types';


const NotificationSuccess = (props) => (
  <Notification
    color="sucess"
    {...props}
  />
);

const NotificationInfo = (props) => (
  <Notification
    color="primary"
    {...props}
  />
);

const NotificationWarning = (props) => (
  <Notification
    color="danger"
    {...props}
  />
);

const NotificationDanger = (props) => (
  <Notification
    color="warning"
    {...props}
  />
);


let NotificationsManager = ({ notifications }) => {
  const componentsByTypes = {
    [NOTIFICATION_SUCCESS]: NotificationSuccess,
    [NOTIFICATION_INFO]: NotificationInfo,
    [NOTIFICATION_WARNING]: NotificationWarning,
    [NOTIFICATION_ERROR]: NotificationDanger,
  };

  return (
    <div className={style.wrapper}>
      {notifications.map((ntf) => {
        const id = ntf.get('id');
        const type = ntf.get('type');
        const message = ntf.get('message');
        const action = ntf.get('action');

        const NotificationType = componentsByTypes[type];

        return (
          <div key={id} className={style.ntfWrapper}>
            <NotificationType
              id={id}
              message={message}
              action={action}
              expires={NOTIFICATION_LIFE_TIME}
            />
          </div>
        );
      })}
    </div>
  );
};


NotificationsManager.propTypes = {
  notifications: ImmutablePropTypes.list.isRequired,
  hideNotification: PropTypes.func.isRequired,
  restoreNotesFromTrash: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  notifications: getNotificationsById(state).toList(),
});

const mapDispatchToProps = {
  hideNotification,
  restoreNotesFromTrash,
};

NotificationsManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsManager);


export { NotificationsManager };
