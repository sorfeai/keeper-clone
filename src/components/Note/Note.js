import React, { Component } from 'react'
import style from './Note.module.scss'


export class Note extends Component {
  render() {
    const { title, content } = this.props

    return (
      <div className={style.note}>
        <div className="box">
          <strong>{title}</strong>
          <p>{content}</p>
        </div>
      </div>
    )
  }
}
