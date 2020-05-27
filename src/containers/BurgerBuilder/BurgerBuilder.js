import React , { Component } from 'react';
import Aux from '../../hoc/Auxa';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:2,
    bacon:0.7
};



class BurgerBuilder extends Component{
    state = {
        ingrediants: {
            salad: 0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:5
    };

    addIngredientHandler = (type) => {
        let oldCount = this.state.ingrediants[type];
        let updatedCount = oldCount+1;
        let updatedIngredients ={
            ...this.state.ingrediants
        };
        updatedIngredients[type] = updatedCount;
        let totPrice = this.state.totalPrice;
        totPrice = totPrice+INGREDIENT_PRICES[type];
        this.setState({ingrediants: updatedIngredients, totalPrice: totPrice});
    }
    
    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingrediants[type];
        let updatedCount = oldCount-1;
        let updatedIngredients ={
            ...this.state.ingrediants
        };
        updatedIngredients[type] = updatedCount;
        let totPrice = this.state.totalPrice;
        totPrice = totPrice-INGREDIENT_PRICES[type];
        this.setState({ingrediants: updatedIngredients, totalPrice: totPrice});
    }

    render(){
        let disabledInfo ={
            ...this.state.ingrediants
        };
        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i]<=0;
        }
        return (
            <Aux>
                <Burger ingrediants={this.state.ingrediants}/>
                <BuildControls 
                refToAdd={this.addIngredientHandler}
                refToRed={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;