import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient';


//Array(3) means an ampty array of 3 elements
const burger = (props) =>{
    let transformedIngrediants = Object.keys(props.ingrediants)
    .map(ing =>{
        return [...Array(props.ingrediants[ing])].map((_,index)=>{
            return <Ingredient key={ing+index} type={ing}/>;
        });
    })
    .reduce((accumulator,item)=>{
        return accumulator.concat(item);
    },[]);

    if(transformedIngrediants.length === 0){
        transformedIngrediants = <p>Please choose Ingrediants</p>;
    }
    console.log(transformedIngrediants);
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {transformedIngrediants}
            <Ingredient type="bread-bottom"/>
        </div>
    );
};

export default burger;