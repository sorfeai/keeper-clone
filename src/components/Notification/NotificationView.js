import React from 'react';
import PropTypes from 'prop-types';
import style from './Notification.module.scss';


const NotificationView = ({
  message,
  onClose,
  action,
  color,
}) => (
  <div className={`notification is-${color}`}>
    <button
      type="button"
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
            type="button"
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


NotificationView.propTypes = {
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

NotificationView.defaultProps = {
  color: 'primary',
};


export { NotificationView };
