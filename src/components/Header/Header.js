import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { PAGE_TRASH } from '../../constants/types';
import { IconButton, RefreshNotes, Search, UserMenu } from '..';

import {
  clearSelection,
  deleteNotes,
  moveNotesToTrash,
  pinNotes,
  toggleFeedView,
  toggleMainMenu,
} from '../../actions';

import style from './Header.module.scss';


let Header = class extends Component {
  renderSelecting () {
    const {
      currentPage,
      selectedNotes,
      pinNotes,
      clearSelection,
      moveNotesToTrash,
      deleteNotes,
    } = this.props;

    const selectedNotesCount = selectedNotes.size;
    const isTrash = currentPage === PAGE_TRASH;

    const handlePin = () => {
      pinNotes(selectedNotes);
      clearSelection();
    };

    const handleMoveToTrash = () => {
      moveNotesToTrash(selectedNotes);
      clearSelection();
    };

    const handleDeleteForever = () => {
      deleteNotes(selectedNotes);
      clearSelection();
    };

    const toolbar = () => (
      <div className={`${style.btnGroup} level`}>
        <div className={`${style.btnGroupItem} level-item`}>
          <IconButton
            onClick={handlePin}
            tooltip='Pin selected'
            icon='thumbtack'
          />
        </div>
        <div className={`${style.btnGroupItem} level-item`}>
          <IconButton
            onClick={handleMoveToTrash}
            tooltip='Move to trash'
            icon='trash'
          />
        </div>
      </div>
    );

    const toolbarTrash = () => (
      <div className={`${style.btnGroup} level`}>
        <div className={`${style.btnGroupItem} level-item`}>
          <IconButton
            onClick={handleDeleteForever}
            tooltip='Delete forever'
            icon='ban'
          />
        </div>
      </div>
    );

    return (
      <div className={style.isSelecting}>
        <div className={style.container}>
          <div className={`${style.inner} level`}>
            <div className='level-left'>
              <div className={`${style.clearSelectionBtn} level-item`}>
                <IconButton
                  onClick={clearSelection}
                  tooltip='Cancel selection'
                  icon='arrow-left'
                />
              </div>
              <div className='level-item'>
                <div className='subtitle is-5'>
                  <FormattedMessage
                    id='selectedNotesCount'
                    defaultMessage={`You selected
                      {selectedNotesCount, number}
                      {selectedNotesCount, plural, one {note} other {notes}}`}
                    values={{ selectedNotesCount }}
                  />
                </div>
              </div>
            </div>
            <div className='level-right'>
              <div className='level-item'>
                {isTrash ? toolbarTrash() : toolbar()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render () {
    const {
      toggleFeedView,
      toggleMainMenu,
      isGrid,
      isSelecting,
      isMainMenuActive,
    } = this.props;

    const className = classNames({
      [style.header]: true,
      [style.isSelecting]: isSelecting,
    });

    return (
      <div className={className}>
        {this.renderSelecting()}
        <div className={style.toolbar}>
          <div className={style.container}>
            <div className={`${style.inner} level`}>
              <div className={`${style.contentLeft} level-left`}>
                <div className='level-item'>
                  <div className={style.toggleMenuIcon}>
                    <IconButton
                      icon={isMainMenuActive ? 'times' : 'bars'}
                      tooltip={isMainMenuActive ? 'Hide menu' : 'Main menu'}
                      onClick={toggleMainMenu}
                    />
                  </div>
                </div>
                <div className={`${style.logoWrapper} level-item`}>
                  <a href="/">
                    <div className={`${style.logo} subtitle is-4`}>
                      <strong>{'Keeper'}</strong>
                    </div>
                  </a>
                </div>
                <div className={`${style.searchWrapper} level-item`}>
                  <Search />
                </div>
              </div>
              <div className='level-right'>
                <div className='level-item'>
                  <div className={`${style.btnGroup} level`}>
                    <div className={`${style.btnGroupItem} level-item`}>
                      <RefreshNotes />
                    </div>
                    <div className={`${style.btnGroupItem} level-item`}>
                      <IconButton
                        tooltip={`${isGrid ? 'List view' : 'Grid view'}`}
                        icon={`${isGrid ? 'list' : 'th-large'}`}
                        onClick={toggleFeedView}
                      />
                    </div>
                  </div>
                </div>
                <div className='level-item'>
                  <div className={`${style.btnGroup} ${style.userInfo} level`}>
                    <div className={`${style.btnGroupItem} level-item`}>
                      <UserMenu />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


/**
* prop types/defaults
*/
Header.propTypes = {
  currentPage: PropTypes.string.isRequired,
  selectedNotes: ImmutablePropTypes.listOf(
    PropTypes.string
  ).isRequired,
  clearSelection: PropTypes.func.isRequired,
  deleteNotes: PropTypes.func.isRequired,
  moveNotesToTrash: PropTypes.func.isRequired,
  toggleFeedView: PropTypes.func.isRequired,
  toggleMainMenu: PropTypes.func.isRequired,
  pinNotes: PropTypes.func.isRequired,
  isGrid: PropTypes.bool,
  isMainMenuActive: PropTypes.bool,
  isSelecting: PropTypes.bool,
};

Header.defaultProps = {
  isGrid: true,
};


/**
* connect to store
*/
const mapStateToProps = (state) => ({
  currentPage: state.common.get('currentPage'),
  selectedNotes: state.select.get('selectedNotes'),
  isGrid: state.common.get('feedViewIsGrid'),
  isMainMenuActive: state.common.get('mainMenuActive'),
  isSelecting: state.select.get('selecting'),
});

const mapDispatchToProps = {
  clearSelection,
  deleteNotes,
  moveNotesToTrash,
  pinNotes,
  toggleFeedView,
  toggleMainMenu,
};

Header = connect(mapStateToProps, mapDispatchToProps)(Header);


export { Header };
