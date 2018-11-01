import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { getAppIsMainMenuActive } from '../../selectors';
import { initApp } from '../../actions';
import { PAGE_HOME, PAGE_TRASH } from '../../constants/types';
import style from './App.module.scss';

import {
  SetPageHOC,
  Header,
  MainMenu,
  NotesFeed,
  NotificationsManager,
  TagsManager,
} from '..';


let App = class extends Component {
  componentDidMount () {
    this.props.initApp();
  }

  render () {
    const { isMainMenuActive } = this.props;

    const contentCls = classNames({
      [style.content]: true,
      [style.isMainMenuActive]: isMainMenuActive,
    });

    const redirectHome = () => <Redirect to='/home' />;

    const HomePage = SetPageHOC(PAGE_HOME)(NotesFeed);
    const TrashPage = SetPageHOC(PAGE_TRASH)(NotesFeed);

    return (
      <BrowserRouter>
        <div className={style.app}>
          <TagsManager />
          <div className={style.notifications}>
            <NotificationsManager />
          </div>
          <Header />
          <MainMenu />
          <div className={`${contentCls} container`}>
            <Route exact path='/' render={redirectHome} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/trash' component={TrashPage} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
};


App.propTypes = {
  isMainMenuActive: PropTypes.bool,
  initApp: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  isMainMenuActive: getAppIsMainMenuActive(state),
});

const mapDispatchToProps = { initApp };

App = connect(mapStateToProps, mapDispatchToProps)(App);


export { App };
