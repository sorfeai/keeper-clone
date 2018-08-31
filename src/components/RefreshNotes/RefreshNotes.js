import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startRefresh } from '../../actions'
import { IconButton, SpinnerLoading } from '..'
import { REFRESH_IN_PROGRESS, REFRESH_DONE } from '../../constants/types'


let RefreshNotes = class extends Component {
  render() {
    const { refreshStatus, startRefresh } = this.props

    switch (refreshStatus) {
      case REFRESH_IN_PROGRESS:
        return <SpinnerLoading />
      case REFRESH_DONE:
        return <IconButton icon='check' />
      default:
        return (
          <IconButton
            onClick={startRefresh}
            icon='sync-alt'
            tooltip='Refresh'
          />
        )
    }
  }
}


const mapStateToProps = state => ({
  refreshStatus: state.refreshStatus
})

const mapDispatchToProps = { startRefresh }

RefreshNotes = connect(mapStateToProps, mapDispatchToProps)(RefreshNotes)

export { RefreshNotes }
