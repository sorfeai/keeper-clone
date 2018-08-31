import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './UserMenu.module.scss'
import { Tooltip } from '..'


let UserMenu = class extends Component {
  state = {
    open: false
  }

  toggle = () => {
    this.setState(prev => ({
      ...prev,
      open: !prev.open
    }))
  }

  render() {
    const {
      username,
      firstName,
      lastName,
      email,
      avatar
    } = this.props

    let userAvatar
    try {
      userAvatar = require(`../../assets/images/${avatar}`)
    } catch (e) {
      userAvatar = null
    }

    const { open } = this.state

    const className = classNames({
      [style.wrapper]: true,
      [style.isOpen]: open
    })

    return (
      <div className={className}>
        <Tooltip text={!open && 'Nikita Belousov'}>
          <button
            onClick={this.toggle}
            className={style.menuButton}
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
        </Tooltip>
        {open &&
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
                    <a href='#'>Profile settings</a>
                  </div>
                </div>
              </article>
              <article className={`${style.popupFooter} media`}>
                <div className='media-content'>
                  <div className='level'>
                    <div className='level-left'>
                      <div className='level-item'>
                        <button className='button is-light'>
                          Change Account
                        </button>
                      </div>
                    </div>
                    <div className='level-right'>
                      <div className='level-item'>
                        <button className='button is-light'>
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  username: state.user.get('username'),
  firstName: state.user.get('firstName'),
  lastName: state.user.get('lastName'),
  email: state.user.get('email'),
  avatar: state.user.get('avatar')
})

UserMenu = connect(mapStateToProps)(UserMenu)

export { UserMenu }
