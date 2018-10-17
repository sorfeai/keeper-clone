import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideNotification } from '../../actions';


const NotificationHOC = (Comp) => {
  const Notification = class extends Component {
    componentDidMount () {
      const { id, expires, hideNotification } = this.props;

      this.removeTimeout = setTimeout(() => {
        hideNotification(id);
      }, expires);
    }

    handleClose = () => {
      const { onClose } = this.props;

      clearTimeout(this.removeTimeout);
      onClose();
    }

    handleCancel = () => {
      const { onCancel } = this.props;

      clearTimeout(this.removeTimeout);
      onCancel();
    }

    render () {
      const { onCancel } = this.props;

      return (
        <Comp
          {...this.props}
          onClose={this.handleClose}
          onCancel={onCancel ? this.handleCancel : undefined}
        />
      );
    }
  };

  return connect(() => ({}), { hideNotification })(Notification);
};


export { NotificationHOC };
