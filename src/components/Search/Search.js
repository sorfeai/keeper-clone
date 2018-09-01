import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './Search.module.scss'
import { IconButton } from '..'

import {
  enterSearchMode,
  exitSearchMode,
  updateSearchQuery
} from '../../actions'


let Search = class extends Component {
  render() {
    const { searchQuery, updateSearchQuery } = this.props

    return (
      <div className={style.wrapper}>
        <input
          type="text"
          className={style.searchInput}
          placeholder='Search'
          value={searchQuery}
          onChange={e => updateSearchQuery(e.target.value)}
          ref={node => this.input = node}
        />
        <div className={style.iconWrapper}>
          <IconButton
            onClick={() => this.input.focus()}
            icon='search'
          />
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  searching: state.searching,
  searchQuery: state.searchQuery
})

const mapDispatchToprops = {
  enterSearchMode,
  exitSearchMode,
  updateSearchQuery
}

Search = connect(mapStateToProps, mapDispatchToprops)(Search)

export { Search }
