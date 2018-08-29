import React, { Component, Fragment } from 'react'
import { Tooltip } from '..'
import style from './IconButton.module.scss'


export class IconButton extends Component {
  render() {
    const { tooltip, icon, onClick } = this.props

    return (
      <div className={style.inner}>
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
