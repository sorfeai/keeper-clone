import React, { Component } from 'react'
import { Header, NotesFeed } from '..'
import style from './App.module.scss'


export class App extends Component {
  render() {
    return (
      <div className={style.wrapper}>
        <Header />
        <div className='container'>
          <div className={style.content}>
            <NotesFeed />
          </div>
        </div>
      </div>
    )
  }
}
