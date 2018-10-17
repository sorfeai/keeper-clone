import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Tooltip.module.scss';


const Tooltip = class extends Component {
  componentDidMount () {
    if (this.content) {
      this.height = this.content.childNodes[0].offsetHeight;
      this.forceUpdate();
    }
  }

  render () {
    const { children, text, alignRight } = this.props;

    const innerClassname = classNames({
      [style.tooltipInner]: true,
      [style.isRight]: alignRight,
    });

    return (
      <div className={style.inner}>
        <div
          ref={(node) => this.content = node}
          className={style.content}
        >
          {children}
        </div>
        {text && (
          <div className={innerClassname}>
            <div className={style.tooltip}>
              {text}
            </div>
          </div>
        )}
      </div>
    );
  }
};


/**
* prop types
*/
Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  text: PropTypes.string,
  alignRight: PropTypes.bool,
};


export { Tooltip };
