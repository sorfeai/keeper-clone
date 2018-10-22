import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tooltip } from '..';
import style from './IconButton.module.scss';


const IconButton = ({
  onClick,
  icon,
  tooltip,
  disabled,
  alt,
  alignTooltipRight,
  small,
}) => {
  const className = classNames({
    [style.inner]: true,
    [style.alt]: alt,
    [style.disabled]: disabled,
    [style.small]: small,
  });

  const handleClick = disabled ? undefined : onClick;

  const regular = (
    <button
      type="button"
      onClick={handleClick}
      className={style.button}
    >
      <i className={`fas fa-${icon}`} />
    </button>
  );

  const withTooltip = (
    <Tooltip
      text={tooltip}
      alignRight={alignTooltipRight}
    >
      <button
        type="button"
        onClick={handleClick}
        className={style.button}
      >
        <i className={`fas fa-${icon}`} />
      </button>
    </Tooltip>
  );

  return (
    <div className={className}>
      {(!tooltip || disabled) ? regular : withTooltip}
    </div>
  );
};


IconButton.propTypes = {
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  alt: PropTypes.bool,
  alignTooltipRight: PropTypes.bool,
  small: PropTypes.bool,
};


export { IconButton };
