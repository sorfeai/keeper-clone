import React, { Component } from 'react'
import classNames from 'classnames'
import style from './Tooltip.module.scss'


export class Tooltip extends Component {
  componentDidMount() {
    if (this.content) {
      this.height = this.content.childNodes[0].offsetHeight;
      this.forceUpdate()
    }
  }

  render() {
    const { children, text, alignRight } = this.props

    const innerClassname = classNames({
      [style.tooltipInner]: true,
      [style.isRight]: alignRight
    })

    return (
      <div className={style.inner}>
        <div
          className={style.content}
          ref={node => this.content = node}
        >
          {children}
        </div>
        {text &&
          <div className={innerClassname}>
            <div className={style.tooltip}>
              {text}
            </div>
          </div>}
      </div>
    )
  }
}
