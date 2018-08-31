import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeNotification } from '../../actions'


const NotificationHOC = Comp => {
  let Notification = class extends Component {
    componentDidMount() {
      const { id, expires, removeNotification } = this.props

      this.removeTimeout = setTimeout(() => {
        removeNotification(id)
      }, expires)
    }

    onClose = () => {
      clearTimeout(this.removeTimeout)
      this.props.onClose()
    }

    onCancel = () => {
      clearTimeout(this.removeTimeout)
      this.props.onCancel()
    }

    render() {
      return (
        <Comp
          {...this.props}
          onClose={this.onClose}
          onCancel={this.props.onCancel ? this.onCancel : undefined}
        />
      )
    }
  }

  return connect(() => ({}), { removeNotification })(Notification)
}


export { NotificationHOC }
