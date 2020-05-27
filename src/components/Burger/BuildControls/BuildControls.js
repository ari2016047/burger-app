import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls =[
        {label:'Salad',type:'salad'},
        {label:'Bacon',type:'bacon'},
        {label:'Cheese',type:'cheese'},
        {label:'Meat',type:'meat'}
    ];

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>Current Price:<strong> {props.price.toFixed(2)} </strong></p>
        {
            controls.map(i =>(
                <BuildControl
                 key={i.type}
                 label={i.label}
                 added={() => props.refToAdd(i.type)}
                 reduced={() => props.refToRed(i.type)}
                 disabled={props.disabled[i.type]}
                />
            ) )
        }
        <button className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;