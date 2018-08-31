import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { Tooltip } from '..'
import style from './IconButton.module.scss'


export class IconButton extends Component {
  render() {
    const { tooltip, icon, onClick, alt } = this.props

    const className = classNames({
      [style.inner]: true,
      [style.alt]: alt
    })

    return (
      <div className={className}>
          {tooltip ?
            <Tooltip text={tooltip}>
              <button onClick={onClick} className={style.button}>
                <i className={`fas fa-${icon}`}></i>
              </button>
            </Tooltip> :
            <button onClick={onClick} className={style.button}>
              <i className={`fas fa-${icon}`}></i>
            </button>}
      </div>
    )
  }
}
