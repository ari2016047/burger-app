import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxa';


const sideDrawer = (props) =>{

    let attachedClasses = [classes.Drawer,classes.Close];
    if(props.open){
        attachedClasses = [classes.Drawer,classes.Open];
    }
    return (
        <Aux>
            <BackDrop show={props.open} backdropClicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="10%"/>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;