import React , { Component } from 'react';
import Aux from '../../hoc/Auxa';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
//import axios instance
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:2,
    bacon:0.7
};



class BurgerBuilder extends Component{
    state = {
        totalPrice:5,
        purchasable: false,
        orderNowButton: false,
        loading:false,
        error: false
    };

    componentDidMount = ()=> {
        // axios.get('/ingredients.json')
        //     .then(response =>{
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(err =>{
        //         this.setState({error: err});
        //     }); 
    }
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
        let oldCount = this.state.ingredients[type];
        let updatedCount = oldCount+1;
        let updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        let totPrice = this.state.totalPrice;
        totPrice = totPrice+INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: totPrice});
        this.updatePurchaseState(updatedIngredients);
    }
    
    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        let updatedCount = oldCount-1;
        let updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        let totPrice = this.state.totalPrice;
        totPrice = totPrice-INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: totPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({orderNowButton: true});
    }
    purchaseCancelHandler = () =>{
        console.log('Inside cancel');
        this.setState({orderNowButton: false});
    }
    checkoutHandler = () =>{
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Arihant Jain',
        //         address: 'Begusarai',
        //         email: 'arihant263@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json',order)
        //     .then(response =>{
        //         console.log(response);
        //         this.setState({loading: false, orderNowButton: false});
        //     })
        //     .catch(err=>{
        //         this.setState({loading: false, orderNowButton: false});
        //     });
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        });
        //http://localhost:3000/checkout?bacon=1&cheese=0&meat=1&salad=1
    }
    render(){
        let disabledInfo ={
            ...this.props.ings
        };
        for(let i in disabledInfo){
            disabledInfo[i] = disabledInfo[i]<=0;
        }
        let orderSummary = null;
        let burger = this.state.error? <p style={{textAlign: "center"}}>Ingredients cannot be loaded from DB</p>:<Spinner />;

        if(this.props.ings){
            burger = (
                    <Aux>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls 
                        refToAdd={this.props.onIngredientAdded}
                        refToRed={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                        />
                    </Aux>
                    );
            orderSummary = <OrderSummary 
                            ingredients={this.props.ings}
                            cancelled={this.purchaseCancelHandler}
                            checkout={this.checkoutHandler}
                            totPrice={this.state.totalPrice}
                        />;
            if(this.state.loading){
                orderSummary = <Spinner/>
            }
        }
        return (
            <Aux>
                <Modal show={this.state.orderNowButton} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

//state comes from reducer
const mapStateToProps = (state) =>{
    console.log(state);
    return {
        ings: state.ingredients
    };
};

//react-redux gives dispatch helper which will call store.dispatch in background
//onIncrementCounter holds the reference to dispatch method which will bw called onClick
const mapDispatchToProps = (dispatch)=>{
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT , ingredientName:ingName }),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT , ingredientName:ingName })
    };
};

//connect() returns hoc which takes component as an arguement

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));