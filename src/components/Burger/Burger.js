import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient';


//Array(3) means an ampty array of 3 elements
const burger = (props) =>{
    let transformedingredients = Object.keys(props.ingredients)
    .map(ing =>{
        return [...Array(props.ingredients[ing])].map((_,index)=>{
            return <Ingredient key={ing+index} type={ing}/>;
        });
    })
    .reduce((accumulator,item)=>{
        return accumulator.concat(item);
    },[]);

    if(transformedingredients.length === 0){
        transformedingredients = <p>Please choose ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {transformedingredients}
            <Ingredient type="bread-bottom"/>
        </div>
    );
};

export default burger;