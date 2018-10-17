import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { hideNotification, restoreNotesFromTrash } from '../../actions';
import { NOTIFICATION_LIFE_TIME } from '../../constants/settings';

import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_INFO,
  NOTIFICATION_WARNING,
  NOTIFICATION_DANGER,
} from '../../constants/types';

import { Notification } from '..';
import style from './NotificationsManager.module.scss';


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


let NotificationsManager = ({
  notifications,
  hideNotification,
}) => {
  const componentsByTypes = {
    [NOTIFICATION_SUCCESS]: NotificationSuccess,
    [NOTIFICATION_INFO]: NotificationInfo,
    [NOTIFICATION_WARNING]: NotificationWarning,
    [NOTIFICATION_DANGER]: NotificationDanger,
  };

  return (
    <div className={style.wrapper}>
      {notifications.map((ntf) => {
        const id = ntf.get('id');
        const type = ntf.get('type');
        const message = ntf.get('message');
        const action = ntf.get('action');

        const CompName = componentsByTypes[type];
        const onClose = () => hideNotification(id);

        return (
          <CompName
            key={id}
            id={id}
            message={message}
            onClose={onClose}
            action={action}
            expires={NOTIFICATION_LIFE_TIME}
          />
        );
      })}
    </div>
  );
};


/**
* prop types
*/
NotificationsManager.propTypes = {
  notifications: ImmutablePropTypes.list.isRequired,
  hideNotification: PropTypes.func.isRequired,
  restoreNotesFromTrash: PropTypes.func.isRequired,
};


/**
* connect to state
*/
const mapStateToProps = (state) => ({
  notifications: state.notifications.get('notifications'),
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
