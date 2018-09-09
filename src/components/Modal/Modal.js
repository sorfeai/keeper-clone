import React from 'react'
import { OuterClick } from '..'
import style from './Modal.module.scss'


const Modal = ({ title, onClose, renderFooter, children }) =>
  <div className={style.background}>
    <OuterClick onClick={onClose}>
      <div className='box'>
        <div className={`${style.modalTitle} subtitle is-4`}>
          {title}
        </div>
        <div className={style.modalContent}>
          {children}
        </div>
        <div className={style.modalFooter}>
          {renderFooter()}
        </div>
      </div>
    </OuterClick>
  </div>


export { Modal }
