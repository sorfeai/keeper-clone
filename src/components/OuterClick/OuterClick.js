import React, { Component } from 'react';
import PropTypes from 'prop-types';


class OuterClick extends Component {
  componentWillMount () {
    const { onClick } = this.props;
    document.addEventListener('click', onClick);
  }

  componentWillUnmount () {
    const { onClick } = this.props;
    document.removeEventListener('click', onClick);
  }

  handleInnerClick (ev) {
    ev.nativeEvent.stopImmediatePropagation();
  }

  render () {
    const { children } = this.props;

    return (
      <div onClick={this.handleInnerClick}>
        {children}
      </div>
    );
  }
}


/**
* prop types/defaults
*/

OuterClick.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
};


export { OuterClick };
