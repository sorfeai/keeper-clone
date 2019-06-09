import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Field, reduxForm, focus } from 'redux-form';
import { Box } from 'react-bulma-components/full';

import { TextInput, Textarea, OuterClick } from '..';
import { newNote } from '../../actions';
import style from './CreateNote.module.scss';


let CreateNote = class extends Component {
  state = {
    expand: false, 
  }

  save = () => {
    const { newNote, reset } = this.props;

    newNote();

    this.setState({ expand: false, }, reset);
  }

  onTitleFocus = () => {
    if (!this.state.expand) {
      this.setState({ expand: true });
      
      setTimeout(() => {
        this.props.focus('createNote', 'content');
      });
    }
  }

  render() {
    const { expand } = this.state;

    const wrapperCls = classNames({
      [style.wrapper]: true,
    });

    const formCls = classNames({
      [style.form]: true,
    });

    const onOuterClick = () => {
      if (this.state.expand) {
        this.save();
      }
    };

    return (
      <div className={wrapperCls}>
        <OuterClick onClick={onOuterClick}>
          <Box className={formCls}>
            <Field
              component={TextInput}
              type="text"
              name="title"
              placeholder="New note..."
              appearance="seamless"
              onFocus={this.onTitleFocus}
              isFullwidth
              isBoldText/>
            {expand && (
              <div className={style.contentInput}>
                <Field
                  component={Textarea}
                  name="content"
                  placeholder="Content..."
                  appearance="seamless"
                  isFullwidth
                  isAutosized/>
              </div>)}
          </Box>
        </OuterClick>
      </div>
    );
  }
};


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
  focus,
  newNote,
};

const validate = (values) => {
  const errors = {};

  if (!values.title || values.title.trim() == '') {
    errors.title = 'Required';
  }

  return errors;
}

CreateNote = connect(mapStateToProps, mapDispatchToProps)(CreateNote);

CreateNote = reduxForm({
  form: 'createNote',
  validate,
})(CreateNote);


export { CreateNote };
