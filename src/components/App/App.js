import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  Header,
  MainMenu,
  NotesFeed,
  NotificationsManager,
  TagsManager,
  Trash,
} from '..';

import style from './App.module.scss';


let App = ({ isMainMenuActive }) => {
  const contentCls = classNames({
    [style.content]: true,
    [style.isMainMenuActive]: isMainMenuActive,
  });

  const redirectHome = () => <Redirect to='/home' />;

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
          <Route exact path='/home' component={NotesFeed} />
          <Route exact path='/trash' component={Trash} />
        </div>
      </div>
    </BrowserRouter>
  );
};


App.propTypes = {
  isMainMenuActive: PropTypes.bool,
};


const mapStateToProps = (state) => ({
  isMainMenuActive: state.common.get('mainMenuActive'),
});

App = connect(mapStateToProps)(App);


export { App };
