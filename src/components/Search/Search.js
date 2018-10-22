import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';

import {
  enterSearchMode,
  exitSearchMode,
  updateSearchQuery,
} from '../../actions';

import style from './Search.module.scss';
import { IconButton } from '..';


let Search = ({ focus }) => (
  <div className={style.wrapper}>
    <form action="#">
      <Field
        component={Dummy}
        name="search"
        className={style.searchInput}
        placeholder="Search"
        autoComplete="off"
      />
      <div className={style.iconWrapper}>
        <IconButton
          onClick={() => focus('search', 'search')}
          icon="search"
        />
      </div>
    </form>
  </div>
);

const Dummy = class extends Component {
  constructor (props) {
    super(props);
    this.node = null;
  }

  componentDidUpdate ({ meta: { active: prevActive  } }) {
    const { meta: { active: nextActive } } = this.props;

    // FIXME: duplicates with native focus event
    if (nextActive !== focus) {
      nextActive ? this.node.focus() : this.node.blur();
    }
   }

  handleRef = (node) => {
    if (!this.node) this.node = node;
  }

  render () {
    const { input, ...restProps } = this.props;
    return <input ref={this.handleRef} {...input} {...restProps} />;
  }
};


const mapStateToProps = (state) => ({
  searching: state.common.searching,
  searchQuery: state.common.searchQuery,
});

Search = connect(mapStateToProps, { focus })(Search);


Search = reduxForm({ form: 'search' })(Search);


export { Search };
