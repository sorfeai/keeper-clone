import React, { Component } from 'react'
import trim from 'lodash/trim'
import { connect } from 'react-redux'

import style from './TagsManager.module.scss'
import { Modal, OuterClick, IconButton } from '..'
import { createTag, deleteTags, hideTagsModal } from '../../actions'


let TagsManager = class extends Component {
  state = {
    title: ''
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  onSubmit = () => {
    this.props.createTag(trim(this.state.title))
    this.setState({ title: '' })
  }

  render() {
    const {
      tags,
      isModalShown,
      hideTagsModal,
      createTag,
      deleteTags
    } = this.props

    const { title } = this.state

    if (!isModalShown) return null

    const renderSubmit = () =>
      <button
        onClick={hideTagsModal}
        className='button is-light'
      >
        Done
      </button>

    return (
      <Modal
        title='Create new tag'
        onClose={hideTagsModal}
        renderFooter={renderSubmit}
      >
        <div className={style.titleInputWrapper}>
          <input
            type='text'
            name='title'
            value={title}
            onChange={this.onInputChange}
            className='input is-rounded'
            placeholder='Tag title'
          />
          <IconButton
            onClick={this.onSubmit}
            icon='plus'
            tooltip='Create tag'
            disabled={!trim(title)}
          />
        </div>
        {tags &&
          <div className={style.tagsWrapper}>
            {tags.map((tag, i) =>
              <div key={i} className={`${style.tagItem} level`}>
                <div className='level-left'>
                  <div className={`${style.tagTitle} level-item`}>
                    {tag.get('title')}
                  </div>
                </div>
                <div className='level-right'>
                  <div className={`${style.tagAction} level-item`}>
                    <IconButton
                      icon='edit'
                      tooltip='Edit tag'
                    />
                  </div>
                  <div className={`${style.tagAction} level-item`}>
                    <IconButton
                      onClick={() => deleteTags([tag.get('id')])}
                      icon='trash'
                      tooltip='Delete tag'
                    />
                  </div>
                </div>
              </div>)}
          </div>}
      </Modal>
    )
  }
}


const mapStateToProps = state => ({
  tags: state.tags.tags,
  isModalShown: state.tags.isModalShown
})

const mapDispatchToprops = {
  createTag,
  deleteTags,
  hideTagsModal
}

TagsManager = connect(mapStateToProps, mapDispatchToprops)(TagsManager)

export { TagsManager }
