import React, { Component } from 'react'
import { Header, NotesFeed } from '..'
import style from './App.module.scss'


export class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <Header />
        <div className={`${style.content} container`}>
          <NotesFeed />
        </div>
      </div>
    )
  }
}
