import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const AnimateMount = class extends Component {
  state = {
    show: false,
    animate: null,
  }

  componentDidUpdate ({ isMounted: prevIsMounted }) {
    const { isMounted, classNames: { unmount } } = this.props;

    if (isMounted !== prevIsMounted) {
      if (isMounted) {
        this.handleMount();
      } else if (unmount) {
        this.handleUnmount();
      }
    }
  }

  handleMount () {
    this.setState((prev) => ({
      ...prev,
      show: true,
    }));

    setTimeout(() => {
      this.setState((prev) => ({
        ...prev,
        animate: 'mount',
      }));
    });
  }

  handleUnmount () {
    this.setState((prev) => ({
      ...prev,
      animate: 'unmount',
    }));
  }

  handleTransitionEnd = () => {
    this.setState((prev) => ({
      ...prev,
      show: false,
    }));
  }

  render () {
    const {
      children,
      classNames: {
        basic,
        mount,
        unmount,
      },
    } = this.props;

    const { show, animate } = this.state;

    if (!show) return null;

    const isMount = animate === 'mount';
    const isUnmount = animate === 'unmount';
    const onTransitionEnd = isUnmount ? this.handleTransitionEnd : undefined;

    const cls = classNames({
      [basic]: true,
      [mount]: isMount,
      [unmount]: isUnmount,
    });

    return (
      <div
        className={cls}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </div>
    );
  }
};


AnimateMount.propTypes = {
  children: PropTypes.element.isRequired,
  isMounted: PropTypes.bool.isRequired,
  classNames: PropTypes.shape({
    basic: PropTypes.string.isRequired,
    mount: PropTypes.string.isRequired,
    unmount: PropTypes.string,
  }).isRequired,
};


export { AnimateMount };
