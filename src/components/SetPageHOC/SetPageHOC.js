import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../actions';


const SetPageHOC = (page) => (Wrapped) => {
  const mapDispatchToProps = { setPage };

  const Wrapper = class extends Component {
    componentWillMount () {
      const { setPage } = this.props;
      setPage(page);
    }

    render () {
      return <Wrapped {...this.props} />;
    }
  };

  return connect(() => ({}), mapDispatchToProps)(Wrapper);
};


export { SetPageHOC };
