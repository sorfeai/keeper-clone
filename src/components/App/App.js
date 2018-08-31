import React, { Component } from 'react'
import { Header, NotesFeed, Notifications } from '..'
import style from './App.module.scss'


export class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <div className={style.notificationsWrapper}>
          <Notifications />
        </div>
        <Header />
        <div className={`${style.content} container`}>
          <NotesFeed />
        </div>
      </div>
    )
  }
}
