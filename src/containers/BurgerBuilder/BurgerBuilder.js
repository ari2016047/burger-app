import React , { Component } from 'react';
import Aux from '../../hoc/Auxa';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice:5,
        purchasable: false,
        orderNowButton: false
    };

    updatePurchaseState = (ing) =>{
        let sum_of_count_of_ing = Object.keys(ing)
        .map(i => {
            return ing[i];
        })
        .reduce((total,el)=>{
            return total+el;
        },0);
        this.setState({purchasable:sum_of_count_of_ing>0});
    }

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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({orderNowButton: true});
    }
    purchaseCancelHandler = () =>{
        console.log('Inside cancel');
        this.setState({orderNowButton: false});
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
                <Modal show={this.state.orderNowButton} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingrediants} />
                </Modal>
                <Burger ingrediants={this.state.ingrediants}/>
                <BuildControls 
                refToAdd={this.addIngredientHandler}
                refToRed={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;