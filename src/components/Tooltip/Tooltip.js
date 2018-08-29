import React, { Component } from 'react'
import style from './Tooltip.module.scss'


export class Tooltip extends Component {
  componentDidMount() {
    if (this.content) {
      this.height = this.content.childNodes[0].offsetHeight;
      this.forceUpdate()
    }
  }

  render() {
    const { children, text } = this.props

    return (
      <div className={style.inner}>
        <div
          className={style.content}
          ref={node => this.content = node}
        >
          {children}
        </div>
        <div className={style.tooltipInner}>
          <div className={style.tooltip}>
            {text}
          </div>
        </div>
      </div>
    )
  }
}
