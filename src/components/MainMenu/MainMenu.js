import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import uuid from 'small-uuid';
import classNames from 'classnames';
import { connect } from 'react-redux';

import {
  showTagsModal,
  setTagFilter,
  resetTagFilter
} from '../../actions';

import style from './MainMenu.module.scss';

import {
  getAppIsMainMenuActive,
  getNotesTagFilter,
  getTagsById,
  getTrashNotesIds,
} from '../../selectors';


const itemsData = [
  [
    {
      title: 'Notes',
      icon: 'sticky-note',
      to: '/home',
      onClick: resetTagFilter,
    },
    {
      title: 'Reminders',
      icon: 'bell',
    },
  ],
  [
    {
      title: 'New tag',
      icon: 'plus',
    },
  ],
  [
    {
      title: 'Archive',
      icon: 'archive',
    },
    {
      title: 'Trash',
      icon: 'trash',
      to: '/trash',
    },
  ],
  [
    {
      title: 'Settings',
      icon: 'sliders-h',
    },
    {
      title: 'Leave feedback',
      icon: 'comment-alt',
    },
    {
      title: 'Help',
      icon: 'question',
    },
    {
      title: 'Download app',
      icon: 'mobile',
    },
    {
      title: 'Hotkeys',
      icon: 'keyboard',
    },
  ],
];


let MainMenu = ({
  history,
  isActive,
  notesInTrashCount,
  showTagsModal,
  tags: tagsList,
  activeTag,
  setTagFilter,
}) => {
  const wrapperCls = classNames({
    [style.wrapper]: true,
    [style.isActive]: isActive,
  });

  const renderTags = ({ title, icon, to }) => (
    <Fragment key={title}>
      {tagsList.map(renderTag)}
      <NavLink
        to='#'
        onClick={showTagsModal}
        className={style.menuItem}>
        <span className={style.iconWrapper}>
          <i className={`fas fa-${icon}`} />
        </span>
        {title}
      </NavLink>
    </Fragment>
  );

  const renderTag = (tag) => {
    const tagClass = classNames({
      [style.menuItem]: true,
      [style.activeTag]: tag.get('id') === activeTag,
    });

    const onClick = () => {
      history.push(`#${tag.get('title')}`);     
    };

    return (
      <div
        key={tag.get('id')}
        to="#"
        className={tagClass}
        onClick={onClick}>
        <span className={style.iconWrapper}>
          <i className="fas fa-tag" />
        </span>
        {tag.get('title')}
      </div>
    );
  }

  const dummy = ({ title, icon, to, onClick }) => (
    <NavLink
      key={title}
      to={to || '#'}
      className={style.menuItem}
      onClick={onClick || null}>
      <span className={style.iconWrapper}>
        <i className={`fas fa-${icon}`} />
      </span>
      {title + (to === '/trash' ? ` (${notesInTrashCount})` : '')}
    </NavLink>
  );

  return (
    <div className={wrapperCls}>
      <div className={style.menu}>
        {itemsData.map((section) => (
          <div key={uuid.create()} className={style.menuSection}>
            {section.map((item) => (
              item.title === 'New tag' ? renderTags(item) : dummy(item)
            ))}
          </div>))}
      </div>
    </div>
  );
};


MainMenu.propTypes = {
  isActive: PropTypes.bool,
  notesInTrashCount: PropTypes.number.isRequired,
  showTagsModal: PropTypes.func.isRequired,
  activeTag: PropTypes.string,
  tags: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};


const mapStateToProps = (state) => ({
  isActive: getAppIsMainMenuActive(state),
  tags: getTagsById(state).toList(),
  activeTag: getNotesTagFilter(state),
  notesInTrashCount: getTrashNotesIds(state).size,
});

const mapDispatchToProps = {
  showTagsModal,
  setTagFilter,
  resetTagFilter,
};

MainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenu);

MainMenu = withRouter(MainMenu);


export { MainMenu };
