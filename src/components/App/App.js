import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './App.module.scss'

import {
  Header,
  NotesFeed,
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
      <div className={style.app}>
        <div className={style.notificationsWrapper}>
          <Notifications />
        </div>
        <Header />
        <MainMenu />
        <div className={`${contentClassname} container`}>
          <NotesFeed />
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  mainMenuActive: state.mainMenuActive
})

App = connect(mapStateToProps)(App)

export { App }
