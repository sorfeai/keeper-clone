import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { TagsManagerView } from './TagsManagerView';
import style from './TagsManager.module.scss';

import {
  createTag,
  deleteTags,
  hideTagsModal,
  startEditingTag,
  endEditingTag,
  submitCreateTag,
  submitEditTag,
} from '../../actions';


let TagsManagerCont = class extends Component {
  handleModalClose = () => {
    const { hideTagsModal } = this.props;
    // this.saveEdited();
    hideTagsModal();
  }

  canSubmitCreate = () => {
    const { form: { tags } } = this.props;

    if (tags) {
      return tags.syncErrors ? !tags.syncErrors.create : true;
    }
    return false;
  }

  canSubmitEdit = () => {
    const { form: { tags } } = this.props;

    if (tags) {
      return tags.syncErrors ? !tags.syncErrors.edit : true;
    }
    return false;
  }

  render () {
    const {
      tags,
      editingId,
      isModalShown,
      hideTagsModal,
      createTag,
      deleteTags,
      startEditingTag,
      endEditingTag,
      submitCreateTag,
      submitEditTag,
    } = this.props;

    if (!isModalShown) return null;

    return (
      <TagsManagerView
        tags={tags}
        editingId={editingId}
        isModalShown={isModalShown}
        onModalClose={this.handleModalClose}
        onHideTagsModal={hideTagsModal}
        onCreateTag={createTag}
        onDeleteTags={deleteTags}
        onStartEditingTag={startEditingTag}
        onEndEditingTag={endEditingTag}
        onSubmitCreateTag={submitCreateTag}
        onSubmitEditTag={submitEditTag}
        canSubmitCreate={this.canSubmitCreate}
        canSubmitEdit={this.canSubmitEdit}
      />
    );
  }
};


TagsManagerCont.propTypes = {
  // state
  tags: ImmutablePropTypes.list.isRequired,
  editingId: PropTypes.string,
  isModalShown: PropTypes.bool,
  form: PropTypes.object.isRequired,

  // actions
  createTag: PropTypes.func.isRequired,
  deleteTags: PropTypes.func.isRequired,
  hideTagsModal: PropTypes.func.isRequired,
  startEditingTag: PropTypes.func.isRequired,
  endEditingTag: PropTypes.func.isRequired,
  submitCreateTag: PropTypes.func.isRequired,
  submitEditTag: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  tags: state.tags.get('byId').toList(),
  editingId: state.tags.get('editingId'),
  isModalShown: state.tags.get('isModalShown'),
  form: state.form,
});

const mapDispatchTopProps = {
  createTag,
  deleteTags,
  hideTagsModal,
  startEditingTag,
  endEditingTag,
  submitCreateTag,
  submitEditTag,
};

TagsManagerCont = connect(
  mapStateToProps,
  mapDispatchTopProps
)(TagsManagerCont);

TagsManagerCont = reduxForm({ form: 'tags' })(TagsManagerCont);


export { TagsManagerCont };
