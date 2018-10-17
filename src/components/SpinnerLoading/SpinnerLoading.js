import React from 'react';
import style from './SpinnerLoading.module.scss';
import { IconButton } from '..';


const SpinnerLoading = () => (
  <div className={style.wrapper}>
    <IconButton icon="spinner" />
  </div>
);


export { SpinnerLoading };
