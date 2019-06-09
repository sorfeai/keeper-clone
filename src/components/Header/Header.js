import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Level, Heading } from 'react-bulma-components/full';
import classNames from 'classnames';
import { connect } from 'react-redux';

import {
  AnimateMount,
  SelectBar,
  IconButton,
  RefreshNotes,
  Search,
  UserMenu,
} from '..';

import {
  getAppCurrentPage,
  getAppIsFeedViewGrid,
  getAppIsMainMenuActive,
  getNotesIsSelecting,
  getNotesSelectedIds,
  getNotesTagFilter,
  getTagsById,
} from '../../selectors';

import {
  clearSelection,
  deleteNotes,
  moveNotesToTrash,
  pinNotes,
  toggleFeedView,
  toggleMainMenu,
} from '../../actions';

import style from './Header.module.scss';


let Header = ({
  toggleFeedView,
  toggleMainMenu,
  isSelecting,
  isGrid,
  isMainMenuActive,
  allTags,
  activeTag,
}) => {
  const className = classNames({
    [style.header]: true,
  });

  const renderTitle = () => {
    if (activeTag !== undefined) {
      return allTags
        .find((tag) => tag.get('id') === activeTag)
        .get('title');
    }

    return (
      <strong>{'Keeper'}</strong>
    );
  };

  return (
    <div className={className}>
      <AnimateMount
        isMounted={isSelecting}
        classNames={{
          basic: style.selectBarWrapper,
          mount: style.selectBarWrapperShow,
          unmount: style.selectBarWrapperHide,
        }}>
        <SelectBar />
      </AnimateMount>
      <div className={style.toolBarWrapper}>
        <div className={style.toolbar}>
          <Level className={style.container}>
            <Level.Side side="left" className={style.contentLeft}>
              <Level.Item>
                <div className={style.toggleMenuIcon}>
                  <IconButton
                    icon={isMainMenuActive ? 'times' : 'bars'}
                    tooltip={isMainMenuActive ? 'Hide menu' : 'Main menu'}
                    onClick={toggleMainMenu}/>
                </div>
              </Level.Item>
              <Level.Item className={style.logoWrapper}>
                <a href="/">
                  <Heading subtitle size={4} className={style.logo}>
                    {renderTitle()}
                  </Heading>
                </a>
              </Level.Item>
              <Level.Item className={style.searchWrapper}>
                <Search />
              </Level.Item>
            </Level.Side>
            <Level.Side align="right">
              <Level.Item>
                <Level className={style.btnGroup}>
                  <Level.Item className={style.btnGroupItem}>
                    <RefreshNotes />
                  </Level.Item>
                  <Level.Item className={style.btnGroupItem}>
                    <IconButton
                      tooltip={`${isGrid ? 'List view' : 'Grid view'}`}
                      icon={`${isGrid ? 'list' : 'th-large'}`}
                      onClick={toggleFeedView}/>
                  </Level.Item>
                </Level>
              </Level.Item>
              <Level.Item>
                <Level className={`${style.btnGroup} ${style.userInfo}`}>
                  <Level.Item className={style.btnGroupItem}>
                    <UserMenu />
                  </Level.Item>
                </Level>
              </Level.Item>
            </Level.Side>
          </Level>
        </div>
      </div>
    </div>
  );
};


Header.propTypes= {
  // state
  currentPage: PropTypes.string.isRequired,
  selectedNotes: ImmutablePropTypes.listOf(
    PropTypes.string
  ).isRequired,
  isGrid: PropTypes.bool,
  isMainMenuActive: PropTypes.bool,
  isSelecting: PropTypes.bool,
  activeTag: PropTypes.string,
  allTags: ImmutablePropTypes.map.isRequired,

  // actions
  clearSelection: PropTypes.func.isRequired,
  deleteNotes: PropTypes.func.isRequired,
  moveNotesToTrash: PropTypes.func.isRequired,
  toggleFeedView: PropTypes.func.isRequired,
  toggleMainMenu: PropTypes.func.isRequired,
  pinNotes: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  currentPage: getAppCurrentPage(state),
  selectedNotes: getNotesSelectedIds(state),
  isGrid: getAppIsFeedViewGrid(state),
  isMainMenuActive: getAppIsMainMenuActive(state),
  isSelecting: getNotesIsSelecting(state),
  activeTag: getNotesTagFilter(state),
  allTags: getTagsById(state),
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
