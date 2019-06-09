import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autosize from 'autosize';

import { FocusHOC } from '..';
import style from './Textarea.module.scss';


let Textarea = class extends Component {
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
      onRef,
      onChangeCustom,
      appearance,
      isFullwidth,
      isAutosized,
      ...restProps,
    } = this.props;

    const cls = classNames({
      [style.textarea]: true,
      [style.isFullwidth]: isFullwidth,
      [style.isSeamless]: appearance === 'seamless',
      [style.isAutosized]: isAutosized,
    });

    const onChange = onChangeCustom
      ? (ev) => {
        input.onChange(ev);
        onChangeCustom(ev);
      } : input.onChange;

    return (
      <textarea
        ref={(node) => {
          this.handleRef(node);
          onRef(node);
        }}
        className={cls}
        onChange={onChange}
        {...input}
        {...restProps}
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


Textarea = FocusHOC(Textarea);


export { Textarea };
