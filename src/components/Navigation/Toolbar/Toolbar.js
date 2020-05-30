import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggle from '../SideDrawer/Toggle/Toggle';

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <Toggle clicked={props.drawerToggleClicked}/>
        <Logo height="80%"/>
        <nav className={classes.MobileOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;