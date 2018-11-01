import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';

import style from './Search.module.scss';
import { TextInput, IconButton } from '..';

import {
  getAppIsSearchingNotes,
  getFormValue,
} from '../../selectors';

import {
  enterSearchMode,
  exitSearchMode,
  updateSearchQuery,
  searchInputUpdated,
} from '../../actions';


let Search = ({ focus, searchInputUpdated }) => (
  <div className={style.wrapper}>
    <form>
      <Field
        component={TextInput}
        name="search"
        className={style.searchInput}
        placeholder="Search"
        autoComplete="off"
        onChangeCustom={searchInputUpdated}
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
  searching: getAppIsSearchingNotes(state),
  searchQuery: getFormValue('search', 'search')(state),
});

const mapDispatchToProps = {
  focus,
  searchInputUpdated,
};

Search = connect(mapStateToProps, mapDispatchToProps)(Search);
Search = reduxForm({ form: 'search' })(Search);


export { Search };
