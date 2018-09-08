import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPage } from '../../actions'


const withPage = page => Wrapped => {
  const mapDispatchToProps = { setPage }

  let Wrapper = class extends Component {
    componentWillMount() {
      this.props.setPage(page)
    }

    render() {
      return <Wrapped {...this.props} />
    }
  }

  return connect(() => ({}), mapDispatchToProps)(Wrapper)
}


export { withPage }
