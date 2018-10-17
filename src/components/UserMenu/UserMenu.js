import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './UserMenu.module.scss';
import { Tooltip, OuterClick } from '..';


let UserMenu = class extends Component {
  state = {
    open: false,
  }

  handleClose = () => {
    this.setState((prev) => ({
      ...prev,
      open: !prev.open,
    }));
  }

  render () {
    const { user } = this.props;
    const username = user.get('username');
    const firstName = user.get('firstName');
    const lastName = user.get('lastName');
    const email = user.get('email');
    const avatar = user.get('avatar');

    let userAvatar;
    try {
      userAvatar = require(`../../assets/images/${avatar}`);
    } catch (err) {
      userAvatar = null;
    }

    const { open } = this.state;

    const className = classNames({
      [style.wrapper]: true,
      [style.isOpen]: open,
    });

    return (
      <div className={className}>
        <Tooltip
          text={!open && 'Nikita Belousov'}
          alignRight
        >
          <button
            type="submit"
            onClick={this.handleClose}
            className={style.menuButton}
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
        </Tooltip>
        {open && (
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
                      <strong>{`${firstName} ${lastName}`}</strong>
                      {' '}
                      <small>{`${username}`}</small>
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
        )}
      </div>
    );
  }
};


const mapStateToProps = (state) => ({
  user: state.common.get('user'),
});

UserMenu = connect(mapStateToProps)(UserMenu);

export { UserMenu };
