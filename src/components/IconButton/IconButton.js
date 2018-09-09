import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { Tooltip } from '..'
import style from './IconButton.module.scss'


export class IconButton extends Component {
  render() {
    const {
      tooltip,
      icon,
      onClick,
      disabled,
      alt,
      alignTooltipRight
    } = this.props

    const className = classNames({
      [style.inner]: true,
      [style.alt]: alt,
      [style.disabled]: disabled
    })

    const handleClick = disabled ? undefined : onClick

    return (
      <div className={className}>
        {(tooltip && !disabled)
          ? <Tooltip
              text={tooltip}
              alignRight={alignTooltipRight}
            >
              <button
                onClick={handleClick}
                className={style.button}
              >
                <i className={`fas fa-${icon}`}></i>
              </button>
            </Tooltip>
          : <button
              onClick={handleClick}
              className={style.button}
            >
              <i className={`fas fa-${icon}`}></i>
            </button>}
      </div>
    )
  }
}
