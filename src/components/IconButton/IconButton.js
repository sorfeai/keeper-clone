import React, { Component, Fragment } from 'react'
import style from './IconButton.module.scss'


export class IconButton extends Component {
  render() {
    const { tooltip, icon, onClick } = this.props

    return (
      <div className={style.inner}>
        <button onClick={onClick} className={style.button}>
          <i className={`fas fa-${icon}`}></i>
        </button>
        <div className={style.tooltipInner}>
          <div className={style.tooltip}>
            {tooltip}
          </div>
        </div>
      </div>
    )
  }
}
