import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FocusHOC } from '..';
import style from './TextInput.module.scss';


let TextInput = ({
  meta,
  defaultValue,
  input,
  onRef,
  isFullwidth,
  isSeamless,
  isRound,
  isBoldText,
  ...restProps
}) => {
  const cls = classNames({
    [style.textInput]: true,
    [style.isFullwidth]: isFullwidth,
    [style.isSeamless]: isSeamless,
    [style.isRound]: isRound,
    [style.isBoldText]: isBoldText,
  });

  return (
    <input
      ref={onRef}
      type="text"
      className={cls}
      {...input}
      {...restProps}
    />
  );
};


TextInput.propTypes = {
  meta: PropTypes.object,
  onRef: PropTypes.func,
  isFullwidth: PropTypes.bool,
  isSeamless: PropTypes.bool,
  isRound: PropTypes.bool,
};


TextInput = FocusHOC(TextInput);


export { TextInput };
