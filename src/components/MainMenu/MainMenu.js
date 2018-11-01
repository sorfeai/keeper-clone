import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { NavLink } from 'react-router-dom';
import uuid from 'small-uuid';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { showTagsModal } from '../../actions';
import style from './MainMenu.module.scss';

import {
  getAppIsMainMenuActive,
  getTagsById,
  getTrashNotesIds,
} from '../../selectors';


const itemsData = [
  [
    {
      title: 'Notes',
      icon: 'sticky-note',
      to: '/home',
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
  isActive,
  notesInTrashCount,
  showTagsModal,
  tags: tagsList,
}) => {
  const wrapperCls = classNames({
    [style.wrapper]: true,
    [style.isActive]: isActive,
  });

  const tags = ({ title, icon, to }) =>
    <Fragment key={title}>
      {tagsList.map((tag) =>
        <NavLink
          key={tag.get('title')}
          to='#'
          className={style.menuItem}
        >
          <span className={style.iconWrapper}>
            <i className='fas fa-tag' />
          </span>
          {tag.get('title')}
        </NavLink>)}
      <NavLink
        to='#'
        onClick={showTagsModal}
        className={style.menuItem}
      >
        <span className={style.iconWrapper}>
          <i className={`fas fa-${icon}`} />
        </span>
        {title}
      </NavLink>
    </Fragment>;

  const dummy = ({ title, icon, to }) =>
    <NavLink
      key={title}
      to={to || '#'}
      className={style.menuItem}
    >
      <span className={style.iconWrapper}>
        <i className={`fas fa-${icon}`} />
      </span>
      {title + (to === '/trash' ? ` (${notesInTrashCount})` : '')}
    </NavLink>;

  return (
    <div className={wrapperCls}>
      <div className={style.menu}>
        {itemsData.map((section) =>
          <div key={uuid.create()} className={style.menuSection}>
            {section.map((item) => (
              item.title === 'New tag' ? tags(item) : dummy(item)
            ))}
          </div>)}
      </div>
    </div>
  );
};


MainMenu.propTypes = {
  isActive: PropTypes.bool,
  notesInTrashCount: PropTypes.number.isRequired,
  showTagsModal: PropTypes.func.isRequired,
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
  notesInTrashCount: getTrashNotesIds(state).size,
});

const mapDispatchToProps = { showTagsModal };

MainMenu = connect(mapStateToProps, mapDispatchToProps)(MainMenu);


export { MainMenu };
