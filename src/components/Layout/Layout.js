import React from 'react';
import Aux from '../../hoc/Auxa';
import classes from './Layout.css';

const layout = props => (
    //wrapping root element
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;