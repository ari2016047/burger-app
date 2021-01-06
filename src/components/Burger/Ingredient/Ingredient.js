import React, { Component } from 'react';
import classes from './Ingredient.css';
import PropTypes from 'prop-types';

class Ingredient extends Component{
    render(){
    let ingredient=null;

    switch(this.props.type){
        case('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}> </div>;
            break;
        case('bread-top'):
            ingredient =(
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
             ); 
            break;
        case('meat'):
            ingredient = <div className={classes.Meat}> </div>;
            break;
        case('cheese'):
            ingredient = <div className={classes.Cheese}> </div>;
            break;
        case('salad'):
            ingredient = <div className={classes.Salad}> </div>;
            break;
        case('bacon'):
            ingredient = <div className={classes.Bacon}> </div>;
            break;
        default:
            ingredient=null;
    }
    return ingredient;
    }
} 

//A js object
//used for checking prop types at Runtime
Ingredient.propTypes = {
    type: PropTypes.string.isRequired
    //if ever we use ingredient its type should not be null
};

export default Ingredient;