import React from 'react';
import classes from './ToggleBtn.module.css';


const toggleBtn = props =>  (
  <div className={classes.ToggleBtn} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default toggleBtn;