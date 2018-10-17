import React from 'react';
import PropTypes from 'prop-types';
import { NotificationHOC } from '..';
import style from './Notifications.module.scss';


let Notification = ({
  message,
  onClose,
  action,
  color,
}) => (
  <div className={`notification is-${color}`}>
    <button
      type="submit"
      onClick={onClose}
      className="delete"
    />
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          {message}
        </div>
      </div>
      {action && (
        <div className={style.cancel}>
          <button
            type="submit"
            onClick={action}
            className="button is-primary is-inverted is-outlined"
          >
            {'Cancel'}
          </button>
        </div>
      )}
    </div>
  </div>
);


/**
* prop types
*/
Notification.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.func,
  onClose: PropTypes.func,
  color: PropTypes.oneOf([
    'primary',
    'link',
    'info',
    'success',
    'danger',
  ]),
};

Notification.defaultProps = {
  color: 'primary',
};


Notification = NotificationHOC(Notification);

export { Notification };
