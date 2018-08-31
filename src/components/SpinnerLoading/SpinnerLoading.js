import React from 'react'
import style from './SpinnerLoading.module.scss'
import { IconButton } from '..'


export const SpinnerLoading = () =>
  <div className={style.wrapper}>
    <IconButton icon='spinner' />
  </div>
