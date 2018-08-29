import React, { Component } from 'react'
import classNames from 'classnames'
import { Tooltip } from '..'
import style from './Note.module.scss'


export class Note extends Component {
  render() {
    const {
      title,
      content,
      id,
      selecting,
      selected,
      onSelect,
      onDeselect
    } = this.props

    const className = classNames({
      [`${[style.note]} box`]: true,
      [style.isSelected]: selected
    })

    const onCheckClick = id => selected ? onDeselect(id) : onSelect(id)

    return (
      <div
        onClick={selecting ? (() => onCheckClick(id)) : undefined}
        className={className}
      >
        <div className={style.inner}>
          <div className={style.menu}>
            <div className={style.checkWrapper}>
              <Tooltip text={selected ? 'Deselect note' : 'Select note'}>
                <button
                  onClick={!selecting ? (() => onCheckClick(id)) : undefined}
                  className={style.check}
                >
                  <i className='fas fa-check'></i>
                </button>
              </Tooltip>
            </div>
          </div>
          <div className={style.content}>
            <strong>{title}</strong>
            <p>{content}</p>
          </div>
        </div>
      </div>
    )
  }
}
