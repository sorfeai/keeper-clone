import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { TagsManagerView } from './TagsManagerView';

import {
  getTagsById,
  getTagsEditingId,
  getTagsIsModalShown,
  getFieldErrors,
} from '../../selectors';

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
    hideTagsModal();
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
      createErrors,
      editErrors,
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
        canSubmitCreate={!createErrors}
        canSubmitEdit={!editErrors}
      />
    );
  }
};


TagsManagerCont.propTypes = {
  // state
  tags: ImmutablePropTypes.list.isRequired,
  editingId: PropTypes.string,
  isModalShown: PropTypes.bool,
  formErrors: PropTypes.object,

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
  tags: getTagsById(state).toList(),
  editingId: getTagsEditingId(state),
  isModalShown: getTagsIsModalShown(state),
  createErrors: getFieldErrors('tags', 'create')(state),
  editErrors: getFieldErrors('tags', 'edit')(state),
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
