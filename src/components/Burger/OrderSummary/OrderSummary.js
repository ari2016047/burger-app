import React from 'react';
import Aux from '../../../hoc/Auxa';

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
            {ing}
            <p>Checkout</p>
        </Aux>
    );
}

export default orderSummary;