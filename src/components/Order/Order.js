import React from 'react';
import classes from './Order.css';

const order = (props) =>{
    let ingredients =[];
    for(let i in props.ingredients){
        ingredients.push(
            {
                name: i,
                quantity: props.ingredients[i]
            }
        );
    }
    let ingredientOutput = ingredients.map(ig =>{
            return <span 
                    key={ig.name}
                    style={{
                            textTransform:'capitalize',
                            display:'inline-block',
                            margin: '0 8px',
                            border: '1px solid #ccc',
                            padding: '5px'
                        }}
                    >{ig.name} ({ig.quantity})</span>;
    })
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p> Price: Rupees {props.price.toFixed(2)}</p> 
        </div>
    );
}
    
export default order;