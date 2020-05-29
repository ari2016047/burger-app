import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem href="/" active={true}>Burger Builder</NavigationItem>
        <NavigationItem href="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;