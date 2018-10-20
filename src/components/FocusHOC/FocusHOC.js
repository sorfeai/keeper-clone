import React, { Component } from 'react';


// FIXME: don't need HOC, rewrite as container
const FocusHOC = (Wrapped) => (
  class extends Component {
    componentDidUpdate ({ meta: { active: prevActive } }) {
      const { meta: { active } } = this.props;

      if ((active !== prevActive) && active) {
        if (this.inputNode !== document.activeElement) {
          this.inputNode.focus();
        }
      }
    }

    handleRef = (node) => {
      if (!this.inputNode) {
        this.inputNode = node;
      }
    }

    render () {
      return (
        <Wrapped onRef={this.handleRef} {...this.props} />
      );
    }
  }
);


export { FocusHOC };
