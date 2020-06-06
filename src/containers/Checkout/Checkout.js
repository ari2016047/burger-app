import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients: {}
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        for(let param of query.entries()){
            //["bacon","0"]
            ingredients[param[0]] = Number(param[1]);
        }
        this.setState({ingredients: ingredients});
    }

    onCheckoutCancelled = () =>{
        this.props.history.goBack();
    }

    onCheckoutContinued = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.onCheckoutCancelled}
                    checkoutContinued={this.onCheckoutContinued}
                 />
                 <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
            </div>
        );
    }
}

export default Checkout;