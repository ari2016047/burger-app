import React from 'react';
import Aux from '../../../hoc/Auxa';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{
    const ing = Object.keys(props.ingredients)
    .map(i =>{
    return (
        <li key={i}>
            {i}:{props.ingredients[i]}
        </li>
        );
    });
    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>A delecious Burger with following ingredients</p>
            <ul>
                {ing}
            </ul>
            <p><strong>Total Price: {props.totPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType="Danger" clicked={props.cancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkout}>Checkout</Button>
        </Aux>
    );
}

export default orderSummary;