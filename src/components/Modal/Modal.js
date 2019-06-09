import React from 'react';
import PropTypes from 'prop-types';
import { OuterClick } from '..';
import style from './Modal.module.scss';


const Modal = ({ title, onClose, renderFooter, children }) => (
  <div className={style.background}>
    <OuterClick onClick={onClose}>
      <div className='box'>
        <div className={`${style.modalTitle} subtitle is-4`}>
          {title}
        </div>
        <div className={style.modalContent}>
          {children}
        </div>
        {renderFooter && (
          <div className={style.modalFooter}>
            {renderFooter()}
          </div>
        )}
      </div>
    </OuterClick>
  </div>
);


/**
* prop types/defaults
*/

Modal.propTypes = {
   children: PropTypes.element,
   onClose: PropTypes.func,
   renderFooter: PropTypes.func,
   title: PropTypes.string.isRequired,
 };


export { Modal };
