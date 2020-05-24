import React from 'react';
import Aux from '../../hoc/Auxa';

const layout = props => (
    //wrapping root element
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;