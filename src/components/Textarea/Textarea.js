import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autosize from 'autosize';
import style from './Textarea.module.scss';


const Textarea = class extends Component {
  componentDidMount () {
    const { isAutosized } = this.props;

    if (isAutosized) {
      setTimeout(() => {
        autosize(this.node);
      });
    }
  }

  handleRef = (node) => {
    if (!this.node) {
      this.node = node;
    }
  }

  render () {
    const {
      meta,
      input,
      onChangeCustom,
      appearance,
      isFullwidth,
      isAutosized,
    } = this.props;

    const cls = classNames({
      [style.textarea]: true,
      [style.isFullwidth]: isFullwidth,
      [style.isSeamless]: appearance === 'seamless',
      [style.isAutosized]: isAutosized,
    });

    const onChange = onChangeCustom
      ? (ev) => {
        onChangeCustom(ev);
        input.onChange(ev);
      } : input.onChange;

    return (
      <textarea
        ref={this.handleRef}
        className={cls}
        {...input}
        onChange={onChange}
      />
    );
  }
};


Textarea.propTypes = {
  isFullwidth: PropTypes.bool,
  isSeamless: PropTypes.bool,
  isAutosized: PropTypes.bool,

  // redux-form
  pristine: PropTypes.bool,
  touched: PropTypes.bool,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  dirty: PropTypes.bool,
  error: PropTypes.string,
};


export { Textarea };
