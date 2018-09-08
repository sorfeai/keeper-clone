import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import classNames from 'classnames'
import style from './App.module.scss'

import {
  Header,
  NotesFeed,
  Trash,
  Notifications,
  MainMenu
} from '..'


let App =  class extends Component {
  render() {
    const contentClassname = classNames({
      [style.content]: true,
      [style.mainMenuActive]: this.props.mainMenuActive
    })

    return (
      <BrowserRouter>
        <div className={style.app}>
          <div className={style.notificationsWrapper}>
            <Notifications />
          </div>
          <Header />
          <MainMenu />
          <div className={`${contentClassname} container`}>
            <Route exact path='/' render={() => <Redirect to='/home' />} />
            <Route exact path='/home' component={NotesFeed} />
            <Route exact path='/trash' component={Trash} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}


const mapStateToProps = state => ({
  mainMenuActive: state.common.mainMenuActive
})

App = connect(mapStateToProps)(App)

export { App }
