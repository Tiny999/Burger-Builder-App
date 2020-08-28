import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const toolbar = props => (
  <header className={classes.Toolbar}>
      <div>Menu</div>
      <Logo/>
      <ul>
        <NavItems/>
      </ul>
  </header>
);

export default toolbar;