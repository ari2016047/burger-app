import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

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
            </div>
        );
    }
}

export default Checkout;