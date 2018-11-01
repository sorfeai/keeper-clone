import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './UserMenu.module.scss';
import { Tooltip, OuterClick } from '..';

import {
  getUserIsMenuActive,
  getUserUsername,
  getUserFirstName,
  getUserLastName,
  getUserEmail,
  getUserAvatar,
} from '../../selectors';


let UserMenu = class extends Component {
  render () {
    const {
      isActive,
      username,
      firstName,
      lastName,
      email,
      avatar,
    } = this.props;

    if (
      !username ||
      !firstName ||
      !lastName ||
      !email
    ) return null;

    let userAvatar;
    try {
      userAvatar = require(`../../assets/images/${avatar}`);
    } catch (err) {
      userAvatar = null;
    }

    const className = classNames({
      [style.wrapper]: true,
      [style.isOpen]: isActive,
    });

    const fullName = `${firstName} ${lastName}`;

    return (
      <div className={className}>
        <Tooltip
          text={!isActive && fullName}
          alignRight
        >
          <button
            type="submit"
            onClick={this.handleClose}
            className={style.menuButton}
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
        </Tooltip>
        <OuterClick onClick={this.handleClose}>
          <div className={style.popupWrapper}>
            <div className='box'>
              <article className='media'>
                <figure className='media-left'>
                  <p className='image is-64x64'>
                    <span
                      className={style.avatar}
                      style={{ backgroundImage: `url(${userAvatar})` }}
                    />
                  </p>
                </figure>
                <div className='media-content'>
                  <div className='content'>
                    <strong>{fullName}</strong>
                    {' '}
                    <small>{username}</small>
                    <div className='subtitle is-6'>
                      {email}
                    </div>
                    <button type="submit">{'Profile settings'}</button>
                  </div>
                </div>
              </article>
              <article className={`${style.popupFooter} media`}>
                <div className='media-content'>
                  <div className='level'>
                    <div className='level-left'>
                      <div className='level-item'>
                        <button type="submit" className='button is-light'>
                          {'Change Account'}
                        </button>
                      </div>
                    </div>
                    <div className='level-right'>
                      <div className='level-item'>
                        <button type="submit" className='button is-light'>
                          {'Logout'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </OuterClick>
      </div>
    );
  }
};


UserMenu.propTypes = {
  isActive: PropTypes.bool,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
};


const mapStateToProps = (state) => ({
  isActive: getUserIsMenuActive(state),
  username: getUserUsername(state),
  firstName: getUserFirstName(state),
  lastName: getUserLastName(state),
  email: getUserEmail(state),
  avatar: getUserAvatar(state),
});

UserMenu = connect(mapStateToProps)(UserMenu);


export { UserMenu };
