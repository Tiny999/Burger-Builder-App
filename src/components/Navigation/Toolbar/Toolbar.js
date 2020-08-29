import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import ToggleBtn from '../SideDrawer/ToggleBtn/ToggleBtn';

const toolbar = props => (
  <header className={classes.Toolbar}>
      <ToggleBtn clicked={props.toggle}/>
      <div className={classes.Logo}>
       <Logo/>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavItems />
      </nav>
  </header>
);

export default toolbar;