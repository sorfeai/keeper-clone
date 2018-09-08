import React, { Component } from 'react'


export class OuterClick extends Component {
  componentWillMount() {
    document.addEventListener('click', this.props.onClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.props.onClick)
  }

  render() {
    return (
      <div onClick={e => e.nativeEvent.stopImmediatePropagation()}>
        {this.props.children}
      </div>
    )
  }
}
