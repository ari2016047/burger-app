import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxa';
import Backdrop from '../Backdrop/Backdrop';

//Add modal wherever we want
const modal = (props) =>{
    console.log('inside modal', props.show);
    return(
    <Aux>
    <Backdrop show={props.show} backdropClicked={props.modalClosed}/>
    <div 
        className={classes.Modal}
        style={
            {   transform: props.show ? 'translateY(0)': 'translateY(-400vh)'
            }
        }>
        {props.children}
    </div>
    </Aux>
    );
};

export default modal;