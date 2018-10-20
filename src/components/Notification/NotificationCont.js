import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideNotification } from '../../actions';
import { AnimateMount } from '..';
import { NotificationView } from '.';
import style from './Notification.module.scss';


const SHOW_ANIMATION_TIME = 400;

let NotificationCont = class extends Component {
  state = {
    show: true,
  }

  componentDidMount () {
    const { id, expires, hideNotification } = this.props;

    this.animationTimeout = setTimeout(() => {
      this.setState({ show: false });
    }, expires);

    this.removeTimeout = setTimeout(() => {
      hideNotification(id);
    }, expires + SHOW_ANIMATION_TIME);
  }

  handleClose = () => {
    const { id, hideNotification } = this.props;

    clearTimeout(this.animationTimeout);
    clearTimeout(this.removeTimeout);

    this.setState({ show: false });

    setTimeout(() => {
      hideNotification(id);
    }, SHOW_ANIMATION_TIME);
  }

  handleCancel = () => {
    const { onCancel } = this.props;

    clearTimeout(this.animationTimeout);
    clearTimeout(this.removeTimeout);
    onCancel();
  }

  render () {
    const { onCancel: onCancelProp, ...restProps } = this.props;
    const { show } = this.state;
    const onCancel = onCancelProp ? this.handleCancel : undefined;

    return (
      <AnimateMount
        isMounted={show}
        classNames={{
          basic: style.ntfWrapper,
          mount: style.isShown,
          unmount: style.isHidden,
        }}
      >
        <NotificationView
          onClose={this.handleClose}
          onCancel={onCancel}
          {...restProps}
        />
      </AnimateMount>
    );
  }
};


const mapDispatchToProps = {
  hideNotification,
};

NotificationCont = connect(() => ({}), mapDispatchToProps)(NotificationCont);


export { NotificationCont };
