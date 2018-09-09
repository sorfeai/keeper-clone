import React, { Component } from 'react'
import trim from 'lodash/trim'
import { connect } from 'react-redux'

import style from './TagsManager.module.scss'
import { Modal, OuterClick, IconButton } from '..'

import {
  createTag,
  deleteTags,
  hideTagsModal,
  saveEditedTag
} from '../../actions'


let TagsManager = class extends Component {
  state = {
    createForm: {
      title: ''
    },
    editForm: {
      id: null,
      title: ''
    }
  }

  onEdit = (id, title) => {
    this.setState(prev => ({
      ...prev,
      editForm: { id, title }
    }))
  }

  onEditChange = e => {
    const { name, value } = e.target
    this.setState(prev => ({
      ...prev,
      editForm: {
        ...prev.editForm,
        [name]: value
      }
    }))
  }

  saveEdited = id => {
    this.props.saveEditedTag(id, this.state.editForm)
    this.stopEditing()
  }

  stopEditing = () => {
    this.setState(prev => ({
      ...prev,
      editForm: {
        id: null,
        title: ''
      }
    }))
  }

  onCreateInputChange = e => {
    const { name, value } = e.target
    this.setState(prev => ({
      ...prev,
      createForm: {
        [name]: value
      }
    }))
  }

  onSubmit = () => {
    const { title } = this.state.createForm

    this.props.createTag(trim(title))

    this.setState(prev => ({
      ...prev,
      createForm: { title: '' }
    }))
  }

  onModalClose = () => {
    this.saveEdited()
    this.props.hideTagsModal()
  }

  render() {
    const {
      tags,
      isModalShown,
      hideTagsModal,
      createTag,
      deleteTags
    } = this.props

    const { createForm, editForm } = this.state

    if (!isModalShown) return null

    const renderSubmit = () =>
      <button
        onClick={hideTagsModal}
        className='button is-light'
      >
        Done
      </button>

    const renderTag = (id, title) =>
      <div key={id} className={`${style.tagItem} level`}>
        <div className='level-left'>
          <div className={`${style.tagTitle} level-item`}>
            {title}
          </div>
        </div>
        <div className='level-right'>
          <div className={`${style.tagAction} level-item`}>
            <IconButton
              onClick={() => this.onEdit(id, title)}
              icon='edit'
              tooltip='Edit tag'
            />
          </div>
          <div className={`${style.tagAction} level-item`}>
            <IconButton
              onClick={() => deleteTags([id])}
              icon='trash'
              tooltip='Delete tag'
            />
          </div>
        </div>
      </div>

    const renderTagEditing = (id, title) =>
      <div key={id} className={`${style.tagItem} level`}>
        <div className='level-left'>
          <div className={`${style.tagTitle} level-item`}>
            <input
              type='text'
              name='title'
              value={editForm.title}
              onChange={this.onEditChange}
              className={style.editInput}
              ref={node => node && node.focus()}
            />
          </div>
        </div>
        <div className='level-right'>
          <div className={`${style.tagAction} level-item`}>
            <IconButton
              onClick={() => this.saveEdited(id)}
              icon='check'
              tooltip='Save'
            />
          </div>
          <div className={`${style.tagAction} level-item`}>
            <IconButton
              onClick={this.stopEditing}
              icon='ban'
              tooltip='Cancel'
            />
          </div>
        </div>
      </div>

    return (
      <Modal
        title='Create new tag'
        onClose={this.onModalClose}
        renderFooter={renderSubmit}
      >
        <div className={style.titleInputWrapper}>
          <input
            type='text'
            name='title'
            value={createForm.title}
            onChange={this.onCreateInputChange}
            className='input is-rounded'
            placeholder='Tag title'
          />
          <IconButton
            onClick={this.onSubmit}
            icon='plus'
            tooltip='Create tag'
            disabled={!trim(createForm.title)}
          />
        </div>
        {tags &&
          <div className={style.tagsWrapper}>
            {tags.map((tag, i) => {
              const id = tag.get('id')
              const title = tag.get('title')

              return id !== editForm.id
                ? renderTag(id, title)
                : renderTagEditing(id, title)
            })}
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
  hideTagsModal,
  saveEditedTag
}

TagsManager = connect(mapStateToProps, mapDispatchToprops)(TagsManager)

export { TagsManager }
